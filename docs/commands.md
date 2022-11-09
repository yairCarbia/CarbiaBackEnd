# Comandos solicitados en consigna
## Consigna 1
pm2 start ./src/app.js -- -- port 8081 -- mode cluster
pm2 start .src/app.js -- -- port 8080 -- mode fork
## Consigna 2
pm2 start ./src/app.js  -f -- -- port 8080 -- mode fork
pm2 start ./src/app.js -f  -- -- port 8082 -- mode fork
pm2 start ./src/app.js -f -- -- port 8083 -- mode fork
pm2 start ./src/app.js -f  -- -- port 8084 -- mode fork
pm2 start ./src/app.js -f  -- -- port 8085 -- mode fork

