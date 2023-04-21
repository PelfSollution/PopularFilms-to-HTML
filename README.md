# Generador de HTML en Typescript

Generador que utiliza TypeScript y se encarga de generar un sitio web estático que muestra una lista de películas populares y sus detalles. Obtiene la información de las películas desde la API de The Movie Database (TMDb) y crea un archivo HTML principal con una lista de películas y archivos HTML individuales para cada película con más detalles. 

**To run**:

bun run main.ts

**Nuevas Funcionalidades**

- [] Información de provedores de streaming donde se pueda ver la película (API Just Watch)

_"Integrar con plataformas de streaming en españa: enlaces a plataformas de streaming (como Netflix, Movistar, hbo, Amazon Prime... ) donde el usuario pueda ver la película"_

[UPDATE]: La [API de Just Watch](https://www.justwatch.com/us/JustWatch-Streaming-API) no esta abierta, ni gratuita, con la API que se habia usado de The Movie Database API como es partnership de JustWatch puedes conseguir la información de proovedores de servicios físicos y en streaming que operan en cada pais para poder ver la película [TMDB Movie Watch Providers API](https://developers.themoviedb.org/3/movies/get-movie-watch-providers). 

El tema es que no se puede obtener el enlace directo a la plataforma desde la API de TMDB, eso lo tiene capado Just Watch, entiendo que por modelo de negocio, les interesa que pases por su página Web. 

- [] Paginación

_"Permitir al usuario navegar a través de varias páginas de películas, en lugar de mostrar solo las películas más populares en una sola página."_
