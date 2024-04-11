import {Point} from '$lib/types';
import {NODE_HEIGHT, NODE_RADIUS, NODE_WIDTH} from './node';

export enum EdgeType {
  DIRECTED = 'DIRECTED',
  UNDIRECTED = 'UNDIRECTED',
  BIDIRECTED = 'BIDIRECTED',
}

export const EDGE_HEAD_LENGTH = 10;

export interface Edge {
  startNodePosition: Point;
  endNodePosition: Point;

  percent: number;
  type: EdgeType;
}

export function drawEdge(ctx: CanvasRenderingContext2D, edge: Edge) {
  ctx.strokeStyle = '#ffffff';

  switch (edge.type) {
    case EdgeType.DIRECTED:
      drawDirectedEdge(ctx, edge);
      break;
    case EdgeType.UNDIRECTED:
      drawUndirectedEdge(ctx, edge);
      break;
    case EdgeType.BIDIRECTED:
      drawBidirectedEdge(ctx, edge);
      break;
  }
}

function drawUndirectedEdge(ctx: CanvasRenderingContext2D, edge: Edge) {
  const startNodeCenter = getCenter(edge.startNodePosition);
  const endNodeCenter = getCenter(edge.endNodePosition);

  const angle = getAngle(startNodeCenter, endNodeCenter);

  const startEdgePoint = getEdgePoint(startNodeCenter, angle);
  const endEdgePoint = getEdgePoint(
    endNodeCenter,
    (Math.PI + angle) % (Math.PI * 2)
  );

  const length = getEdgeLength(startEdgePoint, endEdgePoint);
  const percent = edge.percent / 2;

  endEdgePoint.x =
    startEdgePoint.x + (Math.cos(angle) * length * (50 + percent)) / 100;
  endEdgePoint.y =
    startEdgePoint.y + (Math.sin(angle) * length * (50 + percent)) / 100;

  startEdgePoint.x =
    startEdgePoint.x + (Math.cos(angle) * length * (50 - percent)) / 100;
  startEdgePoint.y =
    startEdgePoint.y + (Math.sin(angle) * length * (50 - percent)) / 100;

  ctx.beginPath();
  ctx.moveTo(startEdgePoint.x, startEdgePoint.y);
  ctx.lineTo(endEdgePoint.x, endEdgePoint.y);
  ctx.closePath();

  ctx.stroke();
}

function drawDirectedEdge(ctx: CanvasRenderingContext2D, edge: Edge) {
  const startNodeCenter = getCenter(edge.startNodePosition);
  const endNodeCenter = getCenter(edge.endNodePosition);

  const angle = getAngle(startNodeCenter, endNodeCenter);

  const startEdgePoint = getEdgePoint(startNodeCenter, angle);
  const endEdgePoint = getEdgePoint(
    endNodeCenter,
    (Math.PI + angle) % (Math.PI * 2)
  );

  let length = getEdgeLength(startEdgePoint, endEdgePoint);

  endEdgePoint.x =
    startEdgePoint.x + (Math.cos(angle) * length * edge.percent) / 100;
  endEdgePoint.y =
    startEdgePoint.y + (Math.sin(angle) * length * edge.percent) / 100;

  length = getEdgeLength(startEdgePoint, endEdgePoint);
  if (length < EDGE_HEAD_LENGTH) return;

  ctx.beginPath();
  ctx.moveTo(startEdgePoint.x, startEdgePoint.y);
  ctx.lineTo(endEdgePoint.x, endEdgePoint.y);
  ctx.closePath();

  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(endEdgePoint.x, endEdgePoint.y);
  ctx.lineTo(
    endEdgePoint.x - EDGE_HEAD_LENGTH * Math.cos(angle - Math.PI / 7),
    endEdgePoint.y - EDGE_HEAD_LENGTH * Math.sin(angle - Math.PI / 7)
  );
  ctx.lineTo(
    endEdgePoint.x - EDGE_HEAD_LENGTH * Math.cos(angle + Math.PI / 7),
    endEdgePoint.y - EDGE_HEAD_LENGTH * Math.sin(angle + Math.PI / 7)
  );
  ctx.lineTo(endEdgePoint.x, endEdgePoint.y);
  ctx.closePath();

  ctx.fill();
}

