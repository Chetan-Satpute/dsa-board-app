import {drawFrame} from '$lib/draw/frame';
import {store} from '$redux/store';

function drawCanvasGenerator() {
  return (ctx: CanvasRenderingContext2D) => {
    const {isRunning, structureFrame} = store.getState();

    if (!isRunning) {
      drawFrame(ctx, structureFrame);
    }
  };
}

export const drawCanvas = drawCanvasGenerator();
