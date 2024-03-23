import { SimpleBezierEdge } from 'reactflow';
import PlaceholderEdge from './PlaceholderEdge';
import WorkflowEdge from './WorkflowEdge';

export const edgeTypes = {
  placeholder: PlaceholderEdge,
  workflow: WorkflowEdge,
  simple: SimpleBezierEdge,
};

export default edgeTypes;
