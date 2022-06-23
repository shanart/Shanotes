#!/usr/bin/env bash

echo "initial clear database from old data"
python manage.py flush --no-input

echo "create admin"
python manage.py initial_admin

echo "generate users"
python manage.py generate_random_users 20

echo "generate users meta content"
python manage.py generate_users_meta_content

echo "generate notes"
python manage.py generate_notes 400