import { Film } from "./films.ts";

const renderFilmCard = (film: Film): string => {
  return `
    <div class="film-card">
      <img src="${film.getImageUrl()}" alt="${film.title}" />
      <h2>${film.title}</h2>
      <p>Fecha de lanzamiento: ${film.release_date}</p>
      <p>Director: ${film.director}</p>
      <a href="films/film-${film.id}.html">Detalles</a>
    </div>
  `;
};

const renderFilmDetails = (film: Film): string => {
  return `
    <div class="film-card-interior">
      <img src="${film.getImageUrl()}" alt="${film.title}">
      <h2>${film.title}</h2>
      <p>Fecha de lanzamiento: ${film.release_date}</p>
      <p>Director: ${film.director}</p>
      <h3>Sinopsis:</h3>
      <p>${film.overview}</p>
      <a href="../index.html" class="back-to-list">Volver al listado</a>
      <link rel="stylesheet" href="../styles.css" />
    </div>
  `;
};

export function render(films: Film[], isDetailsPage: boolean = false): string {
  const filmCards = films.map((film) =>
  isDetailsPage ? renderFilmDetails(film) : renderFilmCard(film)
);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Listado de películas</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <header>
          <h1>Listado de películas</h1>
        </header>
        <main>
          <div class="film-container">
            ${filmCards}
          </div>
        </main>
      </body>
    </html>
  `;
};
