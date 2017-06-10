# Nodepop
Práctica Javascript, Node.js, Express y MongoDB del V KeepCoding Startup Engineering Master Bootcamp (2017).
 
En la versión inicial se pide desarrollar las siguientes operaciones
* Regitro: Se deben proporcionar nombre, email, contraseña. El email deber ser único. Se usará una función de hash para guardar la contraseña en la base de datos.
* Autenticación: El usuario se autenticará proporcionando email y contraseña.
* Lista de anuncios: Se devolverá el listado de anuncios paginado. Se podrá filtrar por tag, tipo de anuncio, rango de precios y nombre del artículo.
* Lista de tags: Se devolverá el listado de tags.

## Despliegue
Se ha utilizado la plataforma Azure para el despliegue de la aplicación.
* Ejercicio 1: El dominio utilizado es nodepop.sergiomarrero.com
  * Archivo estático: [Hojas de estilo](https://nodepop.sergiomarrero.com/stylesheets/style.css)
  * Archivo estático: [Imagen](https://nodepop.sergiomarrero.com/images/ads/bici.png)
  * Llamada a la API: (POST) [users/authenticate](https://nodepop.sergiomarrero.com/apiv1/users/authenticate)
  
Otros aspectos a tener en cuenta son que los archivos estáticos son servidos por NGINX y en la respuesta de la petición se añade la cabecera x-owner: smarrerof. y que la llamada a la API es respondida por Express.

* Ejercicio 2: La IP fija asignada por Azure es 13.94.236.181 y en ella se muestra una página HTML estática. Tambien se puede usar el dominio html.sergiomarrero.com
  * Página estática: [http://13.94.236.181](http://13.94.236.181)
  * Página estática: [http://html.sergiomarrero.com](http://html.sergiomarrero.com)

### Otros aspectos del despliegue
* Todas la llamadas a http son redirigidas a https
* Por seguridad se ha cerrado el puerto 22 (SSH)
* Una llamada a la raiz de la api (nodepop.sergiomarrero.com) devuelve un error controlado con código 404 así como al traza del error. Para evitar la traza del error habría que realizar el despliegue de la aplicación nodepop definiendo NODE_ENV como 'production'.

## Docker
Como parte opcional se ha realizado el mismo depliege (o al menos en parte) utilizado. Todo lo relacionado con esta parte se puede consultar en el siguiente fichero -> [readme](https://github.com/smarrerof/kc-devops).

## Detalles técnicos
### Módulos utilizados
Para el desarrollo de esta práctica se han utilizado los paquetes
* [async](https://www.npmjs.com/package/async): Para lanzar procesos asíncronos. En este caso se usa en el proceso de inicialización de la base de datos, para inicializar tabla (colección en MongoDB) en paralelo.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Para la autenciación usando jwt.
* [mongoose](https://www.npmjs.com/package/mongoose): Para hacernos la vida más fácil a la hora de usar MongoDB.

### Instalación
* Para instalar y ejecutar está aplicación sigue los siguientes pasos
```
git clone https://github.com/smarrerof/kc-02nodejs <projectName>
cd <projectName>
npm install

npm run dev (si estás en Mac)
npm run dev:win  (si estás en Windows)
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
* (GET) /apiv1/ads: Devuelve una lista de anuncios. Este método admite los siguientes filtros y opciones (todos son opcionales)
  * tag: Anuncios que tienen la etiqueta/s
  * sale: Si el anuncio es una venta o una búsqueda
  * name: Anuncios cuyo nombre empieza por el valor suministrado
  * price: Filtro por precio. Se puede especificiar un rango separando los valores con '-'. Las combinaciones permitidas sería, 50- (mayo de 50), -100 (menos de 100) o 50-10 (entre 50 y 100)
  * start: Número de anuncios a ignorar del resultado
  * limit: Número de anuncios a obtener
  * includeTotal: Nos devuelve el número de anuncios que cumplen los filtros indicados.
* (GET) /apiv1/ads/tags: Devuelve la lista de tags de los anuncions datos de alta

La API siempre devuelve la misma estructura. Esta estructura está documentada y se llama ApiResult. El contenido es el siguiente
* status: Verdadero si la llamada es correcta, falso si ha habido algun error.
* error: Mensaje de error en caso de existir. Este mensaje de error estará localizado.
* result: Resultado de la llamada.

Usando los datos de prueba
(POST) apiv1/users/authenticate
```
status code: 401
{
  "status": false,
  "error": "Incorrect user email or password"
}
```
```
status code: 200
{
  "success": true,
  "result": {
    "token": "..."
  }
}
```

### Configuración
Dentro de la carpeta lib hay un fichero config.js. En el se pueden configurar algunos aspectos parámetros de la aplicación.
* db.url: Uri de la base de datos MongoDB
* jwt.secret: Secreto usado para firmar el token
* jwt.expiresIn: Tiempo de expiración del token (en segundos)

### Internacionalización
Para la traducción de los mensajes de error se ha usado un módulo propio. Existen diversos módulos para hacer esto, pero se trata de aprender :)

En la carpeta locales hay un fichero json (translations.json) donde están las traducciones de los distintos claves.

El lenguaje se debe especificar en el header de la petición usando el nombre language. En este momento los idiomas permitidos son inglés (en) y español (es).

En caso de no existir la traduccion en español, se buscará en inglés (lenguaje por defecto). En caso de tampoco existir devolverá la propia clave como traducción, así se evitan errores por no disponer de una traducción.

### Otros
* [Node.js](https://nodejs.org)
* [Express](http://expressjs.com)
* [Express Generator](https://www.npmjs.com/package/express-generator)
* [MongoDB](https://www.mongodb.com/)
* [Swagger](http://swagger.io/)
