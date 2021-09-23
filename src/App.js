import React , {useState, useEffect} from 'react';
import List from './List';
import { FiSun, FiMoon } from 'react-icons/fi';
import {ThemeProvider} from 'styled-components';
import {GlobalStyles, lightTheme, darkTheme} from './globalStyles';

const getLocalStorate = () => {
  let list = localStorage.getItem('list');
  if(list) //exists
  {
    return JSON.parse(localStorage.getItem('list'));
  }
  else {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState(getLocalStorate());
  const [inputValue, setInputValue] = useState("");
  const [uncompletedTasks, setUncompletedTasks] = useState(0);
  const [tasksDisplayed, setTasksDisplayed] = useState(getLocalStorate());
  const [theme, setTheme] = useState('dark');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    setIsDarkMode(!isDarkMode);
  }

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

  //local storage:
  useEffect( () => {
    localStorage.setItem('list', JSON.stringify(tasks))
  }, [tasks]);
  
  return (
    <ThemeProvider theme={theme === 'light'?lightTheme:darkTheme}>
    <GlobalStyles/>
    <img src={isDarkMode? './images/bg-desktop-dark.jpg' : './images/bg-desktop-light.jpg' } alt='b'/>
    <main>
      <section className='header-container'>
        <h1>T O D O</h1>
        {isDarkMode? <FiSun className='toggle-icon' onClick={toggleTheme}/> : <FiMoon className='toggle-icon' onClick={toggleTheme}/>}
      </section>
      <form onSubmit={handleSubmit}>
        <input className='task-input' type='text' value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder='type and enter' maxLength='28'/>
        <button className='btn-submit' type='submit'/>
      </form>
      <List 
      deleteTask={deleteTask} 
      toggleCheck={toggleCheck} 
      tasks={tasks} 
      tasksDisplayed={tasksDisplayed}
      setTasks={setTasks} 
      setTasksDisplayed={setTasksDisplayed} 
      />
      
      <div className='menu-container'>
        <p className='counter'>{uncompletedTasks} items left</p>
        <div>
          <button onClick={()=>filterAll()} className='filter-btn'>All</button>
          <button onClick={()=>filterActive()}className='filter-btn'>Active</button>
          <button onClick={()=>filterComplete()} className='filter-btn'>Completed</button>
        </div>
        <button onClick={()=>clearCompleted()} className='filter-btn'>Clear Completed</button>
      </div> 
           
      <p className='foot'>drag and drop</p>
    </main>
    </ThemeProvider>
  );
}

export default App;
