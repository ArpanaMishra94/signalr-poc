// Maintains the connection

import * as signalR from "@microsoft/signalr";

class SignalRService {
  private connection: signalR.HubConnection | null = null;

  async startConnection() {
    try {
      console.log("Starting SignalR connection...");

      this.connection =
        new signalR.HubConnectionBuilder()
          .withUrl(
            "http://localhost:5110/notificationHub"
          )
          .withAutomaticReconnect()
          .configureLogging(
            signalR.LogLevel.Debug
          )
          .build();

      await this.connection.start();

      console.log("SignalR Connected");

    } catch (error) {
      console.error(
        "SignalR Connection Error:",
        error
      );
    }
  }

  onRecordUpdated(callback: any) {
    this.connection?.on(
      "RecordUpdated",
      callback
    );
  }
}

export default new SignalRService();