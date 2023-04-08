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

export const loadFilms = async (n: number) => {
  const apiKey = "6ce63d65fe76626c5722de6d46de0b89";
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`
  );
  const { results } = (await response.json()) as { results: any[] };
  const films: Array<Film> = [];
  for (const {
    id,
    title,
    release_date,
    director,
    poster_path,
    overview,
  } of results) {
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
