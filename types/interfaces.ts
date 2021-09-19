export interface Element {
  id: string;
  name: string;
  refFrom: number;
  refTo: number;
  result: number;
}

export interface Test {
  id: number;
  date: Date;
  location: string;
  elements?: Element[];
}
