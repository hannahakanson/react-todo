import { useEffect, useState } from 'react'
import './App.css';

const App = () => {
	const [todos, setTodos] = useState([
		{ title: "Make coffee", completed: true },
		{ title: "Drink coffee", completed: false },
		{ title: "Drink more coffee", completed: false },
		{ title: "Drink ALL coffee", completed: false },
	])
	const [unfinishedTodos, setUnfinishedTodos] = useState([])
	const [finishedTodos, setFinishedTodos] = useState([])

	// input state
	const [newTodoTitle, setNewTodoTitle] = useState('')

	const toggleTodo = (todo) => {
		todo.completed = !todo.completed
		setTodos([...todos])
	}

	const deleteTodo = (clickedTodo) => {
		setTodos(todos.filter(todo => todo !== clickedTodo))
	}

	const handleFormSubmit = e => {
		e.preventDefault()

		// Push a new todo to the todos state
		const newTodo = { title: newTodoTitle, completed: false }
		setTodos([...todos, newTodo])

		// Clear newTodoTitle state
		setNewTodoTitle('')
	}

	useEffect(() => {
	}, [])


	useEffect(() => {
		// Derive unfinishedTodos and finishedTodos from todos state
		console.log("Filtering todos...")
		setUnfinishedTodos(todos.filter(todo => !todo.completed))
		setFinishedTodos(todos.filter(todo => todo.completed))
	}, [todos])


	useEffect(() => {
		console.log("Updating page title...")
		document.title = `${finishedTodos.length}/${todos.length} completed`
	}, [finishedTodos, todos])

	return (
		<div className="flex-container">
			<div className="App container">
				<h1 className="pt-4">Let's get sh*t done!</h1>
				<div className="mb-3">
					<form onSubmit={handleFormSubmit}>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="New task..."
								onChange={e => setNewTodoTitle(e.target.value)}
								value={newTodoTitle}
							/>
							<button
								type="submit"
								className="btn btn-primary btn-grad"
							>
								Create
							</button>
						</div>
					</form>
				</div>

				<hr/>

				<div className="p-1">
						
						<p className= {todos.length !== finishedTodos.length && todos.length != 0 ? 'status' : 'd-none'}><span className="bold">{finishedTodos.length}</span> av <span className="bold">{todos.length}</span> todos avklarade.</p>
						
						<h2 className= {todos.length == finishedTodos.length && todos.length != 0 ? 'all-done' : 'd-none'}>Yay!🎉 All tasks done!</h2>
				</div>

				{todos.length > 0 && (
					<>
						{unfinishedTodos.length > 0 && (
							<ul className="todolist list-group">
								{
									unfinishedTodos.map((todo, index) =>
										(
											<li className= {todo.completed ? 'done list-group-item' : 'list-group-item'} key={index}>
												<span
													className="todo-title"
													onClick={() => toggleTodo(todo)}
												>
													{todo.title}
												</span>

												<span
													className="todo-delete"
													onClick={() => deleteTodo(todo)}
												>🗑</span>
											</li>
										)
									)
								}
							</ul>
						)}

						<br/>
						<br/>

						{finishedTodos.length > 0 && (
							<>
								<hr/>
								<ul className="todolist list-group">
									{
										finishedTodos.map((todo, index) =>
											(
												<li className={todo.completed ? 'done list-group-item' : 'list-group-item'} key={index}>
													<span
														className="todo-title"
														onClick={() => toggleTodo(todo)}
													>
														{todo.title}
													</span>

													<span
														className="todo-delete"
														onClick={() => deleteTodo(todo)}
													>🗑</span>
												</li>
											)
										)
									}
								</ul>
							</>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default App;
