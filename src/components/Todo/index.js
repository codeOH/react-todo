import React, { useState, useEffect, memo, useRef } from 'react'
import { deepClone, isEmptyObj } from '../../api/util'
import './style.css'

const Todo = props => {
  const [inputValue, setInputValue] = useState('')
  const [todoList, setTodoList] = useState([])
  const [currentToodoList, setCurrentTodoList] = useState([])
  const btnAll = useRef(null)
  const btnActive = useRef(null)
  const btnCompleted = useRef(null)

  const handleChange = e => {
    setInputValue(e.target.value)
  }

  const handleKeyPress = e => {
    if (e.charCode === 13 && inputValue != '') {
      setTodoList([
        { id: Date.now().toString(36), value: inputValue, isCompleted: false },
        ...todoList
      ])
      setInputValue('')
      return
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
        return item
      })
    } else {
      newTodoList = todoList.map(item => {
        item.isCompleted = !item.isCompleted
        return item
      })
    }
    setTodoList(newTodoList)
  }

  const handleStatusChange = (e, id) => {
    // 将当前分项的isCompleted字段置为!该字段
    // console.log(e)
    const newTodoList = todoList.map(item => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted
      }

      return item
    })

    setTodoList(newTodoList)
  }

  const handleSelectAllClick = e => {
    btnActive.current.className = ''
    btnCompleted.current.className = ''
    e.target.className = 'selected'
    setCurrentTodoList(deepClone(todoList))
  }

  const handleSelectActiveClick = e => {
    btnAll.current.className = ''
    btnCompleted.current.className = ''
    e.target.className = 'selected'

    setCurrentTodoList(todoList.filter(item => !item.isCompleted))
  }

  const handleSelectCompletedClick = e => {
    btnAll.current.className = ''
    btnActive.current.className = ''
    e.target.className = 'selected'
    setCurrentTodoList(todoList.filter(item => item.isCompleted))
  }

  const handleClearCompletedClick = e => {
    setTodoList(todoList.filter(item => !item.isCompleted))
  }

  useEffect(() => {
    const newTodoList = deepClone(todoList)
    setCurrentTodoList(newTodoList)
  }, [todoList])

  return (
    <div className="todo-container">
      <div className="input-box">
        <label>
          <i className="iconfont" onClick={handleAllStatusChange}>
            &#xe602;
          </i>
        </label>
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      {isEmptyObj(todoList) ? null : (
        <ul className="todo-list">
          {currentToodoList.map(item => (
            <li className="todo-list-item" key={item.id}>
              <input
                type="checkbox"
                className="finish-checkbox"
                checked={item.isCompleted}
                onChange={e => {
                  handleStatusChange(e, item.id)
                }}
              />
              <span className="item-content">{item.value}</span>
            </li>
          ))}
        </ul>
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
