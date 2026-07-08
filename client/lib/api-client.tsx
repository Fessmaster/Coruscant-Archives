interface ApiNavigation {
  nextPage:boolean;
  previousPage: boolean;
}

interface BaseApiResponse<T>{
  statusCode: number;
  method: string;
  url: string;
  data: T
}

interface ArchiveDataStructure<T>{
  navigation: {
    nextPage: boolean;
    previousPage: boolean;
  };
  countEntities: number;
  result: T[]
}

export type ApiArchiveResponse<T> = BaseApiResponse<ArchiveDataStructure<T>>
export type ApiSingleResponse<T> = BaseApiResponse<T>

export interface ApiImage{
  id: number,
  deleteAt: string,
  createDate: string,
  updateDate: string,
  url: string
}