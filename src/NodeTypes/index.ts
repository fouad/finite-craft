import { NodeTypes } from 'reactflow';

import PlaceholderNode from './PlaceholderNode';
import WorkflowNode from './WorkflowNode';
import MergeWordNode from './MergeWordNode';

// two different node types are needed for our example: workflow and placeholder nodes
const nodeTypes: NodeTypes = {
  placeholder: PlaceholderNode,
  workflow: WorkflowNode,
  merge: MergeWordNode,
};

export default nodeTypes;
