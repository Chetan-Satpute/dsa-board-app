import {useRef} from 'react';
import {Outlet} from 'react-router-dom';

import Canvas from '$components/Canvas';
import {EdgeType} from '$lib/draw/edge';
import {drawFrame} from '$lib/draw/frame';
import {Label} from '$lib/draw/label';
import {NODE_HEIGHT, NODE_WIDTH} from '$lib/draw/node';

let angle = 0;

function StructureScreen() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const drawCanvas = (ctx: CanvasRenderingContext2D) => {
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
    // angle = angle % (Math.PI * 2);

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

  return (
    <div className="flex h-screen w-screen flex-col lg:flex-row">
      <div className="flex h-1/2 w-full flex-col lg:h-full lg:w-3/5">
        <div className="p-2">
          <h1 className="m-0 text-center text-xl">DSA Board</h1>
        </div>
        <div ref={canvasContainerRef} className="flex-1 overflow-hidden">
          <Canvas containerRef={canvasContainerRef} draw={drawCanvas} />
        </div>
      </div>
      <div className="flex h-1/2 w-full flex-col lg:h-full lg:w-2/5">
        <Outlet />
      </div>
    </div>
  );
}

export default StructureScreen;
