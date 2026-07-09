import {
  ApiArchiveResponse,
  ApiImage,
  ApiSingleResponse,
} from "@/lib/api-client";
import { apiRequest } from "@/lib/api-request";
import { DEFAULT_STUBS } from "@/lib/DefaultStabs";
import { ConnectedNodeData } from "@/types/ConnectedNodesData";
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

export async function getPeopleByID(id: number) {
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
    { label: "Mass", value: person.mass },
    { label: "Height", value: person.height },
    { label: "Gender", value: person.gender },
  ];

  const personAccordions = [
    {
      id: "homeworld",
      title: "Homeworld",
      content: {
        title: person?.homeworld.name,
        url: `/planets/${person?.homeworld.id}`,
      },
    },
    {
      id: "starships",
      title: "Starships",
      content: (person.starships || []).map((st: NestStarships) => ({
        title: st.name,
        url: `/starships/${st.id}`,
      })),
    },
    {
      id: "vehicles",
      title: "Vehicles",
      content: (person.vehicles || []).map((veh: NestVehicles) => ({
        title: veh.name,
        url: `/vehicles/${veh.id}`,
      })),
    },
    {
      id: "films",
      title: "Films",
      content: (person.films || []).map((f: NestFilms) => ({
        title: f.title,
        url: `/films/${f.id}`,
      })),
    },
    {
      id: "species",
      title: "Species",
      content: (person.species || []).map((spec: NestSpecies) => ({
        title: spec.name,
        url: `/species/${spec.id}`,
      })),
    },
  ];

  const connectedNodes: ConnectedNodeData[] = [];

  if (person?.homeworld?.id && person?.homeworld?.name) {
    connectedNodes.push({
      id: person.homeworld.id,
      type: "planets",
      categoryTitle: "Homeworld",
      entityTitle: person.homeworld.name,
      imageUrl: getFirstImage(person.homeworld.images) || DEFAULT_STUBS.planet,
      url: `/planets/${person.homeworld.id}`,
    });
  }
  if (person?.films[0]?.id && person?.films[0]?.title) {
    connectedNodes.push({
      id: person.films[0].id,
      type: "films",
      categoryTitle: "Films",
      entityTitle: person.films[0].title,
      imageUrl: getFirstImage(person.films[0].images) || DEFAULT_STUBS.film,
      url: `/films/${person.films[0].id}`,
    });
  }
  if (person?.starships[0]?.id && person?.starships[0]?.name) {
    connectedNodes.push({
      id: person.starships[0].id,
      type: "starships",
      categoryTitle: "Starships",
      entityTitle: person.starships[0].name,
      imageUrl:
        getFirstImage(person.starships[0].images) || DEFAULT_STUBS.starship,
      url: `/starships/${person.starships[0].id}`,
    });
  }

  if (person?.vehicles[0]?.id && person?.vehicles[0]?.name) {
    connectedNodes.push({
      id: person.vehicles[0].id,
      type: "vehicles",
      categoryTitle: "Vehicles",
      entityTitle: person.vehicles[0].name,
      imageUrl:
        getFirstImage(person.vehicles[0].images) || DEFAULT_STUBS.vehicle,
      url: `/vehicles/${person.vehicles[0].id}`,
    });
  }

  if (person?.species[0]?.id && person?.species[0]?.name) {
    connectedNodes.push({
      id: person.species[0].id,
      type: "species",
      categoryTitle: "Species",
      entityTitle: person.species[0].name,
      imageUrl:
        getFirstImage(person.species[0].images) || DEFAULT_STUBS.species,
      url: `/species/${person.species[0].id}`,
    });
  }

  return {
    id: person.id,
    name: person.name,
    about: person.about || "Unknown",
    table: technicalSpecs,
    mainImage: getFirstImage(person.images),
    metaFields: metaFields,
    personAccordions: personAccordions,
    connectedNodes: connectedNodes,
    images:
      person.images?.slice(1).map((img) => `${IMAGE_BASE}/${img.url}`) || [],
  };
}
