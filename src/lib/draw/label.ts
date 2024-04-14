import {NODE_HEIGHT} from './node';

export interface Label {
  x: number;
  y: number;

  text: string;
}

export function drawLabel(ctx: CanvasRenderingContext2D, label: Label) {
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = `bold ${NODE_HEIGHT / 2}px Roboto`;
  ctx.fillText(label.text, label.x, label.y);
}
