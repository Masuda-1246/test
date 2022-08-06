import React, { useState } from 'react'

const InputComponent = (props) => {
  const id = props.id
  const data = props.data[id]
  const [form,setForm] = useState(data)
  console.log(data)
  const handleChangeForm = (event) => {
    setForm(event.currentTarget.value)
    console.log(props.data)
  }
  return (
    <div>
      <label >{props.title}</label>
      <input name={props.id} type="text" value={form} onChange={(event) => handleChangeForm(event)}/>
    </div>
  )
}

export default InputComponent;