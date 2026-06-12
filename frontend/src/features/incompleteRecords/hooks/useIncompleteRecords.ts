// Feature state management

import { useEffect, useState } from "react";
import { incompleteRecords } from "../mock/incomplete-records";
import type { IncompleteRecord } from "../types/IncompleteRecord";
import signalRConnection from "../../../shared/signalr/signalr-connection";
import {
  registerIncompleteRecordsListeners,
  unregisterIncompleteRecordsListeners,
} from "../listeners/incomplete-records-listeners";
import { getIncompleteRecords } from "../api/get-incomplete-records";

const POLLING_INTERVAL = 10000;

export const useIncompleteRecords = () => {
  const [records, setRecords] =
    useState<IncompleteRecord[]>(incompleteRecords);

  const startPolling = () => {
    return window.setInterval(
      async () => {

        if  (
          signalRConnection.getConnectionStatus()
        ) {
          return;
        }

        // if (false) {
        //   return;
        // }

        console.log(
          "SignalR disconnected. Polling..."
        );

        try {

          //Retrieve latest data from backend and update state.
          const latestRecords = await getIncompleteRecords();

          setRecords(latestRecords);

        } catch (error) {
          console.error(
            "Polling failed:",
            error
          );
        }

      },
      POLLING_INTERVAL
    );
  };

  useEffect(() => {
    const connect = async () => {
      await signalRConnection.startConnection();

      registerIncompleteRecordsListeners(
        (updatedRecord) => {
          setRecords((prev) =>
            prev.map((record) =>
              record.id === updatedRecord.id
                ? updatedRecord
                : record
            )
          );
        }
      );
    };

    //Start fallback mechanism

    connect();

    const pollingId = startPolling();

    return () => {
      unregisterIncompleteRecordsListeners();
      clearInterval(pollingId);
    };
  }, []);

  return {
    records,
  };
};