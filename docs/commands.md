# Comandos 
## Ejecutar primero
pm2 start ./src/app.js  --name="server fork" --watch -- -p 8080
## Luego ejecutar dentro de la carpeta utils 
nodemon textCargaAutocannon.js

