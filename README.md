# Atoya Engineering & Services

* [Página Web](https://atoya-front.herokuapp.com/) - Link de la página web

### Descripción

Este proyecto fue realizado para Atoya Engineering & Services con el propósito de brindarle una plataforma para manejar su registro de formularios y recordatorios de sesiones importantes en la empresa

### Pre-requisitos 📋

* Tener Instalado Node.js
* Express
* React
* Cuenta en Heroku

### Instalación 🔧
Paso 1


Realizar git clone al proyecto


Paso 2


Abrir una consola cmd en el proyecto. Luego hacer npm install en la carpeta root y en la carpeta atoya-front.

Paso 3


Crear un archivo .env con el formato disponible en el archivo env.txt. con las credenciales de la base de datos creadas en Mongo Atlas.


## Deployment 📦

Deploy en local

Paso 1


Abrir una consola en la carpeta root del proyecto y hacer npm start.


Paso 2


Abrir otra consola cmd en la carpeta atoya-front y hacer npm start.


Paso 3


En el navegador ingresar la url http://localhost:3000/


Deploy en Heroku

Paso 1


Abrir consola en la carpeta root del proyecto.

Paso 2


Ingresar el comando heroku login e ingresar las credenciales de la cuenta en Heroku.

Paso 3


Ingresar el comando heroku create.

Paso 4


Ingresar el comando git push heroku master.

Paso 5


Ingresar el comando heroku ps:scale web=1 para asegurar que hay una instancia para el servidor.

Paso 6


Ingresar el comando heroku open para abrir la página en el browser.


## Construido con 🛠️

* [ReactJs](https://es.reactjs.org/) - El framework web usado.
* [NPM](https://www.npmjs.com/) - Manejador de dependencias.
* [HEROKU](https://www.heroku.com) - Herramienta Usada para el despliegue de la app.
* [NodeJs](https://nodejs.org/es/) - Entorno de ejecución
* [GoogleFonts](https://fonts.google.com) - Fuentes utilizadas: Baloo Thambi 2

## Autores ✒️

* *Francisco González Rey* 
* *Cristhian Peña*