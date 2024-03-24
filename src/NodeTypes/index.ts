import { NodeTypes } from 'reactflow';

import PlaceholderNode from './PlaceholderNode';
import WorkflowNode from './WorkflowNode';
import MergeWordNode from './MergeWordNode';
import GenWordNode from './GenWordNode';
import GoalWordNode from './GoalWordNode';

// two different node types are needed for our example: workflow and placeholder nodes
const nodeTypes: NodeTypes = {
  placeholder: PlaceholderNode,
  workflow: WorkflowNode,
  merge: MergeWordNode,
  generated: GenWordNode,
  goal: GoalWordNode,
};

export default nodeTypes;
