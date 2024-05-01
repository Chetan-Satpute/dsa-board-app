import {AxiosError} from 'axios';
import {useEffect, useRef} from 'react';
import {Outlet} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';

import {getCanvasStructure} from '$api/getStructure';
import Canvas from '$components/Canvas';
import Loading from '$components/Loading';
import NotFound from '$components/NotFound';
import SomethingWentWrong from '$components/SomethingWentWrong';
import {useAppDispatch} from '$hooks/redux';
import {drawCanvas} from '$lib/draw';
import {setStructureFrame} from '$redux/rootSlice';

interface StructureScreenContentProps {
  structureId: string;
}

function StructureScreenContent(props: StructureScreenContentProps) {
  const {structureId} = props;

  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['canvas-structure', structureId],
    queryFn: () => getCanvasStructure(structureId),
  });

  useEffect(() => {
    if (data) {
      dispatch(setStructureFrame(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (
    isError &&
    error instanceof AxiosError &&
    error.response?.status === 404
  ) {
    return <NotFound target="structure" />;
  }

  if (!data || isError) {
    return <SomethingWentWrong />;
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col lg:flex-row">
      <div className="flex h-1/2 w-full flex-col lg:h-full lg:w-3/5">
        <div className="p-2">
          <h1 className="m-0 text-center text-xl">DSA Board</h1>
        </div>
        <div ref={canvasContainerRef} className="flex-1 overflow-hidden">
          <Canvas containerRef={canvasContainerRef} draw={drawCanvas} />
        </div>
      </div>
      <div className="flex h-1/2 w-full flex-col lg:h-full lg:w-2/5">
        <Outlet />
      </div>
    </div>
  );
}

export default StructureScreenContent;
