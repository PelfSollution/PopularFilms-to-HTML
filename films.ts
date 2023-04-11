import { apiKey } from "./config.ts";
export class Film {
  constructor(
    public id: number,
    public title: string,
    public release_date: string,
    public director: string,
    public poster_path: string,
    public overview: string
  ) {}

  getImageUrl(): string {
    return `https://image.tmdb.org/t/p/w500${this.poster_path}`;
  }
}
  //la forma que he encontrado para obtener el director es con otra llamada a la api a la pagina credits
  async function getDirector(movieId: number, apiKey: string): Promise<string> {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
    const response = await fetch(creditsUrl);
    const { crew } = await response.json();
    const director = crew.find((member: any) => member.job === 'Director');
    return director ? director.name : 'Director no disponible';
  }

export const loadFilms = async (n: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`
  );
  const { results } = (await response.json()) as { results: any[] };
  const films: Array<Film> = [];
  for (const {
    id,
    title,
    release_date,
    poster_path,
    overview,
  } of results) {
    const director = await getDirector(id, apiKey);
    films.push(
      new Film(id, title, release_date, director, poster_path, overview)
    );
  }
  return films;
};

//llamo a la funcion loadfilms para ver la salida de los datos
loadFilms(1)
  .then((films) => {
    console.log(films);
  })
  .catch((error) => {
    console.error("Error al cargar las películas:", error);
  });
