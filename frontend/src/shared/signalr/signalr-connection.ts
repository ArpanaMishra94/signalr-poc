// Maintains the connection

import * as signalR from "@microsoft/signalr";

class SignalRConnection {
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

  on(
    eventName: string,
    callback: (data: unknown) => void
  ) {
    this.connection?.on(eventName, callback);
  }

  off(eventName: string) {
    this.connection?.off(eventName);
  }
}

export default new SignalRConnection();