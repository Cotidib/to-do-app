import React , {useState, useEffect} from 'react';
import List from './List';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [uncompletedTasks, setUncompletedTasks] = useState(0);
  const [tasksDisplayed, setTasksDisplayed] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newTask = {id: new Date().getTime().toString(), checked:false, text:inputValue};
    setTasks([newTask,...tasks]);
    setTasksDisplayed([newTask,...tasks]);
    setInputValue("");
  }

  const deleteTask = (id) => {
    let newList = tasks.filter((tsk)=>tsk.id !== id);
    setTasks(newList);
    setTasksDisplayed(newList);
  }

  const toggleCheck = (id) => {
    let newList = tasks.map((tsk)=>{
      if(tsk.id===id){
        return {...tsk,checked:!tsk.checked}
      }
      return tsk;
    })

    setTasks(newList);
    setTasksDisplayed(newList);
  }

  useEffect(()=>{
    let uncompleted = tasks.filter((task)=>
      !task.checked
    )
    setUncompletedTasks(uncompleted.length);
  },[tasks])

  const filterActive = () =>{
    let newList = tasks.filter((task)=>!task.checked);
    setTasksDisplayed(newList);
  }

  const filterAll = () =>{
    setTasksDisplayed(tasks);
  }

  const filterComplete = () =>{
    let newList = tasks.filter((task)=>task.checked);
    setTasksDisplayed(newList);
  }

  const clearCompleted = () => {
    let newList = tasks.filter((task)=>!task.checked);
    setTasks(newList);
    setTasksDisplayed(newList);
  }
  
  return (
    <main>
      <section className='header-container'>
        <h1>T O D O</h1>
        <div>icon toggle</div>
      </section>
      <form onSubmit={handleSubmit}>
        <input className='task-input' type='text' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder='type and enter' maxLength='28'/>
        <button className='btn-submit' type='submit'/>
      </form>
      <List uncompleted={uncompletedTasks} deleteTask={deleteTask} toggleCheck={toggleCheck} tasks={tasksDisplayed} filterActive={filterActive} filterAll={filterAll} filterComplete={filterComplete} clearCompleted={clearCompleted}/>
      <p>drag and drop text</p>
    </main>
  );
}

export default App;
