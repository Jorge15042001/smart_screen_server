# SmartScreenServer

This software handles realtime comunication between receptionists, smartscreens and smartscreen's modules


## Deployment

```bash
cd smart_screen_server/ # cd in to the folder after cloning this repository
```

### Install dependencies
```bash
pipenv install
sudo pipenv install # install dependencies for root user
```

```bash
pipenv shell # start virtual environment
cd smartscreen_server # cd into code folder
```

### Collect static files
```bask
python manage.py collectstatic
```

### Start gunicorn
```bash
# kill any running instances of gunicorn
kill <<gunicorn pid>> 

# make sure /var/run/gunicorn exists
sudo mkdir -pv /var/{log,run}/gunicorn/
sudo chown manager:manager /var/log/gunicorn/
sudo chown manager:manager /var/run/gunicorn/
# start gunicorn
gunicorn -c config/gunicorn/dev.py

```
### Start Daphne
TODO: maybe daphne can do all gunicorn does and gunicorn could be dropped
TODO: maybe set it up as a user service so no root permisions are requiered
```bash
sudo cp smartscreen_socket.service /etc/systemd/system/
sudo systemctl start smartscreen_socket.service
```

### Start peerjs 
```bash
sudo docker run -p 9000:9000 -d peerjs/peerjs-server
```

### Start nginx
```bash
cp config/ngnix /etc/nginx/sites-available/default 
sudo systemctl reload nginx
sudo systemctl stop nginx
sudo systemctl start nginx
```

