export interface Element {
  id: string;
  name: string;
  referenceFrom: number | string;
  referenceTo: number | string;
  result: number | string;
}

export interface ElementDetails {
  name: string;
  description: string;
  unit: string;
}

export interface ElementData {
  [key: string]: ElementDetails;
}

export interface Test {
  id: number;
  date: string | number;
  location: string;
  elements: Element[];
}

export interface TestOptions {
  id: number;
  isOptionsOpen: boolean;
}
