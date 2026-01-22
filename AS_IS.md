# AS-IS Documentation - PropertyVault Ecosystem

**Date:** 2026-01-22
**Status:** Phase 1 Development (Initial Backend Integration)

## 1. System Overview

PropertyVault Ecosystem is a SaaS platform for storing, organizing, and visualizing real estate properties (Plots, Houses, etc.) in the USA.
The system is currently in the initial development phase, focusing on the foundation of the backend and data structure.

## 2. Technical Architecture

### 2.1. Structure (Monorepo-style)

The repository is organized into two main directories:

- **/frontend**: Client-side application (React/Vite).
- **/backend**: Server-side application (NestJS).
- **Database**: PostgreSQL running in a Docker container.

### 2.2. Technology Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | React 19, Vite, TypeScript | SPA for user interaction. |
| **Backend** | NestJS, TypeScript | Robust API with modular architecture. |
| **Database** | PostgreSQL 15 | Relational data persistence. |
| **ORM** | Prisma 5 | Type-safe database queries and migrations. |
| **Infrastructure** | Docker Compose | Local database orchestration. |

## 3. Data Model (ERD Snapshot)

The current database schema (`prisma/schema.prisma`) includes the following key entities:

### Locations

- **State**: US States (e.g., CA, TX).
- **County**: Counties linked to States.
- **City**: Cities linked to Counties.

### Properties

- **Property**: The core entity.
  - **Tag**: Unique identifier generated automatically (`STATE-COUNTY-SEQ-EXTID`).
  - **Type**: HOUSE, LOT, APARTMENT, COMMERCIAL.
  - **Relations**: Linked to State, County, and City.

### Users & Community (Schema defined, logic pending)

- **User**: System users.
- **SubscriptionPlan / UserSubscription**: SaaS management.
- **CommunityPost**: System for opportunities/news.

## 4. Current Features

### 4.1. Backend API

The backend is running on `http://localhost:3000` and exposes the following REST endpoints:

- **Properties**
  - `POST /properties`: Registers a new property.
    - *Logic*: Validates location → Increments County Sequence → Generates Property Tag → Saves to DB.
  - `GET /properties`: Lists all properties.
  - `GET /properties/:id`: Details of a property.

- **Locations**
  - `POST /locations/states`, `POST /locations/counties`, `POST /locations/cities`: Create location data.
  - `GET /locations/*`: Retrieve location hierarchy.

### 4.2. Frontend

- **Project Structure**: Standard Vite + React + TypeScript.
- **Services**: `services/api.ts` implemented to communicate with the NestJS backend.
- **Integration**: Ready to consume backend APIs (imports of Mock Data being replaced).

## 5. Development Environment

### Prerequisites

- Node.js (v18+)
- Docker & Docker Compose

### How to Run

1. **Database**:

    ```bash
    cd backend
    docker-compose up -d
    ```

2. **Backend**:

    ```bash
    cd backend
    npm install
    npx prisma generate
    npm run start:dev
    ```

3. **Frontend**:

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## 6. Pending / Next Steps

- [ ] Implement Authentication (Login/Register).
- [ ] Complete Frontend integration (Replace all Mocks).
- [ ] Implement file upload (Property Images).
- [ ] SaaS Subscription Logic.
