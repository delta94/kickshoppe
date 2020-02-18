export interface IMockProviderObject {
  request?: {
    query?: string;
    mutation?: string;
    variables?: object;
  };
  result?: {
    data: object;
    errors?: [];
  };
  error?: object;
}

export type IMockProvider = IMockProviderObject[];

export interface IProduct {
  id: string | null;
  name: string | null;
  brand: string | null;
  title: string | null;
  desc: string | null;
  productCategory: string | null;
  shoe: string | null;
  retail: number | null;
  releaseDate: string | null;
  colorway: string | null;
  image: string | null;
  gender: string | null;
}
