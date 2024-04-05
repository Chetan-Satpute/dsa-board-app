import {useLayoutEffect} from 'react';

function useAnimationFrame(callback: FrameRequestCallback) {
  useLayoutEffect(() => {
    let requestId = NaN;

    const callbackWrapper: FrameRequestCallback = time => {
      callback(time);
      requestId = requestAnimationFrame(callbackWrapper);
    };

    requestId = requestAnimationFrame(callbackWrapper);

    return () => cancelAnimationFrame(requestId);
  }, [callback]);
}

export default useAnimationFrame;