function drawBidirectedEdge(ctx: CanvasRenderingContext2D, edge: Edge) {
  const startNodeCenter = getCenter(edge.startNodePosition);
  const endNodeCenter = getCenter(edge.endNodePosition);

  const angle = getAngle(startNodeCenter, endNodeCenter);

  const startEdgePointA = getEdgePoint(
    startNodeCenter,
    (angle + 0.1) % (Math.PI * 2)
  );
  const startEdgePointB = getEdgePoint(
    startNodeCenter,
    (angle - 0.1 + Math.PI * 2) % (Math.PI * 2)
  );

  const endEdgePointA = getEdgePoint(
    endNodeCenter,
    (angle - 0.1 + Math.PI) % (Math.PI * 2)
  );
  const endEdgePointB = getEdgePoint(
    endNodeCenter,
    (angle + 0.1 + Math.PI) % (Math.PI * 2)
  );

  const percentA = Math.floor(edge.percent % 1000);
  const percentB = Math.floor(edge.percent / 1000);

  const lengthA = getEdgeLength(startEdgePointA, endEdgePointA);
  const lengthB = getEdgeLength(startEdgePointB, endEdgePointB);

  endEdgePointA.x =
    startEdgePointA.x + (Math.cos(angle) * lengthA * percentA) / 100;
  endEdgePointA.y =
    startEdgePointA.y + (Math.sin(angle) * lengthA * percentA) / 100;

  startEdgePointB.x =
    endEdgePointB.x - (Math.cos(angle) * lengthB * percentB) / 100;
  startEdgePointB.y =
    endEdgePointB.y - (Math.sin(angle) * lengthB * percentB) / 100;

  if (getEdgeLength(startEdgePointA, endEdgePointA) >= EDGE_HEAD_LENGTH) {
    // line segment A
    ctx.beginPath();
    ctx.moveTo(startEdgePointA.x, startEdgePointA.y);
    ctx.lineTo(endEdgePointA.x, endEdgePointA.y);
    ctx.closePath();

    ctx.stroke();

    // head on segment A
    ctx.beginPath();
    ctx.moveTo(endEdgePointA.x, endEdgePointA.y);
    ctx.lineTo(
      endEdgePointA.x - EDGE_HEAD_LENGTH * Math.cos(angle - Math.PI / 7),
      endEdgePointA.y - EDGE_HEAD_LENGTH * Math.sin(angle - Math.PI / 7)
    );

    ctx.lineTo(
      endEdgePointA.x - EDGE_HEAD_LENGTH * Math.cos(angle),
      endEdgePointA.y - EDGE_HEAD_LENGTH * Math.sin(angle)
    );

    ctx.moveTo(endEdgePointA.x, endEdgePointA.y);

    ctx.closePath();

    ctx.fill();
  }

  if (getEdgeLength(startEdgePointB, endEdgePointB) >= EDGE_HEAD_LENGTH) {
    // line segment B
    ctx.beginPath();
    ctx.moveTo(startEdgePointB.x, startEdgePointB.y);
    ctx.lineTo(endEdgePointB.x, endEdgePointB.y);
    ctx.closePath();

    ctx.stroke();

    // head on segment B
    ctx.beginPath();
    ctx.moveTo(startEdgePointB.x, startEdgePointB.y);
    ctx.lineTo(
      startEdgePointB.x + EDGE_HEAD_LENGTH * Math.cos(angle - Math.PI / 7),
      startEdgePointB.y + EDGE_HEAD_LENGTH * Math.sin(angle - Math.PI / 7)
    );

    ctx.lineTo(
      startEdgePointB.x + EDGE_HEAD_LENGTH * Math.cos(angle),
      startEdgePointB.y + EDGE_HEAD_LENGTH * Math.sin(angle)
    );

    ctx.moveTo(startEdgePointB.x, startEdgePointB.y);

    ctx.closePath();

    ctx.fill();
  }
}

function getCenter(position: Point): Point {
  return {
    x: position.x + NODE_WIDTH / 2,
    y: position.y + NODE_HEIGHT / 2,
  };
}

function getAngle(startPoint: Point, endPoint: Point): number {
  let angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);

  if (angle < 0) {
    angle += Math.PI * 2;
  }

  return angle;
}

function getEdgePoint(nodeCenter: Point, angle: number): Point {
  const nodeAngle = Math.atan2(NODE_HEIGHT / 2, NODE_WIDTH / 2 - NODE_RADIUS);
  const circleAngle = 2 * angle;
  const tanAngle = Math.tan(angle);

  switch (true) {
    case angle < nodeAngle || angle >= Math.PI * 2 - nodeAngle:
      return {
        x: nodeCenter.x + NODE_RADIUS + Math.cos(circleAngle) * NODE_RADIUS,
        y: nodeCenter.y + Math.sin(circleAngle) * NODE_RADIUS,
      };
    case angle < Math.PI - nodeAngle:
      return {
        x: nodeCenter.x + (1 / tanAngle) * (NODE_HEIGHT / 2),
        y: nodeCenter.y + NODE_HEIGHT / 2,
      };
    case angle < Math.PI + nodeAngle:
      return {
        x: nodeCenter.x - NODE_RADIUS - Math.cos(circleAngle) * NODE_RADIUS,
        y: nodeCenter.y - Math.sin(circleAngle) * NODE_RADIUS,
      };
    case angle < Math.PI * 2 - nodeAngle:
      return {
        x: nodeCenter.x - (1 / tanAngle) * (NODE_HEIGHT / 2),
        y: nodeCenter.y - NODE_HEIGHT / 2,
      };
    default:
      return nodeCenter;
  }
}

function getEdgeLength(startPoint: Point, endPoint: Point) {
  return Math.hypot(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
}
