import {
  ApiArchiveResponse,
  ApiImage,
  ApiSingleResponse,
} from "@/lib/api-client";
import { apiRequest } from "@/lib/api-request";
import {
  NestFilms,
  NestPeople,
  NestPlanets,
  NestSpecies,
  NestStarships,
  NestVehicles,
} from "@/types/nest-interfaces";


const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;

interface NestPerson {
  id: number;
  name: string;
  height: number;
  mass: number;
  gender: string;
  images: ApiImage[];
}

interface PersonCardData {
  id: number;
  name: string;
  height: number;
  mass: number;
  gender: string;
  imageUrl: string;
}

interface fullPersonData extends NestPeople {
  homeworld: NestPlanets;
  films: NestFilms[];
  species: NestSpecies[];
  vehicles: NestVehicles[];
  starships: NestStarships[];
}

export async function getPeopleForMainPage() {
  const rawData = await apiRequest<ApiArchiveResponse<NestPerson>>("/people");
  rawData;
  return {
    totalCount: rawData.data.countEntities,
    arrayOfEntities: rawData.data.result.slice(0, 4).map((person) => {
      const imageName = person.images[0]?.url;
      const fullImageURL = person.images[0]?.url
        ? `${IMAGE_BASE}/${imageName}`
        : undefined;

      return {
        id: person.id,
        name: person.name,
        height: person.height,
        mass: person.mass,
        gender: person.gender,
        image: fullImageURL,
      };
    }),
  };
}

export async function getPeopleArray(page: number) {
  const skip = (page - 1) * 20;
  const rawData = await apiRequest<ApiArchiveResponse<NestPerson>>(
    `/people?skip=${skip}`,
  );

  return {
    navigation: rawData.data.navigation,
    total: rawData.data.countEntities,
    arrayOfEntities: rawData.data.result.map((person) => {
      const imageName = person.images[0]?.url;
      const fullImageURL = person.images[0]?.url
        ? `${IMAGE_BASE}/${imageName}`
        : undefined;

      return {
        id: person.id,
        name: person.name,
        height: person.height,
        mass: person.mass,
        gender: person.gender,
        image: fullImageURL,
      };
    }),
  };
}

export async function getPeopleByID(id: number)  {
  interface RelationItems {
    id: number;
    name: string;
    img: string | undefined;
  }

  const rawData = await apiRequest<ApiSingleResponse<fullPersonData>>(
    `/people/${id}`,
  );

  const getFirstImage = (images?: { url: string }[]): string | undefined => {
    return images?.[0]?.url ? `${IMAGE_BASE}/${images[0].url}` : undefined;
  };

  if (rawData.statusCode === 404) {
    //TODO Зробити сторінку заглушку
  }

  const person = rawData.data;

  
  const technicalSpecs = [
    { label: "Height", value: person.height },
    { label: "Mass", value: person.mass },
    { label: "Hair Color", value: person.hair_color },
    { label: "Skin Color", value: person.skin_color },
    { label: "Eye Color", value: person.eye_color },
    { label: "Birth Year", value: person.birth_year },
    { label: "Gender", value: person.gender },
  ];

  const metaFields = [
    {label: 'Mass', value: person.mass},
    {label: 'Height', value: person.height},
    {label: 'Gender', value: person.gender},
  ]

  const personAccordions = [
    {
      id: 'homeworld',
      title: "Homeworld",
      content: {title: person?.homeworld.name, url: `/planets/${person?.homeworld.id}`}
    },
    {
      id: 'starships',
      title: 'Starships',
      content: (person.starships || []).map ((st: NestStarships)=> ({
      title: st.name,
      url:`/starships/${st.id}`
    })),
    },
    {
      id: 'vehicles',
      title: 'Vehicles',
      content: (person.vehicles || []).map ((veh: NestVehicles) => ({
      title: veh.name,
      url:`/vehicles/${veh.id}`
    })),
    },
    {
      id: 'films',
      title: 'Films',
      content: (person.films || []).map((f: NestFilms)=> ({
      title: f.title,
      url:`/films/${f.id}`
    })),
    },
    {
      id: 'species',
      title: 'Species',
      content: (person.species || []).map ((spec: NestSpecies)=> ({
      title: spec.name,
      url:`/species/${spec.id}`
    })),
    },
  ]

  return {
    id: person.id,
    name: person.name,
    about: person.about || 'Unknown',
    table: technicalSpecs,
    mainImage: getFirstImage(person.images),
    metaFields: metaFields,
    personAccordions: personAccordions,
    images: person.images
      ?.slice(1)
      .map((img) => `${IMAGE_BASE}/${img.url}`) || [],
    homeworld: person.homeworld
      ? {
          id: person.homeworld.id,
          name: person.homeworld.name,
          img: getFirstImage(person.homeworld.images),
        }
      : undefined,
    films: (person.films || []).map((f: NestFilms): RelationItems => ({
      id: f.id,
      name: f.title,
      img: getFirstImage(f.images)
    })),
    species: (person.species || []).map ((spec: NestSpecies): RelationItems => ({
      id: spec.id,
      name: spec.name,
      img: getFirstImage(spec.images)
    })),
    vehicles: (person.vehicles || []).map ((veh: NestVehicles): RelationItems => ({
      id: veh.id,
      name: veh.name,
      img: getFirstImage(veh.images)
    })),
        starships: (person.starships || []).map ((st: NestStarships): RelationItems => ({
      id: st.id,
      name: st.name,
      img: getFirstImage(st.images)
    })),
  };
}

