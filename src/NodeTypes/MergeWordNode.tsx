import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import cx from 'classnames';

import styles from './NodeTypes.module.css';
import usePlaceholderClick from '../hooks/usePlaceholderClick';
import useMergeWordClick from '@/hooks/useMergeWordClick';

const MergeWordNode = ({ id, data }: NodeProps) => {
  // see the hook implementation for details of the click handler
  // calling onClick turns this node and the connecting edge into a workflow node
  const onClick = useMergeWordClick(id);

  const nodeClasses = cx(styles.node, styles.placeholder);

  return (
    <div onClick={onClick} className={nodeClasses}>
      {data.label}
      <Handle
        className={styles.handle}
        type="target"
        position={Position.Left}
        isConnectable={false}
      />
    </div>
  );
};

export default memo(MergeWordNode);
