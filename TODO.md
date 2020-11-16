## To setup pm2

* npm install --global pm2

* pm2 start <app-name.js> [optional --name "Custom process name"]

For development  

* pm2 start <app-name.js> [optional --watch]

## To setup process with OS bootup

### For windows

* npm install --global pm2-windows-service

Install the service:
* pm2-service-install

Save the current process list
* pm2 save

Done!

To disable it,
* pm2 unstartup


