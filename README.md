# sariri-backend

## Descarga

Para descargar el proyecto, ejecutar el siguiente comando:

```bash
git clone https://github.com/Mojix-Proyecto-Ing-Soft/sariri-backend.git
```

## Instalacion

Luego de clonar el archivo debes hacer un `npm install` para instalar las dependencias del proyecto. Luego debes crear un archivo `.env` en la raiz del proyecto con las respectivas variables de entorno. puedes tomar de ejemplo el archivo `.env.example` que se encuentra en la raiz del proyecto.

Puedes instalarte el paquete de `nodemon` para que el servidor se reinicie automaticamente cada vez que se haga un cambio en el codigo.

## Ejecucion

Para ejecutar el proyecto debes ejecutar el comando `npm run dev` para ejecutar el servidor en modo desarrollo o `npm run start` para ejecutar el servidor en modo produccion, de preferencia en modo desarrollo.

El proyecto se ejecutara en el puerto 4000 por defecto, pero puedes cambiarlo en el index.js del proyecto en la parte de port.

## Pruebas

Existe un archivo llamado TestDbMojix que contiene pruebas de la DB de Mojix, este esta hecho en Insomnia, para ejecutarlo debes tener instalado Insomnia y luego importar el archivo en la aplicacion.

Para poder importarlo primero debes tener una coleccion y darle click al boton de create, luego darle click a URL y pegar la siguiente URL: `https://raw.githubusercontent.com/Mojix-Proyecto-Ing-Soft/sariri-backend/master/TestDbMojix` y darle click a Fetch and Import.

Se te creara una coleccion llamada TestDbMojix, en la cual se encuentran todas las pruebas de la DB de Mojix.

Dentro de este hay una carpeta llamada `Mojix` que contiene todas las pruebas de la DB del proyecto donde tiene las siguientes carpetas:

- `TrainersProd`: Contiene las pruebas con el link deployado y funcional.
- `TrainersInt`: Contiene las pruebas con el localhost.

Dentro de cada una de estas carpetas hay dos mas que son:

- `WELL`: donde estan todos los casos de prueba que funcionan correctamente.
- `BAD`: donde estan todos los casos de prueba que no funcionan correctamente.

Para poder utiliazr La carpeta de TrainersProd debes darle click a los enviroments y utilizar el que dice `PROD` y para utilizar la carpeta de TrainersInt debes darle click a los enviroments y utilizar el que dice `INT`.

