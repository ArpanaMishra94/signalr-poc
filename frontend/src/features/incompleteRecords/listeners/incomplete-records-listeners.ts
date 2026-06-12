// SignalR event registration
// SignalR event cleanup 

import signalRConnection
from "../../../shared/signalr/signalr-connection";

import { INCOMPLETE_RECORDS_EVENTS }
  from "../constants/incomplete-records-events";

import type { IncompleteRecord }
  from "../types/IncompleteRecord";

export const registerIncompleteRecordsListeners = (
  onAddressVerificationStarted: (
    updatedRecord: IncompleteRecord
  ) => void
) => {
  signalRConnection.on(    //Whenever the backend sends ADDRESS_VERIFICATION_STARTED, this callback executes.
    INCOMPLETE_RECORDS_EVENTS.ADDRESS_VERIFICATION_STARTED,
    (data) => {
      onAddressVerificationStarted(
        data as IncompleteRecord
      );
    }
  );
};

export const unregisterIncompleteRecordsListeners = () => {
  signalRConnection.off(
    INCOMPLETE_RECORDS_EVENTS.ADDRESS_VERIFICATION_STARTED
  );
};