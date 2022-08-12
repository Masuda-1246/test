import { useNavigate } from 'react-router-dom'
import  InputComponent from '../components/InputComponent'
import React from 'react'
import { db } from '../firebase'
import {collection, setDoc, doc} from 'firebase/firestore'
import { useLocation } from "react-router-dom"

const lists = [
  {title:"目標",name:"goal_of_ability_of_self_management_endYear",type:"text"},
  {title:"成長できたこと",name:"evaluation_of_ability_of_self_management_endYear",type:"text"},
  {title:"さらに成長したいこと",name:"ability_of_self_management_startingYear",type:"text"},
]

const SelfManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hundleSubmit = async (event) => {
    console.log(location.state.value)
    const uid = location.state.value.uid
    const usersRef = doc(collection(db, "users"),uid);
    event.preventDefault();
    const {goal_of_ability_of_self_management_endYear, evaluation_of_ability_of_self_management_endYear, ability_of_self_management_startingYear} = event.target.elements;
    const userData = {
      first_grader:{
        self_management_endYear:{
          goal_of_ability_of_self_management_endYear:goal_of_ability_of_self_management_endYear.value,
          evaluation_of_ability_of_self_management_endYear:evaluation_of_ability_of_self_management_endYear.value,
          ability_of_self_management_startingYear:ability_of_self_management_startingYear.value,
        }
      }
    }
    await setDoc(usersRef,userData,{merge:true});
    console.log(userData)
    navigate("/")
  }
  return (
    <div className="FirstPage">
      <h1>自己理解・自己管理能力</h1>
      <form onSubmit={hundleSubmit}>
      {
        lists.map((list) => 
          <InputComponent title={list.title} id={list.name} key={list.title} data={location.state.value.first_grader.self_management_endYear}/>
        )
      }
      <button>next</button>
      </form>
    </div>
  );
}

export default SelfManagement;