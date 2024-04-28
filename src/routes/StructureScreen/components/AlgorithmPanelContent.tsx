import {AxiosError} from 'axios';
import {useQuery} from '@tanstack/react-query';
import Card from '@mui/material/Card';

import {getAnimateAlgorithm} from '$api/getAnimateAlgorithm';
import AlgorithmCard from '$components/AlgorithmCard';
import CodeBlock from '$components/CodeBlock';
import Loading from '$components/Loading';
import NotFound from '$components/NotFound';
import RunControls from '$components/RunControls';
import SomethingWentWrong from '$components/SomethingWentWrong';
import {useAppSelector} from '$hooks/redux';

interface AlgorithmPanelContentProps {
  structureId: string;
  algorithmId: string;
}

function AlgorithmPanelContent(props: AlgorithmPanelContentProps) {
  const {structureId, algorithmId} = props;

  const isRunning = useAppSelector(state => state.isRunning);
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['animate-algorithm', structureId, algorithmId],
    queryFn: () => getAnimateAlgorithm(structureId, algorithmId),
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

  const {algorithm, code} = data;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 p-2">
      {isRunning ? (
        <RunControls />
      ) : (
        <AlgorithmCard
          structureId={structureId}
          algorithmId={algorithmId}
          name={algorithm.name}
          isModify={false}
          parameters={algorithm.parameters}
        />
      )}

      <Card className="flex-1 !overflow-auto font-ubuntu">
        <CodeBlock text={code} />
      </Card>

      <Card className="h-1/6 !overflow-auto p-2 font-ubuntu">
        <CodeBlock text="linearSearch(target=5)" hlLines={[0]} />
        <CodeBlock text="linearSearch(target=5)" />
      </Card>
    </div>
  );
}

export default AlgorithmPanelContent;
