import {useCallback, useRef} from 'react';

import useAnimationFrame from '$hooks/useAnimationFrame';

interface CanvasProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

function Canvas(props: CanvasProps) {
  const {containerRef} = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderAnimationFrame = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (container && canvas) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.arc(
          container.clientWidth / 2,
          container.clientHeight / 2,
          Math.min(container.clientWidth, container.clientHeight) / 2,
          0,
          Math.PI * 2
        );

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      }
    }
  }, [containerRef, canvasRef]);

  useAnimationFrame(renderAnimationFrame);

  return <canvas ref={canvasRef} />;
}

export default Canvas;
