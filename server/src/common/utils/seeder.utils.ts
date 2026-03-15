export function getResponse(url: string) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response);
}

export function parseUrl(url: string) {
  //'https://swapi.dev/api/films/6/' => 6

  if (url.at(-1) === '/') {
    url = url.substring(0, url.length - 1);
  }
  const id = Number(url.slice(url.lastIndexOf('/') + 1));
  return isNaN(id) ? null : id;
}

export function getRawData(res: Record<string, any>) {
  return res.map((person) => {    
    const { created, edited, url, ...data } = person;
    const rawData = { ...data };
    const external_id = parseUrl(url);
    for (const [key, value] of Object.entries(rawData)) {
      if (Array.isArray(value)) {
        rawData[key] = value.map((link) => {
          return link.match(/https|http/) ? parseUrl(link) : link;
        });
      }
      if (typeof value === 'string' && value.match(/https|http/))
        rawData[key] = parseUrl(value);
    }
    return { ...rawData, external_id };
  });
}

export function validateNumber(data: Record<string, any>, fields: string[]) {
  return data.map((item) => {
    const newItem = { ...item };
    for (const key of fields) {
      const value = newItem[key]
      if (value != undefined) {
        const num = Number(value)
        newItem[key] = (isNaN(num) ? null : num) as any;
      }
    }
    return newItem;
  });
}

export function createRelationMap(map: Map<number, Record<string, number|number[]>>, fields: string[], data: Record<string, any>) {
  for (const item of Object.values(data)) {
    const { external_id } = item
    const relationFields = {};
    for (const field of fields){
      relationFields[field] = item[field]
    }
    map.set(external_id, relationFields)
  }
}
