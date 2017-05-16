# Nodepop
Práctica Javascript, Node.js, Express y MongoDB del V KeepCoding Startup Engineering Master Bootcamp (2017).
 
En la versión inicial se pide desarrollar las siguientes operaciones
* Regitro: Se deben proporcionar nombre, email, contraseña. El email deber ser único. Se usará una función de hash para guardar la contraseña en la base de datos.
* Autenticación: El usuario se autenticará proporcionando email y contraseña.
* Lista de anuncios: Se devolverá el listado de anuncios paginado. Se podrá filtrar por tag, tipo de anuncion, rango de precios y nombre del artículo.
* Lista de tags: Se devolverá el listado de tags.


## Detalles técnicos
### Módulos utilizados
Para el desarrollo de esta práctica se han utilizado los paquetes
* [async](https://www.npmjs.com/package/async): Para lanzar procesos asíncronos. En este caso se usa en el proceso de inicialización de la base de datos, para inicializar cada base de datos en paralelo.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Para la autenciación usando jwt.
* [mongoose](https://www.npmjs.com/package/mongoose): Para hacernos la vida más fácil a la hora de usar MongoDB desde node.


### Instalación
* Descargar el código fuente
```
git clone https://github.com/smarrerof/kc-02nodejs
```
* Ejecutar npm install
```
npm install
```
* Lanzar el proyecto
```
npm run dev
```
o este comando si estás en entornos windows
```
npm run dev:win
```

También hay un script para inicializar la base de datos con datos de prueba. Para lanzar este script hay que ejecutar
```
npm run installDB
```

Los más inquietos pueden validar el código con jshint de la siguiente manera (hay tener instalado jshint de manera global)
```
npm run lint
```



#useful command

* Show dbs
``` 
show dbs
``` 
* Use db
``` 
use <dbName>
``` 
* Show collections
``` 
show collections
``` 
* Remove current db
```
db.drop()
db.dropDatabase()
```