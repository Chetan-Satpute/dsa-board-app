export enum AlgorithmParameterType {
  Number = 'number',
  NumberArray = 'number[]',
}

export interface Algorithm {
  id: string;
  name: string;
  parameters: {title: string; type: AlgorithmParameterType}[];
  animated: boolean;
}
