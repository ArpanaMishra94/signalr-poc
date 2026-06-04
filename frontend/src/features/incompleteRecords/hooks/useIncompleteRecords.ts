import { useEffect, useState } from "react";

import { incompleteRecords } from "../mock/incomplete-records";

import type { IncompleteRecord } from "../types/IncompleteRecord";

import signalRConnection from "../../../shared/signalr/signalr-connection";

import {
    INCOMPLETE_RECORDS_EVENTS,
} from "../constants/incomplete-records-events";

export const useIncompleteRecords = () => {
    const [records, setRecords] =
        useState<IncompleteRecord[]>(incompleteRecords);

    useEffect(() => {
        const connect = async () => {
            await signalRConnection.startConnection();

            signalRConnection.on(
                 INCOMPLETE_RECORDS_EVENTS.ADDRESS_VERIFICATION_STARTED,
                (data) => {
                    const updatedRecord =
                        data as IncompleteRecord;

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
            signalRConnection.off(
                  INCOMPLETE_RECORDS_EVENTS.ADDRESS_VERIFICATION_STARTED
            );
        };
    }, []);

    return {
        records,
    };
};