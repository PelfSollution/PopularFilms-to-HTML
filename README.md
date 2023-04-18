# Generador de HTML en Typescript

Se trata de hacer un programa en Typescript que genera una página en HTML a partir de datos leídos en JSON. Se proporciona un ejemplo sencillo, con una sola página, a modo de guía.

El programa debe leer datos de alguna API (habría que buscar APIs que devuelvan datos en JSON), cargar esos datos en objetos de una clase creada especialmente para ello (escogiendo los campos que se quieren conservar, ya que quizás la API devuelve muchos más), y luego generar HTML incrustando los datos en el HTML.

El tipo de los datos es libre, según la API, pero la página principal (`index.html`) debería ser una lista de elementos (el ejemplo proporcionado son usuarios, pero pueden ser películas, libros, coches, eventos, etc.) y luego hay que generar páginas para cada elemento de la lista, de tal manera que la página principal tenga links (elementos de tipo `<a>`) a las páginas individuales. Por ejemplo, si se muestran películas, `index.html` mostraría una lista de películas y luego habría varios ficheros `.html` uno para cada película, con más detalles sobre cada una.

La lista debe tener almenos 50 elementos, pero no tiene límite superior (excepto la capacidad del navegador para mostrar la página, que es enorme).

Recomendaciones:
- Hacer-se una chuleta (escrita a mano!) de las técnicas necesarias antes de empezar: leer JSON, usar `fetch` de forma asíncrona, crear una clase en Typescript, convertir una lista de objetos genéricos a objetos de la clase, generar HTML usando datos, etc. El programa proporcionado es un buen material de estudio de esas técnicas.
- Ir por pasos en la implementación (tener siempre algo funcionando, que se va ampliando commit por commit): primero leer datos de la API (y mostrar en consola), luego crear clases que los almacenan (y mostrar de nuevo en consola), luego generar una página sencillísima (y visualizarla con un navegador), luego irla ampliando, y finalmente poner estilos en CSS.

## Entregable

Para hacer esta práctica hay que:
- Hacer un fork de este repositorio.
- Trabajar en el *fork* haciendo commits regularmente (una práctica que aparece entera en un solo commit tendrá una nota muy baja o cero, hay que enseñar el proceso intermedio).
- Al finalizar, se debe descargar un ZIP y entregar en el Campus Online de UPC School (habrá una tarea para ello).

**Muy importante**: la solución debe sustituir el código original (no debe quedar rastro, ni nombres, ni nada de nada). Si bien el ejemplo puede contener partes reaprovechables, se recomienda empezar _desde cero_ (ya que eso produce un aprendizaje de mucha más profundidad).

**To run**:

bun run main.ts




