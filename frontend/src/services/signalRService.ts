import * as signalR from "@microsoft/signalr";

class SignalRService {
  private connection:
    signalR.HubConnection | null = null;

  async startConnection() {
    this.connection =
      new signalR.HubConnectionBuilder()
        .withUrl(
          "http://localhost:5110/notificationHub"
        )
        .withAutomaticReconnect()
        .build();

    await this.connection.start();

    console.log("SignalR Connected");
  }

  onRecordUpdated(callback: any) {
    this.connection?.on(
      "RecordUpdated",
      callback
    );
  }
}

export default new SignalRService();