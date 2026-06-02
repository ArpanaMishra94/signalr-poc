import { useEffect, useState } from "react";
import { matchingResults } from "../mock/matchingResults";
import type { MatchingResult } from "../types/MatchingResult";
import signalRService from "../services/signalRService";

const MatchingResults = () => {
  const [records, setRecords] =
    useState<MatchingResult[]>(matchingResults);

    useEffect(() => {
  const connect = async () => {
    await signalRService.startConnection();

    signalRService.onRecordUpdated(
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
      <h1>Matching Results</h1>

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

export default MatchingResults;