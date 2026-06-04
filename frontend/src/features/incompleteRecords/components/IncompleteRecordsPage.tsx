import { useEffect, useState } from "react";

import { incompleteRecords } from "../mock/incomplete-records";

import type { IncompleteRecord } from "../types/IncompleteRecord";

import signalRConnection
    from "../../../shared/signalr/signalr-connection";

const IncompleteRecordsPage = () => {
    const [records, setRecords] =
        useState<IncompleteRecord[]>(incompleteRecords);

    useEffect(() => {
        const connect = async () => {
            await signalRConnection.startConnection();

            signalRConnection.on(
                "ADDRESS_VERIFICATION_STARTED",
                (data) => {
                    const updatedRecord = data as IncompleteRecord;

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
                "ADDRESS_VERIFICATION_STARTED"
            );
        };
    }, []);

    return (
        <div>
            <h1>Incomplete Records</h1>

            {records.map(record => (
                <div key={record.id}>
                    {record.customerName}
                    {" - "}
                    {record.status}
                </div>
            ))}
        </div>
    );
};

export default IncompleteRecordsPage;