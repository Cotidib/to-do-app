import React from 'react';
import InlineEditable from './InlineEditableComponent/InlineEditable';
import { CgClose, CgCheck } from 'react-icons/cg';

function List(props) {
    return (
        <div className='list-box'>
           {
               props.tasks.map((task)=>{
                return <article key={task.id} className={`task-box ${task.checked? 'task-done':'task-new'}`}>
                    <div className='task-container'>
                        {task.checked? <CgCheck onClick={()=>props.toggleCheck(task.id)} className='circle-checked'/>: <span className='circle' onClick={()=>props.toggleCheck(task.id)}/>}
                        <InlineEditable content={task.text} className='prueba' checked={task.checked}/>
                    </div> 
                    <CgClose className='delete-icon' onClick={()=>props.deleteTask(task.id)}/>
                </article>

               })
           }
           {
               props.tasks.length > 0 && <div className='menu-container'>
               <p className='counter'>{props.uncompleted} items left</p>
               <div>
                   <button onClick={()=>props.filterAll()} className='filter-btn'>All</button>
                   <button onClick={()=>props.filterActive()}className='filter-btn'>Active</button>
                   <button onClick={()=>props.filterComplete()} className='filter-btn'>Completed</button>
               </div>
               <button onClick={()=>props.clearCompleted()} className='filter-btn'>Clear Completed</button>
           </div> 
           }
        </div>
    )
}

export default List
