import {useState} from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import {useAppSelector} from '$hooks/redux';
import {
  AlgorithmArgument,
  AlgorithmParameter,
  AlgorithmParameterType,
} from '$lib/algorithm';
import useRunAlgorithm from '$routes/StructureScreen/hooks/useRunAlgorithm';

const placeholderMap: Record<AlgorithmParameterType, string> = {
  [AlgorithmParameterType.Number]: '25',
  [AlgorithmParameterType.NumberArray]: '1,2,3,4,5',
};

interface AlgorithmCardProps {
  algorithmId: string;
  name: string;
  parameters: AlgorithmParameter[];
  isModify: boolean;
  structureId: string;
}

function AlgorithmCard(props: AlgorithmCardProps) {
  const {structureId, algorithmId, name, parameters, isModify} = props;

  const appLoading = useAppSelector(state => state.isLoading);
  const [args, setArgs] = useState(() =>
    getArgumentsFromParameters(parameters)
  );

  const {handleRunModify, handleRunAnimate, isPending} = useRunAlgorithm(
    structureId,
    algorithmId,
    args
  );

  const handleArgumentChange = (
    valueString: string,
    param: AlgorithmParameter
  ) => {
    if (param.type === AlgorithmParameterType.Number) {
      const value = Number(valueString);
      setArgs({...args, [param.title]: Number.isNaN(value) ? 0 : value});
    }

    if (param.type === AlgorithmParameterType.NumberArray) {
      const value = valueString
        .split(',')
        .map(v => Number(v))
        .filter(v => !Number.isNaN(v));

      setArgs({...args, [param.title]: Number.isNaN(value) ? [0] : value});
    }
  };

  const parameterFields = parameters.map(param => (
    <TextField
      key={param.title}
      value={args[param.title].toString()}
      onChange={e => handleArgumentChange(e.target.value, param)}
      className="w-full"
      variant="standard"
      label={param.title}
      placeholder={placeholderMap[param.type]}
    />
  ));

  return (
    <Card>
      <CardContent className="flex flex-col gap-1 p-1">
        <span className="font-kalam font-bold">{name}</span>
        {parameterFields}
      </CardContent>
      <CardActions className="flex !p-0">
        <Button
          variant={isModify ? 'text' : 'contained'}
          className="flex-1 !rounded-t-none"
          onClick={isModify ? handleRunModify : handleRunAnimate}
          disabled={appLoading}
        >
          {isPending ? <CircularProgress size={20} /> : 'Run'}
        </Button>
      </CardActions>
    </Card>
  );
}

const getArgumentsFromParameters = (parameters: AlgorithmParameter[]) => {
  const args: Record<string, AlgorithmArgument> = {};

  return parameters.reduce((acc, obj) => {
    if (obj.type === AlgorithmParameterType.Number) {
      acc[obj.title] = 0;
    }

    if (obj.type === AlgorithmParameterType.NumberArray) {
      acc[obj.title] = [1, 2, 3, 4, 5];
    }

    return acc;
  }, args);
};

export default AlgorithmCard;
