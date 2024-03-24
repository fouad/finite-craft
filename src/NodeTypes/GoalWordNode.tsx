import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import cx from 'classnames'

import styles from './NodeTypes.module.css'
import useNodeClickHandler from '../hooks/useNodeClick'

const GoalWordNode = ({ id, data }: NodeProps) => {
  return (
    <div
      className={cx(
        'relative',
        styles.node,
        styles.goalWord,
        data.success === true && styles.success,
        data.success === false && styles.fail
      )}
    >
      <div
        className="absolute"
        style={{
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: 6,
          padding: '2px 0',
          top: -4,
          left: 0,
          width: '100%',
          color: 'white',
          background: '#0984e3',
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
        }}
      >
        Word of the Day
      </div>
      {data.label}
      <Handle
        className={styles.handle}
        type="target"
        position={Position.Top}
        isConnectable={false}
      />
    </div>
  )
}

export default memo(GoalWordNode)
