import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import cx from 'classnames'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


import styles from './NodeTypes.module.css'
import usePlaceholderClick from '../hooks/usePlaceholderClick'

const PlaceholderNode = ({ id, data }: NodeProps) => {
  // see the hook implementation for details of the click handler
  // calling onClick turns this node and the connecting edge into a workflow node
  const onClick = usePlaceholderClick(id)

  const nodeClasses = cx(styles.node, styles.placeholder)

  return (
    <>
    <div onClick={onClick} className={nodeClasses}>
      {data.label}
      <Handle
        className={styles.handle}
        type="target"
        position={Position.Top}
        isConnectable={false}
      />
      <Handle
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
    <Drawer>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      beep!
    </DrawerFooter>
  </DrawerContent>
</Drawer>
    </>
  )
}

export default memo(PlaceholderNode)
