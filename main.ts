import { writeFile } from "fs/promises";
import { loadFilms, Film } from "./films.ts";
import { renderList, renderDetails } from "./render.ts";

(async () => {
  const totalPages = 5;
  const filmsPerPage = 20;

  let allFilms: Film[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const films = await loadFilms(i, filmsPerPage);
    const html = renderList(films, i, totalPages);
    const fileName = i === 1 ? "index.html" : `index${i}.html`;
    await writeFile(fileName, html);

    allFilms = allFilms.concat(films);
  }

  await Promise.all(
    allFilms.map(async (film) => {
      const filmHtml = renderDetails(film);
      await writeFile(`films/film-${film.id}.html`, filmHtml);
    })
  );
})();
