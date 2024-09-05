# NestJS Application with PostgreSQL

This application is a NestJS project that uses a PostgreSQL database. Follow the steps below to set up and run the application.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed on your system.
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.

## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine using:

```bash
git clone https://github.com/ayberkdikcinar/userscol.git
cd userscol
```

### 2. Install Dependecies for both client and server

```bash
cd client/
npm install
cd server/
npm install
```

### 3. Setup the PostgreSQL Database

The database setup script is included in the repository under src/database/scripts/setup_db.sh. This script will set up a new PostgreSQL instance, create the database, and set up the user table with dummy data.

Ensure the script has execution permissions:

```bash
cd server/
chmod +x src/database/scripts/postgres-start.sh
```

Run the script at **src/database/scripts/postgres-start.sh**

**Script will accept a password for the database_user as an input.**

### 4. Create a .env file in the SERVER project root directory with the following content:

Replace the password with the password that you have given to the postgres-start.sh script. Do not change the other pairs.

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_NAME=user_db
```

### 5. Run the server app;

```bash
cd server/
npm run start:dev
```

### 5. Run the client app;

```bash
cd client/
npm run dev
```

#### **Note:** backend should be run on port **8000**.

#### **Note:** dummy data user password are not hashed due to direct mutation on db. However, password hash is handled.

pgAdmin is available at **http://localhost:80** with the following default credentials:

**Email: admin@admin.com, Password: admin**
