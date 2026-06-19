import { ApiImage, ApiResponse } from "@/lib/api-client";
import { apiRequest } from "@/lib/api-request";

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

export async function getPeopleForMainPage() {
  const rawData = await apiRequest<NestPerson[]>("/people");
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
    const skip = (page-1)*20
    const rawData = await apiRequest<NestPerson[]>(`/people?skip=${skip}`);
    
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
    }
}
