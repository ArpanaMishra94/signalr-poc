import { useEffect, useState } from "react";

import { incompleteRecords } from "../mock/incomplete-records";

import type { IncompleteRecord } from "../types/IncompleteRecord";

import signalRService from "../../../services/signalRService";

const IncompleteRecordsPage = () => {
  const [records, setRecords] =
    useState<IncompleteRecord[]>(incompleteRecords);

  useEffect(() => {
    const connect = async () => {
      await signalRService.startConnection();

      signalRService.onAddressVerificationStarted(
        updatedRecord => {
          setRecords(prev =>
            prev.map(record =>
              record.id === updatedRecord.id
                ? updatedRecord
                : record
            )
          );
        }
      );
    };

    connect();
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