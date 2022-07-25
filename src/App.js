import './App.css';
import React, { Component } from 'react'
import TaskService from './TaskService'

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
              tasks: [],
              newTask: ''
      }
      this.addTask = this.addTask.bind(this);
      this.editTask = this.editTask.bind(this);
      this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(id){
    TaskService.deleteTask(id).then( res => {
          this.setState({tasks: this.state.tasks.filter(task => task.id !== id)});
      });
  }
  
  editTask(task){
    task.completed = task.completed === true ? false: true
      TaskService.updateTask(task, task.id).then(res => {
        return TaskService.getTasks()
      }).then(res => {
          this.setState({ tasks: res.data});
      })
  }

  componentDidMount(){
    TaskService.getTasks().then((res) => {
          this.setState({ tasks: res.data});
      });
  }

  addTask(e){
    e.preventDefault();
      const newTask = {name: this.state.newTask}
      TaskService.createTask(newTask).then(res => {
        this.setState({ newTask: ''});
        return TaskService.getTasks()
      }).then(res => {
          this.setState({ tasks: res.data});
      })
  }

  changeHandler = e => {
    this.setState({
      newTask : e.target.value
    });
  }

  render() {
      return (
          <div>
               <h2 className="text-center">Tasks List</h2>
               <div className = "row">
                <form>
                  <input type="text" name="Id"  value={this.state.newTask}  onChange={this.changeHandler} ></input>
                  <button className="btn btn-primary" onClick={this.addTask}>Add Task</button>
                </form>
               </div>
               <br></br>
               <div className = "row">
                      <table className = "table table-striped table-bordered">
                          <thead>
                              <tr>
                                  <th> Task Name</th>
                                  <th> Task Updated At</th>
                                  <th> Actions</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                  this.state.tasks.map(
                                      task => 
                                      <tr key = {task.id}>
                                           <td> { task.name} </td>   
                              
                                           <td> {task.updatedAt}</td>
                                           <td>
                                               <button onClick={ () => this.editTask(task)} className="btn btn-info">{task.completed === true? "Mark as Completed":"Mark as Incomplete"} </button>
                                               <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTask(task.id)} className="btn btn-danger">Delete </button>
                                           </td>
                                      </tr>
                                  )
                              }
                          </tbody>
                      </table>
               </div>
          </div>
      )
  }
}
export default App;
