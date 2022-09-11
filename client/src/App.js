import './App.css';
import { useState } from "react";
import Axios from "axios";
import Tasks_Index from './components/tasks/Index';

function App(){
  //Initial variable
  const [taskList, setTaskList] = useState([]);

  //Get all tasks
  const getAllTask = () => {
    Axios.get("http://localhost:9000/getAllTask").then((response) => {
      setTaskList(response.data);
    });
  };

  getAllTask();

  return (    
    <div className='container d-block mx-auto p-1 mt-1'>
      <Tasks_Index dataTask={taskList}/>
    </div>
  );
}

export default App;
