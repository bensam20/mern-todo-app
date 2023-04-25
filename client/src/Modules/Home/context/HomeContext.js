import { createContext, useContext, useMemo, useState } from 'react';

const HomeContext = createContext(() => {});
export const useHomeContext = () => useContext(HomeContext);

const HomeDataHandler = (props) => {

    const api_base = 'http://localhost:3001';

	const [isEdit, setIsEdit] = useState(false);
	const [popupActive, setPopupActive] = useState(false);
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [noTextWarning, setNoTextWarning] = useState(false);
	const [editTodoId, setEditTodoId] = useState("");


	const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}

    const completeTodo = async id => {
		const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}

			return todo;
		}));
		
	}

	const addTodo = async (newTodo) => {
		if (newTodo){
			const data = await fetch(api_base + "/todo/new", {
				method: "POST",
				headers: {
					"Content-Type": "application/json" 
				},
				body: JSON.stringify({
					text: newTodo
				})
			}).then(res => res.json());
	
			setTodos([...todos, data]);
			setPopupActive(false);
			setNoTextWarning(false);
			setNewTodo("");	
		} else {
			setNoTextWarning(true);
		}
	}

    const editTodo = async (newTodo, editTodoId) => {
		// setNoTextWarning(false);
		if(newTodo){
			const data = await fetch(api_base + "/todo/update/" + editTodoId, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json" 
				},
				body: JSON.stringify({
					text: newTodo
				})
			}).then(res => res.json());
	
			setTodos(todos => todos.map(todo => {
				if (todo._id === data._id) {
					todo.text = data.text;
				}
	
				return todo;
			}))
	
			setIsEdit(false);
			setPopupActive(false);
			setNoTextWarning(false);
			setNewTodo("");	
		} else {
			setNoTextWarning(true);
		}

	}

    const deleteTodo = async (id) => {
		const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setTodos(todos => todos.filter(todo => todo._id !== data._id));
	}


    const contextPayload = useMemo(
        () => ({
            isEdit,
            setIsEdit,
            GetTodos,
            todos,
            setTodos,
            completeTodo,
            addTodo,
            editTodo,
            deleteTodo,
			setPopupActive,
			popupActive,
			noTextWarning,
			setNoTextWarning,
			newTodo,
			setNewTodo,
			editTodoId, 
			setEditTodoId
        }),// eslint-disable-next-line react-hooks/exhaustive-deps
        [   isEdit,
            todos,
			popupActive,
			newTodo,
			noTextWarning,
			editTodoId
        ]
      );
    return <HomeContext.Provider value={contextPayload} {...props} />;
};

export default HomeDataHandler;