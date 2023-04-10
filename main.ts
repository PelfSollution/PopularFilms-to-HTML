import { writeFile } from "fs/promises";
import { loadFilms } from "./films.ts";
import { render } from "./render.ts";

(async () => {
  const films = await loadFilms(50);
  const html = render(films);
  await writeFile("index.html", html);

  // Generar páginas individuales para cada película
  films.forEach(async (film) => {
    const filmHtml = render([film], true);
    await writeFile(`films/film-${film.id}.html`, filmHtml);
  });
})();
