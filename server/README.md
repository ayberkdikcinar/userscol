# NestJS Application with PostgreSQL

This application is a NestJS project that uses a PostgreSQL database. Follow the steps below to set up and run the application.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system.
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine using:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependecies

npm install

### 3. Setup the PostgreSQL Database

The database setup script is included in the repository under src/database/scripts/setup_db.sh. This script will set up a new PostgreSQL instance, create the database, and set up the user table with dummy data.

Ensure the script has execution permissions:

bash

chmod +x src/database/scripts/setup_db.sh

Run the script
src/database/scripts/setup_db.sh

Create a .env file in the project root directory with the following content:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=user_db

Run the app;

npm run start:dev

pgAdmin is available at http://localhost on port 80 with the following default credentials:

Email: admin@admin.com
Password: admin
