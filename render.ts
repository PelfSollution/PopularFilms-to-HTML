import { Film } from "./films.ts";

function createParagraph(title: string, content: string): string {
  return `
    <p>
      <strong>${title}:</strong> ${content}
    </p>
  `;
}

function getSearchUrl(providerName: string, filmTitle: string): string {
  const encodedTitle = encodeURIComponent(filmTitle);
  if (providerName.toLowerCase().includes("netflix")) {
    return `https://www.netflix.com/search?q=${encodedTitle}`;
  } else if (providerName.toLowerCase().includes("hbo")) {
    return `https://www.hbomax.com/search?q=${encodedTitle}`;
  } else if (
    providerName.toLowerCase().includes("amazon") ||
    providerName.toLowerCase().includes("prime")
  ) {
    return `https://www.amazon.es/s?k=${encodedTitle}&i=instant-video`;
  } else if (
    providerName.toLowerCase().includes("apple") ||
    providerName.toLowerCase().includes("appletv")
  ) {
    return `https://tv.apple.com/search?q=${encodedTitle}`;
  } else if (providerName.toLowerCase().includes("movistar")) {
    return `https://ver.movistarplus.es/busqueda/?q=${encodedTitle}`;
  } else {
    return `https://www.google.com/search?q=${encodeURIComponent(
      providerName
    )}+${encodedTitle}`;
  }
}

const renderFilmCard = (film: Film): string => {
  const fechaLanzamiento = createParagraph(
    "Fecha de lanzamiento",
    film.release_date
  );
  const director = createParagraph("Director", film.director);

  const hasWatchProviders = film.watchProvidersES.length > 0;
  const providerCircleCheck = hasWatchProviders
    ? "film-title check-providers"
    : "film-title";

  return `
    <div class="film-card">
      <img src="${film.getImageUrl()}" alt="${film.title}" />
      <h2><span class="${providerCircleCheck} tooltip"><span class="tooltiptext">ya en Streaming!</span></span>${
    film.title
  }</h2>
      ${fechaLanzamiento}
      ${director}
      <a href="films/film-${film.id}.html">Detalles</a>
    </div>
  `;
};

const renderFilmDetails = (film: Film): string => {
  const fechaLanzamiento = createParagraph(
    "Fecha de lanzamiento",
    film.release_date
  );
  const director = createParagraph("Director", film.director);

  const watchProvidersList = film.watchProvidersES
  .map((provider) => {
    const searchUrl = getSearchUrl(provider.provider_name, film.title);

    return `<li><div class="tooltip"><img class="logo" src="${provider.getImageLogo()}" alt="${
      provider.provider_name
    }"  onclick="window.open('${searchUrl}', '_blank')"><span class="tooltiptext">${
      provider.provider_name
    }</span></div></li>`;
  })
  .join("");

  const watchProvidersSection =
    watchProvidersList.length > 0
      ? `
    <div class="watch-providers">
      <h3>Proveedores de transmisión en línea (España)</h3>
      <ul>
        ${watchProvidersList}
      </ul>
    </div>`
      : `<p class="aviso-providers"><span class="circulo-rojo"></span>No se encontraron proveedores de transmisión en línea en España para esta película.</p>`;
      const hasWatchProviders = film.watchProvidersES.length > 0;
  const providerCircleCheck = hasWatchProviders
    ? "film-title check-providers"
    : "film-title";

  return `
    <div class="film-card-interior">
      <img src="${film.getImageUrl()}" alt="${film.title}">
      <h2><div class="tooltip"><span class="${providerCircleCheck} tooltip"><span class="tooltiptext">ya en Streaming!</span></span>${
        film.title
      }</div></h2>
      ${fechaLanzamiento}
      ${director}
      <p>${film.overview}</p>
      ${watchProvidersSection}
      <a href="../index.html" class="volver">Volver al listado</a>
    </div>
  `;
};

export function renderList(films: Film[], currentPage: number, totalPages: number): string {
  const filmCards = films.map(renderFilmCard).join("");

  const paginationLinks:string[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationLinks.push(`<span class="current-page">${i}</span>`);
    } else {
      const fileName = i === 1 ? "index.html" : `index${i}.html`;
      paginationLinks.push(`<a href="${fileName}">${i}</a>`);
    }
  }
  const pagination = `
    <div class="pagination">
      ${paginationLinks.join("")}
    </div>
  `;

  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Listado de películas</title>
        <link rel="icon" href="img/favicon.png" type="image/x-icon">
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
          ${pagination}
        </main>
      </body>
    </html>
  `;
}

export function renderDetails(film: Film): string {
  const filmDetails = renderFilmDetails(film);

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${film.title}</title>
        <link rel="icon" href="../img/favicon.png" type="image/x-icon">
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
}
