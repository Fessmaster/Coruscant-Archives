export function parseUrl(url: string) {
  //'https://swapi.dev/api/films/6/' => 6

  if (url.at(-1) === '/') {
    url = url.substring(0, url.length - 1);
  }

  const id = Number(url.slice(url.lastIndexOf('/') + 1));

  return isNaN(id) ? null : id;
}
