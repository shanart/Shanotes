#!/bin/sh

echo "init database"

echo "Waiting for postgres..."

while ! nc -z $DATABASE_HOST $DATABASE_PORT; do
    sleep 0.1
done

echo "PostgreSQL started"

python manage.py migrate
# set initial data
python manage.py initial_admin

exec "$@"
