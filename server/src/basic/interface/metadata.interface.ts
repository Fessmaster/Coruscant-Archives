export interface IMetadata<T>{
  relations: (Extract<keyof T, string> | string) []
  fieldList: string[]
}