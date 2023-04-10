import { Film } from "./films.ts";

const renderFilmCard = (film: Film): string => {
  return `
    <div class="film-card">
      <img src="${film.getImageUrl()}" alt="${film.title}" />
      <h2>${film.title}</h2>
      <p>Fecha de lanzamiento: ${film.release_date}</p>
      <p>Director: ${film.director}</p>
    </div>
  `;
};

export function render(films: Film[], isDetailsPage: boolean = false): string {
  const filmCards = films.map((film) => renderFilmCard(film));

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
}
