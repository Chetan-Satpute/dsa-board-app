import {Edge, drawEdge} from './edge';
import {Node, drawNode} from './node';

export interface Frame {
  nodes: Node[];
  edges: Edge[];
}

export function drawFrame(ctx: CanvasRenderingContext2D, frame: Frame) {
  for (const node of frame.nodes) {
    drawNode(ctx, node);
  }

  for (const edge of frame.edges) {
    drawEdge(ctx, edge);
  }
}
