import {Node, drawNode} from './node';

export interface Frame {
  nodes: Node[];
}

export function drawFrame(ctx: CanvasRenderingContext2D, frame: Frame) {
  for (let node of frame.nodes) {
    drawNode(ctx, node);
  }
}
