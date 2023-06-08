#!/bin/bash
cd /home/manager/smart_screen_server
export DJANGO_SETTINGS_MODULE=smartscreen_server.settings
#pipenv run bash -c "cd smartscreen_server;daphne -e ssl:8001:privateKey=/etc/letsencrypt/live/smartscreen.jorgevulgarin.cc/privkey.pem:certKey=/etc/letsencrypt/live/smartscreen.jorgevulgarin.cc/fullchain.pem smartscreen_server.asgi:application"
pwd
pipenv run bash -c "cd smartscreen_server;daphne -b 0.0.0.0 -p 8001 smartscreen_server.asgi:application"

