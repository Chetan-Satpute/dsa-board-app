export interface Node {
  x: number;
  y: number;

  corners: number;
  value: number;
  color: string;
}

export const NODE_WIDTH = 60;
export const NODE_HEIGHT = NODE_WIDTH / 2;
export const NODE_RADIUS = NODE_HEIGHT / 2;

export function drawNode(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();

  ctx.moveTo(node.x + 1, node.y + 1);
  ctx.roundRect(node.x + 1, node.y + 1, NODE_WIDTH - 2, NODE_HEIGHT - 2, [
    node.corners & 0b1000 ? NODE_RADIUS : 0,
    node.corners & 0b0100 ? NODE_RADIUS : 0,
    node.corners & 0b0010 ? NODE_RADIUS : 0,
    node.corners & 0b0001 ? NODE_RADIUS : 0,
  ]);

  ctx.closePath();

  const backgroundGradient = ctx.createRadialGradient(
    node.x + 1 + (NODE_WIDTH - 2) / 2,
    node.y + 1 + (NODE_HEIGHT - 2) / 2,
    0,
    node.x + 1 + (NODE_WIDTH - 2) / 2,
    node.y + 1 + (NODE_HEIGHT - 2) / 2,
    (NODE_WIDTH - 2) / 2
  );

  backgroundGradient.addColorStop(0, 'transparent');
  backgroundGradient.addColorStop(1, node.color);

  ctx.fillStyle = backgroundGradient;
  ctx.fill();

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#f5f3ee';
  ctx.stroke();

  ctx.fillStyle = '#f5f3ee';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${NODE_HEIGHT / 2}px Roboto`;
  ctx.fillText(
    Number.isNaN(node.value) ? '-' : node.value.toString(),
    node.x + 1 + (NODE_WIDTH - 2) / 2,
    node.y + 1 + (NODE_HEIGHT - 2) / 2
  );
}
