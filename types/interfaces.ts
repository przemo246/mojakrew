export interface Element {
  id: string;
  name: string;
  referenceFrom: number | string;
  referenceTo: number | string;
  result: number | string;
}

export interface Test {
  id: number;
  date: Date;
  location: string;
  elements?: Element[];
}
