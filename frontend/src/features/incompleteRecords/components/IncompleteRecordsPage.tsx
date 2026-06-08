// Render data only

import { useIncompleteRecords }
from "../hooks/useIncompleteRecords";

const IncompleteRecordsPage = () => {
  const { records } =
    useIncompleteRecords();

  return (
    <div>
      <h1>Incomplete Records</h1>

      {records.map((record) => (
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