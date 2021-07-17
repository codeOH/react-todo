import React from 'react'

const TodoItem = props => {
  const { item, todoList } = props
  const { handleStatusChange } = props

  console.log('子组件渲染')

  return (
    <li className="todo-list-item">
      <input
        type="checkbox"
        className="finish-checkbox"
        checked={item.isCompleted}
        onChange={e => handleStatusChange(e)}
      />
      <span className="item-content">{item.value}</span>
    </li>
  )
}

function areEqual(prevProps, nextProps) {
  console.log('prev', prevProps)
  console.log('next', nextProps)
  return prevProps.item.isCompleted === nextProps.item.isCompleted
}

// BUG 点击非第一个分项时，会清除前面的todoItem
export default React.memo(TodoItem, areEqual)
