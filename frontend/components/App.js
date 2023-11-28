import React from 'react'
// import Form from './Form'
// import TodoList from './TodoList'
import axios from 'axios'

// let id = 0
// let getId = () => ++id

// const initialTodos = [
//   {id: getId(), name: "Take out the trash", completed: false},
//   {id: getId(), name: "Study next module", completed: false},
//   {id: getId(), name: "Laundry", completed: true}
//]
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: [],
    error: '',
    todoNameInput: '',
  }

  onTodoNameInputChange = evt => {
    const{ value } = evt.target
    this.setState({...this.state, todoNameInput: value })
  }

  onTodoFormSubmit= evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  resetForm = () => this.setState({ ...this.state, todoNameInput: ''})

  setAxiosResponseError = err => this.setState({...this.state, error: err.response.data.message})

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({...this.state, todos: res.data.data})
      })
      .catch(this.setAxiosResponseError)
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput})
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
        // this.fetchAllTodos()
        this.resetForm()
      })
      .catch(this.setAxiosResponseError)
  }
  componentDidMount() {
    this.fetchAllTodos()
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({...this.state, todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(this.setAxiosResponseError)
  }
  
  toggleCompletion = id => {
    this.setState({
      ...this.state,
      todos: this.state.todos.map(td => {
        if (id === td.id) return { ...td, completed: !td.completed}
        return td
      })
    })
  }

  render() {
    return (
      
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name} {td.completed ? ' ✓' : ''}</div>
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input value={this.state.todoNameInput} onChange = {this.onTodoNameInputChange} type="text" placeholder='Type todo'></input>
          <input type="submit"></input>
          <button>Clear Completed</button>

        </form>
      </div>
    )
  }
}
