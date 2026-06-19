interface ApiNavigation {
  nextPage:boolean;
  previousPage: boolean;
}

export interface ApiResponse<T>{
  statusCode: number;
  method: string;
  url: string;
  data: {
    navigation: ApiNavigation;
    countEntities: number;
    result: T
  }
}

export interface ApiImage{
  id: number,
  deleteAt: string,
  createDate: string,
  updateDate: string,
  url: string
}