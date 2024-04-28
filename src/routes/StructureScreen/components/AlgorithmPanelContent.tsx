import {AxiosError} from 'axios';
import {useQuery} from '@tanstack/react-query';

import {getAnimateAlgorithm} from '$api/getAnimateAlgorithm';
import Loading from '$components/Loading';
import NotFound from '$components/NotFound';
import SomethingWentWrong from '$components/SomethingWentWrong';
import AlgorithmCard from '$components/AlgorithmCard';
import CodeBlock from '$components/CodeBlock';

interface AlgorithmPanelContentProps {
  structureId: string;
  algorithmId: string;
}

function AlgorithmPanelContent(props: AlgorithmPanelContentProps) {
  const {structureId, algorithmId} = props;

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
    <div className="flex flex-1 flex-col gap-4 p-2">
      <AlgorithmCard
        structureId={structureId}
        algorithmId={algorithmId}
        name={algorithm.name}
        isModify={false}
        parameters={algorithm.parameters}
      />

      <div className="font-ubuntu flex-1 overflow-auto bg-[#1e1e1e]">
        <CodeBlock text={code} hlLines={[1]} />
      </div>
    </div>
  );
}

export default AlgorithmPanelContent;
