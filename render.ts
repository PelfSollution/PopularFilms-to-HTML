import { Film } from "./films.ts";

function createParagraph(title: string, content: string): string {
  return `
    <p>
      <strong>${title}:</strong> ${content}
    </p>
  `;
}

const renderFilmCard = (film: Film): string => {
  const fechaLanzamiento = createParagraph("Fecha de lanzamiento", film.release_date);
  const director = createParagraph("Director", film.director);

  const hasWatchProviders = film.watchProvidersES.length > 0;
  const filmTitleClass = hasWatchProviders ? "film-title with-providers" : "film-title";


 return `
    <div class="film-card">
      <img src="${film.getImageUrl()}" alt="${film.title}" />
      <h2 class="${filmTitleClass}">${film.title}</h2>
      ${fechaLanzamiento}
      ${director}
      <a href="films/film-${film.id}.html">Detalles</a>
    </div>
  `;
};

const renderFilmDetails = (film: Film): string => {
  const fechaLanzamiento = createParagraph("Fecha de lanzamiento", film.release_date);
  const director = createParagraph("Director", film.director);
  const watchProvidersList = film.watchProvidersES.map(provider => `<li><img class="logo" src="${provider.getImageLogo()}" alt="${provider.provider_name}" title="${provider.provider_name}"></li>`).join('');
  const watchProvidersSection = watchProvidersList.length > 0 ? `
    <div class="watch-providers">
      <h3>Proveedores de transmisión en línea (España)</h3>
      <ul>
        ${watchProvidersList}
      </ul>
    </div>` : `<p class="aviso-providers">No se encontraron proveedores de transmisión en línea en España para esta película.</p>`;

  return `
    <div class="film-card-interior">
      <img src="${film.getImageUrl()}" alt="${film.title}">
      <h2>${film.title}</h2>
      ${fechaLanzamiento}
      ${director}
      <p>${film.overview}</p>
      ${watchProvidersSection}
      <a href="../index.html" class="volver">Volver al listado</a>
    </div>
  `;
};

export function renderList(films: Film[]): string {
  const filmCards = films.map(renderFilmCard).join('');

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
          <h1><img src="img/logo.svg" alt="Logo tmdb">Listado de películas</h1>
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

export function renderDetails(film: Film): string {
  const filmDetails = renderFilmDetails(film);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${film.title}</title>
        <link rel="stylesheet" href="../styles.css" />
      </head>
      <body>
        <header>
          <h1><img src="../img/logo.svg" alt="Logo tmdb">${film.title}</h1>
        </header>
        <main>
          <div class="film-container-details">
            ${filmDetails}
          </div>
        </main>
      </body>
    </html>
  `;
};

