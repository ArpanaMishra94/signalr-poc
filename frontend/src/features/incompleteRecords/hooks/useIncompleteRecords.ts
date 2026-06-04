import { useEffect, useState } from "react";

import { incompleteRecords } from "../mock/incomplete-records";

import type { IncompleteRecord } from "../types/IncompleteRecord";

import signalRConnection from "../../../shared/signalr/signalr-connection";

import {
  registerIncompleteRecordsListeners,
  unregisterIncompleteRecordsListeners,
} from "../listeners/incomplete-records-listeners";

export const useIncompleteRecords = () => {
    const [records, setRecords] =
        useState<IncompleteRecord[]>(incompleteRecords);

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

  connect();

  return () => {
    unregisterIncompleteRecordsListeners();
  };
}, []);

    return {
        records,
    };
};