export interface Dog {
  id: number;
  name: string;
  img: string;
  breed: string;
  age: number;
  zip_code: string;
}

export interface GeoBounds {
  top_left: {
    lat: number;
    lon: number;
  };
  bottom_right: {
    lat: number;
    lon: number;
  };
}
