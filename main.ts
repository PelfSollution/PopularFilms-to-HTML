import { writeFile } from "fs/promises";
import { loadFilms } from "./films.ts";
import { renderList, renderDetails } from "./render.ts";

(async () => {
  const films = await loadFilms(50);
  const html = renderList(films);
  await writeFile("index.html", html);

  // Generar páginas individuales para cada película
  await Promise.all(
    films.map(async (film) => {
      const filmHtml = renderDetails(film);
      await writeFile(`films/film-${film.id}.html`, filmHtml);
    })
  );
})();
