# simple-real-time-application

## Stack

- ReactJS
- ReduxJS
- React-Bootstrap
- Vite

## Guía rápida para levantar la aplicación
Puede levantar la aplicación de 3 maneras.

- **Entorno de desarrollo:** A nivel local con configuración para desarrollo. (Punto 1)
- **docker-compose:** Ejecutando el comando `docker-compose up -d --build`, la manera mas sencilla. (Punto 2)
- **docker:** Creando la imagen y corriendo el contenedor. (Punto 3)

**NOTA:** No olvide crear el archivo `.env` antes de ejecutar los anteriores puntos. Puede copiarse del archivo `.env.example` que ya tiene las variables configuradas.

## 1. Configuración del entorno de desarrollo

Clonar repositorio

```bash
git clone .....
```

Instalar dependencias

```bash
npm install
```

Generar archivo `.env`
```bash
cp .env.example .env
```

Ejecuta la aplicación en el modo de desarrollo.Abrir [http://localhost:9000](http://localhost:9000) para verlo en su navegador.

```bash
npm run dev
```

La aplicación es accesible a través del puerto 9000.

## 2. Docker-compose

El siguiente proyecto contiene `docker-compose.yml` que configura todo el entorno de desarrollo.
Ejecute `docker-compose up -d --build` para ejecutar la pila de desarrollo. Tenga en cuenta que la
carpeta del proyecto se monta en la imagen docker y aplicación se inicia en modo `development`,
cualquier cambio en el código fuente se volverá a cargar la aplicación por lo que es más fácil para el desarrollador.

La aplicación es accesible a través del puerto `9000`.

## 3. Docker

Para el despliegue en un entorno de `production` de la aplicación:

1. Cree la imagen del contenedor `docker build -t simple-real-time-application:latest -f Dockerfile.prod .`.
2. Cree o copie el archivo `.env`. `cp .env.example .env`
3. Inicie el contenedor y monte el archivo `.env` como volumen

```bash
docker run -d -p 9000:80 --name simple-real-time-application simple-real-time-application:latest
```

La aplicación es accesible a través del puerto `9000`.

### 4. Configuración

### Variables de entorno `.env`
Las variables de configuración de la aplicación se encuentran en los ficheros `.env.*`.

Tenga en cuenta que `.env` no se registra en el repositorio Git. Debe crearse por separado y suministrarse
al contenedor Docker en ejecución, por ejemplo, a través de volúmenes montados.
