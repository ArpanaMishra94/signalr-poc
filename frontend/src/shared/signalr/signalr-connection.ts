// Maintains the connection

import * as signalR from "@microsoft/signalr";

class SignalRConnection {
  private connection: signalR.HubConnection | null = null;
  private isConnected = false;

  async startConnection() {
    if (this.connection) {
      return;
    }

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

      await this.connection.start();    //Actually connects to backend.

      this.isConnected = true;   //Track successful connection.

      this.connection.onreconnecting(() => {     //Runs when SignalR loses connection.
        this.isConnected = false;
      });

      this.connection.onreconnected(() => {  //Runs when SignalR reconnects successfully.
        this.isConnected = true;
      });

      this.connection.onclose(() => {  //Runs when connection is completely closed.
        this.isConnected = false;
      });

      console.log("SignalR Connected");
    } catch (error) {
      console.error(
        "SignalR Connection Error:",
        error
      );
    }
  }

   public getConnectionStatus() {
    return this.isConnected;
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