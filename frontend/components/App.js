import React from 'react'
import Form from './Form'
import TodoList from './TodoList'
import axios from 'axios'

let id = 0
let getId = () => ++id

const initialTodos = [
  {id: getId(), name: "Take out the trash", completed: false},
  {id: getId(), name: "Study next module", completed: false},
  {id: getId(), name: "Laundry", completed: true}
]
const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  state = {
    todos: initialTodos
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({...this.state, todos: res.data.data})
      })
      .catch(err => {
        debugger
      })

  }
  componentDidMount() {
    this.fetchAllTodos()
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
        <TodoList todos={this.state.todos} toggleCompletion = {this.toggleCompletion}/>
        <Form/>
        <input type="submit"></input>
        <button>Clear Completed</button>
      </div>
    )
  }
}
