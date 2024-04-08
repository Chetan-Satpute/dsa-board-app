export interface Node {
  x: number;
  y: number;

  corners: number;
  value: number;
  color: string;
}

export const NODE_HEIGHT = 30;
export const NODE_WIDTH = 60;

export function drawNode(ctx: CanvasRenderingContext2D, node: Node) {
  ctx.beginPath();

  ctx.moveTo(node.x + 1, node.y + 1);
  ctx.roundRect(node.x + 1, node.y + 1, NODE_WIDTH - 2, NODE_HEIGHT - 2, [
    node.corners & 0b1000 ? NODE_HEIGHT / 4 : 0,
    node.corners & 0b0100 ? NODE_HEIGHT / 4 : 0,
    node.corners & 0b0010 ? NODE_HEIGHT / 4 : 0,
    node.corners & 0b0001 ? NODE_HEIGHT / 4 : 0,
  ]);

  ctx.closePath();

  ctx.strokeStyle = node.color;
  ctx.fillStyle = node.color;

  ctx.font = `bold ${(NODE_HEIGHT * 3) / 5}px Roboto`;
  ctx.fillText(
    Number.isNaN(node.value) ? '-' : node.value.toString(),
    node.x + 1 + (NODE_WIDTH - 2) / 2,
    node.y + 1 + (NODE_HEIGHT - 2) / 2
  );

  ctx.stroke();
}
