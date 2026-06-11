import { lazy, Suspense } from "react";
// import IncompleteRecordsPage from "./features/incompleteRecords/components/IncompleteRecordsPage";

const IncompleteRecordsPage = lazy(
  () =>
    import(
      "./features/incompleteRecords/components/IncompleteRecordsPage"
    )
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IncompleteRecordsPage />
    </Suspense>
  );
}

export default App;