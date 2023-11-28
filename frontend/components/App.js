import React from 'react'
import Form from './Form'
import TodoList from './TodoList'
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
    displayCompleteds: true,
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

  toggleDisplayCompleteds = () => {
    this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds })
  }

  render() {
    return (
      
      <div>
        <div id="error">Error: {this.state.error}</div>
        <TodoList
          todos={this.state.todos}
          displayCompleteds={this.state.displayCompleteds}
          toggleCompleted={this.toggleCompleted}
        />
        <Form 
          onTodoFormSubmit = {this.onTodoFormSubmit}
          todoNameInput = {this.state.todoNameInput}
          onTodoNameInputChange = {this.onTodoNameInputChange}
          toggleDisplayCompleteds = {this.toggleDisplayCompleteds}
          displayCompleteds = {this.state.displayCompleteds}
        />
      </div>
    )
  }
}

