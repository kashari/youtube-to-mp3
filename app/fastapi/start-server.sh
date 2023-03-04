#!/bin/bash

if [ -f "./main.py" ]; then
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
elif [ -f "./manage.py" ]; then
    python manage.py runserver 0.0.0.0:8000 --reload
elif [ -f "./app.py" ]; then
    flask run --host 0.0.0.0 --port 8000 --reload
fi
