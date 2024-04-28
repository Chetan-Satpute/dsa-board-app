import {AxiosError} from 'axios';
import Button from '@mui/material/Button';
import {useQuery} from '@tanstack/react-query';

import {getAlgorithmInfo} from '$api/getAlgorithms';
import AlgorithmCard from '$components/AlgorithmCard';
import Loading from '$components/Loading';
import NotFound from '$components/NotFound';
import SomethingWentWrong from '$components/SomethingWentWrong';
import {useNavigate} from 'react-router-dom';

interface StructurePaneContentProps {
  structureId: string;
}

function StructurePaneContent(props: StructurePaneContentProps) {
  const {structureId} = props;

  const navigate = useNavigate();
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['algorithm-info', structureId],
    queryFn: () => getAlgorithmInfo(structureId),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (
    isError &&
    error instanceof AxiosError &&
    error.response?.status === 404
  ) {
    return <NotFound message={`Structure not found: ${structureId}`} />;
  }

  if (!data || isError) {
    return <SomethingWentWrong />;
  }

  const modifyCards = data.modify.map(info => (
    <AlgorithmCard
      key={info.id}
      algorithmId={info.id}
      name={info.name}
      parameters={info.parameters}
      isModify={true}
      structureId={structureId}
    />
  ));

  const animateButtons = data.animate.map(info => (
    <Button
      key={info.name}
      variant="outlined"
      onClick={() => navigate(`/${structureId}/${info.id}`)}
    >
      {info.name}
    </Button>
  ));

  return (
    <div className="flex flex-1 flex-col p-2">
      {modifyCards.length > 0 && (
        <h4 className="text-center">Modify Structure</h4>
      )}

      <div className="flex flex-col gap-2">{modifyCards}</div>

      {animateButtons.length > 0 && (
        <h4 className="text-center">Run Algorithm</h4>
      )}

      <div className="flex flex-col gap-2">{animateButtons}</div>
    </div>
  );
}

export default StructurePaneContent;
