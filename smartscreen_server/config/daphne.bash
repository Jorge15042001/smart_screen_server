#!/bin/bash
cd /home/jorge1504/projects/smartscreen-server/
export DJANGO_SETTINGS_MODULE=smartscreen_server.settings
pipenv run bash -c "cd smartscreen_server;daphne -b 0.0.0.0 -p 8001 smartscreen_server.asgi:application"
