import {useRef} from 'react';

import useDOMMatrix from '$hooks/useDOMMatrix';
import {Point} from '$lib/types';

function useCanvasInteraction() {
  const [getPreviousMatrix, setPreviousMatrix, resetPreviousMatrix] =
    useDOMMatrix();
  const [getMatrix, , resetMatrix] = useDOMMatrix();

  const dragStartRef = useRef<Point | null>(null);
  const pinchStartRef = useRef<number | null>(null);

  const handleMouseDown: React.MouseEventHandler<HTMLCanvasElement> = event => {
    setPreviousMatrix(DOMMatrix.fromMatrix(getMatrix()));

    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handleTouchStart: React.TouchEventHandler<
    HTMLCanvasElement
  > = event => {
    setPreviousMatrix(DOMMatrix.fromMatrix(getMatrix()));

    // drag start
    if (event.touches.length === 1) {
      dragStartRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    }

    // zoom start
    if (event.touches.length === 2) {
      pinchStartRef.current = Math.hypot(
        event.touches[1].clientX - event.touches[0].clientX,
        event.touches[1].clientY - event.touches[0].clientY
      );
    }
  };

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = event => {
    const matrix = getMatrix();
    const dragStart = dragStartRef.current;
    const previousMatrix = getPreviousMatrix();

    if (dragStart) {
      matrix.e = previousMatrix.e + (event.clientX - dragStart.x);
      matrix.f = previousMatrix.f + (event.clientY - dragStart.y);
    }
  };

  const handleTouchMove: React.TouchEventHandler<HTMLCanvasElement> = event => {
    const canvas = event.target as HTMLCanvasElement;

    const matrix = getMatrix();
    const dragStart = dragStartRef.current;
    const pinchStart = pinchStartRef.current;
    const previousMatrix = getPreviousMatrix();

    if (pinchStart && event.touches.length === 2) {
      const canvasBoundingRect = canvas.getBoundingClientRect();

      const position: Point = {
        x:
          (event.touches[0].clientX + event.touches[1].clientX) / 2 -
          matrix.e -
          canvasBoundingRect.left,
        y:
          (event.touches[0].clientY + event.touches[1].clientY) / 2 -
          matrix.f -
          canvasBoundingRect.top,
      };

      const previousScale = {
        x: matrix.a,
        y: matrix.d,
      };

      const pinch = Math.hypot(
        event.touches[1].clientX - event.touches[0].clientX,
        event.touches[1].clientY - event.touches[0].clientY
      );

      const newScale = (pinch / pinchStart) * previousMatrix.a;

      matrix.a = newScale;
      matrix.d = newScale;

      // lower bound
      matrix.a = Math.max(0.5, matrix.a);
      matrix.d = Math.max(0.5, matrix.d);

      // upper bound
      matrix.a = Math.min(1.5, matrix.a);
      matrix.d = Math.min(1.5, matrix.d);

      const newPosition: Point = {
        x: (position.x / previousScale.x) * matrix.a,
        y: (position.y / previousScale.y) * matrix.d,
      };

      matrix.e -= newPosition.x - position.x;
      matrix.f -= newPosition.y - position.y;
    } else if (dragStart) {
      matrix.e = previousMatrix.e + (event.touches[0].clientX - dragStart.x);
      matrix.f = previousMatrix.f + (event.touches[0].clientY - dragStart.y);
    }
  };

  const handleMouseUp: React.MouseEventHandler<HTMLCanvasElement> = () => {
    dragStartRef.current = null;
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLCanvasElement> = () => {
    dragStartRef.current = null;
    pinchStartRef.current = null;
  };

  const handleWheel: React.WheelEventHandler<HTMLCanvasElement> = event => {
    const canvas = event.target as HTMLCanvasElement;
    const matrix = getMatrix();

    const canvasBoundingRect = canvas.getBoundingClientRect();

    const position: Point = {
      x: event.clientX - matrix.e - canvasBoundingRect.left,
      y: event.clientY - matrix.f - canvasBoundingRect.top,
    };

    const previousScale = {
      x: matrix.a,
      y: matrix.d,
    };

    matrix.a -= event.deltaY * 0.001;
    matrix.d -= event.deltaY * 0.001;

    // lower bound
    matrix.a = Math.max(0.5, matrix.a);
    matrix.d = Math.max(0.5, matrix.d);

    // upper bound
    matrix.a = Math.min(1.5, matrix.a);
    matrix.d = Math.min(1.5, matrix.d);

    const updatedPosition: Point = {
      x: (position.x / previousScale.x) * matrix.a,
      y: (position.y / previousScale.y) * matrix.d,
    };

    matrix.e -= updatedPosition.x - position.x;
    matrix.f -= updatedPosition.y - position.y;
  };

  const handleDoubleClick: React.MouseEventHandler<HTMLCanvasElement> = () => {
    // reset matrix on double click
    resetPreviousMatrix();
    resetMatrix();
  };

  return {
    transformMatrix: getMatrix(),
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleWheel,
    handleDoubleClick,
  };
}

export default useCanvasInteraction;
