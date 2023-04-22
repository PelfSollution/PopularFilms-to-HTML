# Popular Films [Just Watch] to HTML - Generador de HTML en Typescript

Generador que utiliza TypeScript y se encarga de generar un sitio web estático que muestra una lista de películas populares y sus detalles. Obtiene la información de las películas desde la API de The Movie Database (TMDb) y crea un archivo HTML principal con una lista de películas y archivos HTML individuales para cada película con más detalles. 

## Instalación

- Descarga el repositorio, ex `git clone https://github.com/PelfSollution/p2-typescript-2023.git`

## Ejecución

- `bun run main.ts`

## Funcionalidades

- [x] Información de provedores de streaming donde se pueda ver la película (API Just Watch)

_"Integrar con plataformas de streaming en españa: enlaces a plataformas de streaming (como Netflix, Movistar, hbo, Amazon Prime... ) donde el usuario pueda ver la película"_

[UPDATE]: La [API de Just Watch](https://www.justwatch.com/us/JustWatch-Streaming-API) no esta abierta, ni gratuita, con la API que se habia usado de The Movie Database API como es partnership de JustWatch puedes conseguir la información de proovedores de servicios físicos y en streaming que operan en cada pais para poder ver la película [TMDB Movie Watch Providers API](https://developers.themoviedb.org/3/movies/get-movie-watch-providers). 

El tema es que no se puede obtener el enlace directo a la plataforma desde la API de TMDB, eso lo tiene capado Just Watch, entiendo que por modelo de negocio, les interesa que pases por su página Web. 

[FIX]: 🙁 usando un "hack" un poco tosco ya que la api de Just Watch no esta abierta.
[commit 4077c63](https://github.com/PelfSollution/p2-typescript-2023/commit/4077c639d50796fff955eaffcebc7175d0a368c1)

 El código verifica si el nombre del proveedor incluye palabras clave como "netflix", "hbo", "amazon", "prime", etc o finalmente en google, y luego construye la URL de búsqueda correspondiente a la  plataforma utilizando el título codificado de la película. La solución es más o menos efectiva si deseas realizar búsquedas básicas en diferentes plataformas de streaming sin depender de la API de JustWatch.

- [x] Paginación

_"Permitir al usuario navegar a través de varias páginas de películas, en lugar de mostrar solo las películas más populares en una sola página."_

Problemas ya que la API [solo permite 20 peliculas por página](https://www.themoviedb.org/talk/623012ed357c00001b46ae10), asi que con esta API debere hacer paginación para ir cargando cada vez 20 películas.

[UPDATE]: Para la páginacion y poder cargar más de 20 películas, se hace un bucle, en cada iteracion se llama a la funcion `loadFilms` y se renderiza ese bloque los listados de 20 películas más populares, la primera index.html y las siguientes en `index{número_página}.html` y añadiendo los las peliculas en bloque en el array `allFilms` con `concat`. Cuando acaba se ejecuta una promesa para procesar los detalles de cada pelicula del array de forma asíncrona.