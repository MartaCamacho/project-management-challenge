import React, { Component } from 'react';
import axios from 'axios';
import EditTask from './EditTask';


class TaskDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getTheSingleTask();
  }

  getTheSingleTask = () => {
    const { params } = this.props.match;

    axios.get(`http://localhost:4000/api/tasks/${params.taskId}`)

    .then( responseFromApi =>{
      const theTask = responseFromApi.data;
      this.setState(theTask);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  renderEditForm = () => {
    if(!this.state.title){
      this.getTheSingleTask();
    } else {
    //{...props} => so we can have 'this.props.history' in Edit.js
      return <EditTask theTask={this.state} getTheTask={this.getTheSingleTask} {...this.props} />
    }
}

deleteTask = () => {
const { params } = this.props.match;
axios.delete(`http://localhost:4000/api/tasks/${params.taskId}`)
.then( () =>{
    this.props.history.push('/tasks'); 

})
.catch((err)=>{
    console.log(err)
})
}


  render(){
    return(
      <div>
        <h3>TASK DETAILS</h3>
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteTask()}>Delete task</button> 

        {/* To go back we can use react-router-dom method `history.goBack()` available on `props` object */}
        <button onClick={this.props.history.goBack}>Go Back</button>
      </div>
    )
  }
}

export default TaskDetails;