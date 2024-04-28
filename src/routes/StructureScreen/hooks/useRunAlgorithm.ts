import {useMutation} from '@tanstack/react-query';

import {useAppDispatch, useAppSelector} from '$hooks/redux';
import {AlgorithmArgument} from '$lib/algorithm';
import {postModify} from '$api/postModify';
import {setLoading, setStructureFrame} from '$redux/rootSlice';

function useRunAlgorithm(
  structureId: string,
  algorithmId: string,
  args: Record<string, AlgorithmArgument>
) {
  const structureData = useAppSelector(state => state.structureData);
  const dispatch = useAppDispatch();

  const {mutate: runModify, isPending: isPendingModify} = useMutation({
    mutationKey: ['modify', algorithmId],
    mutationFn: () => postModify(structureId, algorithmId, structureData, args),
    onSuccess: data => {
      dispatch(setStructureFrame(data));
      dispatch(setLoading(false));
    },
    onError: () => {
      dispatch(setLoading(false));
    },
  });

  const handleRunModify = () => {
    dispatch(setLoading(true));
    runModify();
  };

  return {
    handleRunModify,
    isPending: isPendingModify,
  };
}

export default useRunAlgorithm;
