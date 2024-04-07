import {useRef} from 'react';

type ReturnType = [() => DOMMatrix, (m: DOMMatrix) => void, () => void];

function useDOMMatrix(): ReturnType {
  const matrixRef = useRef<DOMMatrix | null>(null);

  const getMatrix = () => {
    if (matrixRef.current === null) {
      matrixRef.current = new DOMMatrix();
    }

    return matrixRef.current;
  };

  const setMatrix = (m: DOMMatrix) => {
    matrixRef.current = m;
  };

  const resetMatrix = () => {
    const matrix = getMatrix();

    matrix.a = 1;
    matrix.b = 0;
    matrix.c = 0;
    matrix.d = 1;
    matrix.e = 0;
    matrix.f = 0;
  };

  return [getMatrix, setMatrix, resetMatrix];
}

export default useDOMMatrix;
