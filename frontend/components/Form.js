import React from 'react'
import axios from 'axios'

export default class Form extends React.Component {

  state = {
    todoNameInput: '',
  }

  onTodoNameInputChange = evt => {
    const{ value } = evt.target
    this.setState({...this.state, todoNameInput: value })
  }
  
  // postNewTodo = () => {
  //   axios.post(URL, { name: this.state.todoNameInput})
  //     .then(res => {
  //       debugger
  //     })
  //     .catch(err => {
  //       debugger
  //     })
  // }

  onTodoFormSubmit= evt => {
    evt.preventDefault()
    this.postNewTodo
  }

  render() {
    return(
    <input value={this.state.todoNameInput} onChange = {this.onTodoNameInputChange} type='text' placeholder="Type Todo"></input> 
    // <input value={} type="submit"/>
    // <input type="submit"><
    )
  }
}
