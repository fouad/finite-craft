import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import cx from 'classnames';

import styles from './NodeTypes.module.css';
import useNodeClickHandler from '../hooks/useNodeClick';

const GenWordNode = ({ id, data }: NodeProps) => {
  return (
    <div
      className={cx(styles.node, styles.genWordNode, !data.label ? styles.empty : '')}
    >
      {data.label}
      <Handle
        className={styles.handle}
        type="target"
        position={Position.Top}
        isConnectable={false}
      />
      <Handle
        id="bottom"
        className={styles.handle}
        type="source"
        position={Position.Bottom}
        isConnectable={false}
      />
      <Handle
        id="right"
        className={styles.handle}
        type="source"
        position={Position.Right}
        isConnectable={false}
      />
    </div>
  );
};

export default memo(GenWordNode);
