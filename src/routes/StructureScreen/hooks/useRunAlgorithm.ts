import {useMutation} from '@tanstack/react-query';

import {useAppDispatch, useAppSelector} from '$hooks/redux';
import {AlgorithmArgument} from '$lib/algorithm';
import {postModify} from '$api/postModify';
import {setLoading, setStructureFrame, startRunning} from '$redux/rootSlice';
import {postAnimate} from '$api/postAnimate';
import {loadSteps} from '$redux/thunks';

function useRunAlgorithm(
  structureId: string,
  algorithmId: string,
  args: Record<string, AlgorithmArgument>
) {
  const structureData = useAppSelector(state => state.structureData);
  const dispatch = useAppDispatch();

  const {mutate: runModify, isPending: isModifyPending} = useMutation({
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

  const {mutate: runAnimate, isPending: isAnimatePending} = useMutation({
    gcTime: 0,
    mutationKey: ['animate', algorithmId],
    mutationFn: () =>
      postAnimate(structureId, algorithmId, structureData, args),
    onSuccess: data => {
      dispatch(startRunning(data));
      dispatch(loadSteps);
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

  const handleRunAnimate = () => {
    dispatch(setLoading(true));
    runAnimate();
  };

  return {
    handleRunModify,
    handleRunAnimate,
    isPending: isModifyPending || isAnimatePending,
  };
}

export default useRunAlgorithm;
