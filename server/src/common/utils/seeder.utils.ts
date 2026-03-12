import { error } from "console";

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

export function getRawData(res: any) {
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
    return {...rawData, external_id}  
  });
}

export function validateNumber (data: any, fields: string[]){
  return data.map(person => {
    for (const key of fields){      
      if (person[key]){      
        person[key] = isNaN(Number(person[key])) ? null : Number(person[key])        
      }
    }
    return person    
  })
}

export function getSaveDate (data: any){
  return
}