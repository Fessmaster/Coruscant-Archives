export function getResponse(url: string) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response);
}
