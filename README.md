# SignalR Record Status Update POC

## Overview

This Proof of Concept (POC) demonstrates real-time communication between a React TypeScript frontend and an ASP.NET Core SignalR backend.

The application displays a list of records and automatically updates record statuses in the UI when the backend sends a SignalR event.

The purpose of this POC is to understand how SignalR can be used to provide real-time updates without requiring users to refresh the page.

---

## Features

### Frontend

* React + TypeScript
* Vite
* SignalR Client Integration
* Mock JSON Data
* Automatic UI Updates
* Real-Time Event Handling


## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* @microsoft/signalr

---

## Project Structure

```text
signalr-record-status-poc
│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   │   └── MatchingResults.tsx
│   │   │
│   │   ├── services
│   │   │   └── signalRService.ts
│   │   │
│   │   ├── mock
│   │   │   └── matchingResults.ts
│   │   │
│   │   └── types
│   │       └── MatchingResult.ts
│   │
│   └── package.json
│
├── backend
│   │
│   ├── Controllers
│   │   └── TestController.cs
│   │
│   ├── Hubs
│   │   └── NotificationHub.cs
│   │
│   └── Program.cs
│
└── README.md
```

---

## Current Functionality

The application loads a list of mock records.

Example:

```json
[
  {
    "id": 101,
    "customerName": "ABC Growers",
    "status": "Pending Review"
  },
  {
    "id": 102,
    "customerName": "Green Valley Farms",
    "status": "Pending Review"
  },
  {
    "id": 103,
    "customerName": "Sunrise Agriculture",
    "status": "Approved"
  }
]
```

The frontend connects to the SignalR Hub when the page loads.

When the backend API is triggered, a SignalR event is sent to all connected clients.

The frontend receives the event and updates the matching record automatically.

---

## Architecture

```text
React Frontend
       │
       ▼
SignalR Client
       │
       ▼
SignalR Hub
       │
       ▼
ASP.NET Core API
```

---

## SignalR Flow

```text
User Opens Application
          │
          ▼
Frontend Connects To SignalR Hub
          │
          ▼
Backend API Triggered
          │
          ▼
SignalR Event Broadcast
          │
          ▼
Frontend Receives Event
          │
          ▼
React State Updated
          │
          ▼
UI Re-rendered Automatically
```

---

## Setup Instructions

### Prerequisites

Install:

* Node.js (v18+)
* npm
* .NET SDK 8+

Verify:

```bash
node -v
npm -v
dotnet --version
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Run application:

```bash
npm run dev
```

The Vite development server will start and display a local URL.

Example:

```text
http://localhost:5174
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Restore packages:

```bash
dotnet restore
```

Run application:

```bash
dotnet run
```

The backend will display a URL similar to:

```text
Now listening on: http://localhost:5110
```

---

## SignalR Configuration

SignalR connection is configured in:

```text
frontend/src/services/signalRService.ts
```

Example:

```typescript
.withUrl(
  "http://localhost:5110/notificationHub"
)
```

Update the URL if your backend starts on a different port.

---

## Testing the POC

### Step 1

Start backend.

### Step 2

Start frontend.

### Step 3

Open browser console.

Expected:

```text
SignalR Connected
```

### Step 4

Trigger backend API.

POST:

```http
/api/test/update
```

Example:

```bash
curl -X POST http://localhost:5110/api/test/update
```

---

## Expected Result

Initial State:

```text
ABC Growers - Pending Review
Green Valley Farms - Pending Review
Sunrise Agriculture - Approved
```

After API Execution:

```text
ABC Growers - Approved
Green Valley Farms - Pending Review
Sunrise Agriculture - Approved
```

No page refresh is required.

---

## Learnings

This POC demonstrates:

* SignalR Hub Creation
* React SignalR Client Setup
* Real-Time Event Broadcasting
* Automatic UI Updates
* State Synchronization Across Clients
* ASP.NET Core SignalR Integration
* Cross-Origin Communication (CORS)


SignalR Learning & Real-Time Communication POC
