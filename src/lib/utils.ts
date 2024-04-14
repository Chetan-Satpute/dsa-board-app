import {Frame} from './draw/frame';

export function createEmptyFrame(): Frame {
  return {nodes: [], edges: [], labels: []};
}
