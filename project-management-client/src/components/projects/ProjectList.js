import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddProject from "./AddProject"; // <== !!!

class ProjectList extends Component {
  constructor() {
    super();
    this.state = { listOfProjects: [] };
  }

  getAllProjects = () => {
    axios.get(`http://localhost:4000/api/projects`).then(responseFromApi => {
      this.setState({
        listOfProjects: responseFromApi.data
      });
    });
  };

  componentDidMount() {
    this.getAllProjects();
  }

  render(){
    return(
      <div>
        <div>
          { this.state.listOfProjects.map( project => {
            return (
              <div key={project._id}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                </Link>
                <ul>
                  { project.tasks.map((task, index) => {
                    return <li key={index}>{task.title}</li>
                  }) } 
                </ul>
                <p style={{maxWidth: '400px'}} >{project.description} </p> 
              </div>
            )})
          }
        </div>
        <div>
            <AddProject getData={() => this.getAllProjects()}/> 
        </div>
      </div>
    )
  }
}

export default ProjectList;