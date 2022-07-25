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
          <div className='container'>
               <h2 className="text-center">Tasker</h2>
                <form>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Task's Name" aria-label="Recipient's username" aria-describedby="button-addon2" value={this.state.newTask}  onChange={this.changeHandler}/>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.addTask}>Add Task</button>
                  </div>
              </form>
               <br></br>
               <div>
                <div className="list-group">
                    {
                    this.state.tasks.map(
                        task => 
                        <div className='card'>
                            <div className='card-body'>
                              <div className='row'> 
                                <div className='col-11'>
                                  <h5 className="card-title">    { task.name}</h5>
                                  <h6 className='card-subtitle text-muted'>{new Date(task.updatedAt).toISOString().split('T')[0]}</h6>
                                </div>
                                <div className='col-1'>
                                    <input type="checkbox" defaultChecked={task.completed} onClick={ () => this.editTask(task)} />
                                  </div>
                              </div>
                            </div>
                          </div>
                    )
                }
                </div>
              </div>
          </div>
      )
  }
}
export default App;
