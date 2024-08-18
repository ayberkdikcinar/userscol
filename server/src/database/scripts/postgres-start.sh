#!/bin/bash
set -e

SERVER="user-ms";

SCRIPT_DIR=$(dirname "$0")

echo "Default db username is 'postgres'"

echo "Enter Database password: "
read PASSWORD


PW=$PASSWORD;
DB="user_db";
SQL_QUERY_FILE="users.sql";
DUMMY_USERS_FILE="dummy-users.csv";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm -f $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 5;

# create the db 
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres

#create user table
echo "Copy user table from create-user-table.sql"
docker cp "$SCRIPT_DIR/$SQL_QUERY_FILE" $SERVER:/$SQL_QUERY_FILE
echo "Copy dummy-users.csv"
docker cp "$SCRIPT_DIR/$DUMMY_USERS_FILE" $SERVER:/$DUMMY_USERS_FILE
echo "CREATE USER TABLE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres -d user_db -f /$SQL_QUERY_FILE
docker run -p 80:80 -e 'PGADMIN_DEFAULT_EMAIL=admin@admin.com' -e 'PGADMIN_DEFAULT_PASSWORD=admin' -d dpage/pgadmin4