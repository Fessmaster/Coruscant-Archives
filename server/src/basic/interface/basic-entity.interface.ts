type imageType = {
  id: number;
  url: string;
};
export interface IBasicEntity {
  id: number;
  name?: string;
  title?: string;
  about: string;
  images: imageType[];
  delete_at?: number | null;  
  homeworld?: any;
  vehicles?: any;
  starships?: any;
}
