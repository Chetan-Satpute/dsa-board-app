export enum AlgorithmParameterType {
  Number = 'number',
  NumberArray = 'number[]',
}

export interface AlgorithmParameter {
  title: string;
  type: AlgorithmParameterType;
}

export interface Algorithm {
  id: string;
  name: string;
  parameters: AlgorithmParameter[];
}

export type AlgorithmArgument = number | number[];
