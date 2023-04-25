import React from 'react';
import { useHomeContext } from '../context';

export default function Popup() {

  const {
		isEdit,
		setIsEdit,
		addTodo,
		editTodo,
		setPopupActive,
		noTextWarning,
		newTodo,
		setNewTodo,
    	editTodoId
	} = useHomeContext();

  const closeModal = () => {
		setPopupActive(false);
		setIsEdit(false);
		setNewTodo("");
	}


  return (
    <div className="popup">
		<div className="closePopup" onClick={closeModal}>X</div>
		<div className="content">
			{isEdit ? 
				<h3>Update Task</h3> : 
				<h3>Add Task</h3>
			}
			<input type="text" className="add-todo-input" placeholder={"Enter to-do text"} onChange={e => setNewTodo(e.target.value)} value={newTodo} autoFocus/>
			{noTextWarning ? (<div style={{color:"red", marginTop: "5px"}}>Please enter a Todo</div>) : "" }
			{isEdit ?
				<div className="button" onClick={()=>editTodo(newTodo, editTodoId)}>Update Task</div> : 
				<div className="button" onClick={()=>addTodo(newTodo)}>Create Task</div>
			}
		</div>
	</div>
  )
}
