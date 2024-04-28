import {drawFrame} from '$lib/draw/frame';
import {store} from '$redux/store';

function drawCanvasGenerator() {
  let previousStep = 0;
  let currentFrame = 0;

  return (ctx: CanvasRenderingContext2D) => {
    const {isRunning, structureFrame, steps, currentStep} = store.getState();

    if (!isRunning) {
      drawFrame(ctx, structureFrame);
    } else {
      if (currentStep !== previousStep) {
        previousStep = currentStep;
        currentFrame = 0;
      }

      const step = steps[currentStep];
      if (!step) return;

      if (step.frames.length === 0) return;

      const frame = step.frames[currentFrame];
      if (!frame) return;

      drawFrame(ctx, frame);

      currentFrame = Math.min(currentFrame + 1, step.frames.length - 1);
    }
  };
}

export const drawCanvas = drawCanvasGenerator();
