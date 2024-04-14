import {Edge, drawEdge} from './edge';
import {Label, drawLabel} from './label';
import {Node, drawNode} from './node';

export interface Frame {
  nodes: Node[];
  edges: Edge[];
  labels: Label[];
}

export function drawFrame(ctx: CanvasRenderingContext2D, frame: Frame) {
  for (const node of frame.nodes) {
    drawNode(ctx, node);
  }

  for (const edge of frame.edges) {
    drawEdge(ctx, edge);
  }

  for (const label of frame.labels) {
    drawLabel(ctx, label);
  }
}
