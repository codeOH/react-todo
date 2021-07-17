import React, { useState, useRef, useEffect } from 'react'
import { deepClone, isEmptyObj } from '../../api/util'
import TodoInput from './TodoInput'
import TodoItem from '../TodoItem'
import './style.css'

const Todo = props => {
  const [todoList, setTodoList] = useState([])
  const [showMode, setShowMode] = useState('all')
  const btnAll = useRef(null)
  const btnActive = useRef(null)
  const btnCompleted = useRef(null)

  const handleKeyPress = (e, inputValue, callback) => {
    if (e.charCode === 13 && inputValue !== '') {
      console.log('handleKeyPress')
      setTodoList([
        { id: Date.now().toString(36), value: inputValue, isCompleted: false },
        ...todoList
      ])
      callback()
    }
  }

  const handleAllStatusChange = e => {
    // 将todolist中的isCompleted字段置为true
    let flag = false
    let newTodoList = null

    todoList.forEach(item => {
      if (item.isCompleted === false) {
        flag = true
      }
    })

    if (flag) {
      newTodoList = todoList.map(item => {
        item.isCompleted = true
        return Object.assign({}, item)
      })
    } else {
      newTodoList = todoList.map(item => {
        item.isCompleted = !item.isCompleted
        return Object.assign({}, item)
      })
    }
    setTodoList(newTodoList)
  }

  const handleStatusChange = (e, id, checked) => {
    // 将当前分项的isCompleted字段置为!该字段
    // console.log(e)
    console.log(todoList)

    const newTodoList = todoList.map(item => {
      if (item.id === id) {
        return {
          id,
          value: item.value,
          isCompleted: !checked
        }
      }

      return Object.assign({}, item)
    })

    setTodoList(Object.assign([], newTodoList))
  }

  // ref在react生命周期中只存在一个引用，通过currrent访问的永远是最新值
  // const handleStatusChangeRef = useRef(handleStatusChange)

  const handleSelectAllClick = e => {
    btnActive.current.className = ''
    btnCompleted.current.className = ''
    e.target.className = 'selected'
    // setTodoList(deepClone(todoList))
    setShowMode('all')
  }

  // useEffect(() => {
  //   handleStatusChangeRef.current = handleStatusChange
  // })

  const handleSelectActiveClick = e => {
    btnAll.current.className = ''
    btnCompleted.current.className = ''
    e.target.className = 'selected'

    setTodoList(todoList.filter(item => !item.isCompleted))
    setShowMode('active')
  }

  const handleSelectCompletedClick = e => {
    btnAll.current.className = ''
    btnActive.current.className = ''
    e.target.className = 'selected'
    setShowMode('completed')
  }

  const handleClearCompletedClick = e => {
    console.log('handleClearCompletedClick')
    setTodoList(todoList.filter(item => !item.isCompleted))
  }

  // 无用功
  const renderTodoItem = () => {
    let res = null
    console.log(showMode)

    switch (showMode) {
      case 'all':
        res = todoList.map(item => (
          <TodoItem
            key={item.id}
            todoList={todoList}
            item={item}
            handleStatusChange={e => {
              handleStatusChange(e, item.id, item.isCompleted)
            }}
          />
        ))
        break
      case 'active':
        res = todoList
          .filter(item => !item.isCompleted)
          .map(item => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                handleStatusChange={handleStatusChange}
              />
            )
          })
        break
      case 'completed':
        console.log(todoList)
        res = todoList
          .filter(item => item.isCompleted)
          .map(item => {
            return (
              <TodoItem
                key={item.id}
                item={item}
                handleStatusChange={handleStatusChange}
              />
            )
          })
        break
    }

    return res
  }

  // useEffect(() => {
  //   handleStatusChangeRef.current = handleStatusChange
  // })

  return (
    <div className="todo-container">
      <TodoInput
        handleAllStatusChange={e => {
          handleAllStatusChange()
        }}
        handleKeyPress={handleKeyPress}
      />

      {isEmptyObj(todoList) ? null : (
        <ul className="todo-list">{renderTodoItem()}</ul>
      )}

      <div className="footer">
        <span>共{todoList.length}项</span>
        <div className="filter-box">
          <button
            ref={btnAll}
            className="selected"
            onClick={handleSelectAllClick}
          >
            All
          </button>
          <button ref={btnActive} onClick={handleSelectActiveClick}>
            Active
          </button>
          <button ref={btnCompleted} onClick={handleSelectCompletedClick}>
            Completed
          </button>
        </div>
        <button className="clear-completed" onClick={handleClearCompletedClick}>
          clear completed
        </button>
      </div>
    </div>
  )
}
export default Todo
