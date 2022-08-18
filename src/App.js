import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function App() {

  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")
  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")

  React.useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  React.useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      Text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")
  }


  function deleteTodo(id) {
    console.log(id)
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }
  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id == id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id == id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText("")
  }

  console.log(todo)
  console.log(todos)
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>LISTA</h1>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit" className="lis" >Lista</button>
      </form>
      {todos.map((todo) => <div key={todo.id}>

        {todoEditing == todo.id ? (<input
          type="text"
          onchange={(e) => setEditingText(e.target.value)}
          value={editingText}
        />)
          :
          (<div>{todo.Text}</div>)}



        <button onClick={() => deleteTodo(todo.id)} className="bor">borrar</button>





      </div>)}
    </div>
  );
}


export default App;