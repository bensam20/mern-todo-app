import { useEffect } from 'react';
import { useHomeContext } from './context';
import {Popup} from './components'

function Home() {

	const {
		setIsEdit,
		todos,
		GetTodos,
		completeTodo,
		deleteTodo,
		setPopupActive,
		popupActive,
		setEditTodoId,
		setNewTodo
	} = useHomeContext();

	useEffect(() => {
		GetTodos();// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const editTodoModal = (id, text) => {
		setIsEdit(true);
		setEditTodoId(id);
		setNewTodo(text)
		setPopupActive(true);
	}

	return (
		<div className="App">
			<h1>Welcome, Ben</h1>
			<h4>Your tasks</h4>

			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id}>
						<div className="checkbox" onClick={() => completeTodo(todo._id)}></div>

						<div className="text" onClick={() => completeTodo(todo._id)}>{todo.text}</div>

						<div><button className="edit-todo" onClick={() => editTodoModal(todo._id, todo.text)}>Edit</button></div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? <Popup/> : ''}
		</div>
	);
}

export default Home;
