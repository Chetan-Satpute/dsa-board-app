import {EdgeType} from '$lib/draw/edge';
import {drawFrame} from '$lib/draw/frame';
import {Label} from '$lib/draw/label';
import {NODE_HEIGHT, NODE_WIDTH} from '$lib/draw/node';

function drawCanvasGenerator() {
  let angle = 0;

  return (ctx: CanvasRenderingContext2D) => {
    const nodeA = {
      x: 200,
      y: 200,
      corners: 0b1111,
      value: 579,
      color: '#ffffff',
    };

    const nodeB = {
      x: nodeA.x + 100 * Math.cos(angle),
      y: nodeA.y + 100 * Math.sin(angle),
      corners: 0b1111,
      value: 682,
      color: '#ffffff',
    };

    angle += 0.01;

    const edge = {
      startNodePosition: {x: nodeA.x, y: nodeA.y},
      endNodePosition: {x: nodeB.x, y: nodeB.y},

      percent: 50090,
      type: EdgeType.BIDIRECTED,
    };

    const label: Label = {
      x: nodeA.x - NODE_WIDTH / 2,
      y: nodeA.y + NODE_HEIGHT / 2,

      text: 'array',
    };

    drawFrame(ctx, {
      nodes: [nodeA, nodeB],
      edges: [edge],
      labels: [label],
    });
  };
}

export const drawCanvas = drawCanvasGenerator();
