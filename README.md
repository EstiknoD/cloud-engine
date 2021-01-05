# Programns-Cloud

Este es un proyecto en el que podras tener una nube para guardar y descargar mas facilmente tus programas. Tambien puedes crear y utilizar cuentas que se guardaran en una base de datos.

### Pre-requisitos 📋

Necessitas Nodejs para poder utilizar el programa y mysql como gestor de bases de datos.

### Instalación 🔧

Cuando tengas el repositorio clonado simplemente abres la carpeta de este en una terminal y ejecutas los siguientes comandos.

```
cd cloud-engine

npm i

mkdir allFiles
```

Luego habres mysql en una terminal como **root** y ejecutas los siguientes comando para crear la base de datos, estos tambien los tendras en una carpeta del proyecto llamada **database** en un fichero **.sql**.

```
CREATE DATABASE programs_cloud;

USE programs_cloud;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
    
DESCRIBE users;
```

Para terminar tendras que abri el archivo **keys.js** en la carpeta **src** y modificar la contraseña y poner la que tienes, en mi caso he puesto una de prueba.

Y con esto ya tendras el programa listo para funcionar.

## Ejecutando el programa ⚙️

Para poder ejecutarlo tienes que ir a la carpeta raiz del proyecto y ejecutar el siguiente comando:

```
node src/index.js
```

Algo importante es que despues de ejecutar el programa, crear cuentas y iniciar en ellas en tu base de datos se te habra creado una nueva tabla llamada **sessions**, esto es normal y no tienes que borrarla ni tocar nada para prevenir errores.

En la terminal te dira en que puerto esta corriendo el programa, simplemente vas al navegador y pones:

```
localhost: (numero del puerto que te ha salido)
```

Y ya estaras utilizando el programa, ojo esto sirve si lo ejecutas en tu ordenado, si lo ejecutas en otro (que es la gracia del proyecto) tienes que poner la ip del ordenador junto al puertom, tal que asi:

```
(ip del ordenador servidor):(numero del puerto que te ha salido)
```
