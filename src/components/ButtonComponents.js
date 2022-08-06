import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonComponents = (props) => {
  const navigate = useNavigate();
  
  const hundleLink = () => {
    console.log(props.value)
    navigate(`/${props.link}`,{state:{value:props.value}})
  }
  return (
    <div>
      <label>{props.title}</label>
      <button onClick={hundleLink}>{props.name}</button>
    </div>
  )
}

export default ButtonComponents;