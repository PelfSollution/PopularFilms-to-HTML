import { writeFile } from "fs/promises";
import { loadFilms } from "./films.ts";
import { renderList, renderDetails } from "./render.ts";

(async () => {
  const films = await loadFilms(50,1);
  const html = renderList(films);
  await writeFile("index.html", html);
  await Promise.all(
    films.map(async (film) => {
      const filmHtml = renderDetails(film);
      await writeFile(`films/film-${film.id}.html`, filmHtml);
    })
  );
})();
