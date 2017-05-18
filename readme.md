# Nodepop
Práctica Javascript, Node.js, Express y MongoDB del V KeepCoding Startup Engineering Master Bootcamp (2017).
 
En la versión inicial se pide desarrollar las siguientes operaciones
* Regitro: Se deben proporcionar nombre, email, contraseña. El email deber ser único. Se usará una función de hash para guardar la contraseña en la base de datos.
* Autenticación: El usuario se autenticará proporcionando email y contraseña.
* Lista de anuncios: Se devolverá el listado de anuncios paginado. Se podrá filtrar por tag, tipo de anuncio, rango de precios y nombre del artículo.
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
* Lanzar el proyecto en modo desarrollo
```
npm run dev
npm run dev:win  (si estás en entornos windows)
```

También hay un script para inicializar la base de datos con datos de prueba. Para lanzar este script hay que ejecutar
```
npm run installDB
```

Los más inquietos pueden validar el código con jshint de la siguiente manera (hay tener instalado jshint de manera global)
```
npm run lint
npm run lint:win (si estás en entornos windows)
```

### Nodepop API
La documentación de API puede ser consultada online. Por defecto la aplicación se lanzará en el puerto 3000, por lo que documentación de la API podrá ser consultada navegando a la ruta [http://localhost:3000/docs](http://localhost:3000/docs)

Las operaciones desarrolladas pueden ser consultadas a traves de los siguiente endpoints
* (POST) /apiv1/users: Crea un usuario y devuelve el usuario creado
* (POST) /apiv1/users/authenticate: Autentica un usuario y devuelve el token de acceso
* (GET) /apiv1/ads: Devuelve una lista de anuncios. Este método admite los siguientes filtro y opciones
  * tag: Anuncios que tienen la etiqueta/s
  * sale: Si el anuncio es una venta o una búsqueda
  * name: Anuncios cuyo nombre empieza por el valor suministrado
  * price: Filtro por precio. Se puede especificiar un rango separando los valores con '-'. Las combinaciones permitidas sería, 50- (mayo de 50), -100 (menos de 100) o 50-10 (entre 50 y 100)
  * start: Número de anuncios a ignorar del resultado
  * limit: Número de anuncios a obtener
  * includeTotal: Nos devuelve el número de anuncios que cumplen los filtros indicados.
* (GET) /apiv1/ads/tags: Devuelve la lista de tags de los anuncions datos de alta

### Internacionalización
Para la traducción de los mensajes de error se ha usado un módulo propido. Existen diversos módulos para hacer esto, pero se trata de aprender :)

En la carpeta locales hay un fichero json donde están las traducciones de los distintos tokens.

El lenguaje se debe especificar en el header de la petición usando el nombre language. En este momento los idiomas permitidos son inglés (en) y español (es).

En caso de no existir la traduccion en español, se buscará en inglés. En caso de tampoco existir devolverá el token como traducción, así se evitan errores por no disponer de una traducción.

### Otros
* [Node.js](https://nodejs.org)
* [Express](http://expressjs.com)
* [Express Generator](https://www.npmjs.com/package/express-generator)
* [MongoDB](https://www.mongodb.com/)
* [Swagger](http://swagger.io/)