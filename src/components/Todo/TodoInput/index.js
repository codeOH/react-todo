import { useState } from 'react'

const TodoInput = props => {
  const [inputValue, setInputValue] = useState('')
  const { handleAllStatusChange, handleKeyPress } = props
  const handleChange = e => {
    setInputValue(e.target.value)
  }

  const clearInput = () => {
    setInputValue('')
  }

  return (
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
        onKeyPress={e => {
          handleKeyPress(e, inputValue, clearInput)
        }}
      />
    </div>
  )
}

export default TodoInput
