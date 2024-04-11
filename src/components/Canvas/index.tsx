import {useCallback, useRef} from 'react';

import useAnimationFrame from '$hooks/useAnimationFrame';
import useCanvasInteraction from '$hooks/useCanvasInteraction';

interface CanvasProps {
  containerRef: React.RefObject<HTMLDivElement>;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

function Canvas(props: CanvasProps) {
  const {containerRef, draw} = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    transformMatrix,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
    handleDoubleClick,
  } = useCanvasInteraction();

  const renderAnimationFrame = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (container && canvas) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.setTransform(transformMatrix);
        draw(ctx);
      }
    }
  }, [containerRef, canvasRef, transformMatrix, draw]);

  useAnimationFrame(renderAnimationFrame);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
    />
  );
}

export default Canvas;
