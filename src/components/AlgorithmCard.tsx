import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

import {Algorithm, AlgorithmParameterType} from '$lib/algorithm';

const placeholderMap: Record<AlgorithmParameterType, string> = {
  [AlgorithmParameterType.Number]: '25',
  [AlgorithmParameterType.NumberArray]: '1,2,3,4,5',
};

interface AlgorithmCardProps extends Algorithm {
  animated: boolean;
}

function AlgorithmCard(props: AlgorithmCardProps) {
  const {name, parameters, animated} = props;

  const parameterFields = parameters.map(param => (
    <TextField
      key={param.title}
      className="w-full"
      variant="standard"
      label={param.title}
      placeholder={placeholderMap[param.type]}
    />
  ));

  return (
    <Card>
      <CardContent className="flex flex-col gap-1 p-1">
        <p className="m-0 font-bold">{name}</p>
        {parameterFields}
      </CardContent>
      <CardActions className="flex !p-0">
        <Button
          variant={animated ? 'contained' : 'text'}
          className="flex-1 !rounded-t-none"
        >
          Run
        </Button>
      </CardActions>
    </Card>
  );
}

export default AlgorithmCard;
