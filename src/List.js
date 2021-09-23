import React from 'react';
import InlineEditable from './InlineEditableComponent/InlineEditable';
import { CgClose, CgCheck } from 'react-icons/cg';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

function List(props) {

    const handleEdit = (id,txt) => {
        let newlist = props.tasks.map((task)=>{
            if(task.id === id){
                return {...task,text:txt}
            }
            else{
                return {...task};
            } 
        })
    
        props.setTasks(newlist);
        props.setTasksDisplayed(newlist);
    }

    const handleOnDragEnd = (result) => {
        if(!result.destination)
        {
            return;
        }
        if(result.source.index === result.destination.index && result.source.droppableId === result.destination.droppableId)
        {
            return;
        }
        
        const items = props.tasksDisplayed;
        const [reorderedItems] = items.splice(result.source.index,1);
        items.splice(result.destination.index,0,reorderedItems);
        props.setTasks(items);
        props.setTasksDisplayed(items);
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks-droppable">
        { (provided) => (

                <div className='list-box' {...provided.droppableProps} ref={provided.innerRef}>
                {
                    props.tasksDisplayed.map((task, index)=>{
                        return <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                            
                            <article {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} key={task.id} className={`task-box ${task.checked? 'task-done':'task-new'}`}>
                                <div className='task-container'>
                                    {task.checked? <CgCheck onClick={()=>props.toggleCheck(task.id)} className='circle-checked'/>: <span className='circle' onClick={()=>props.toggleCheck(task.id)}/>}
                                    <InlineEditable id={task.id} content={task.text} checked={task.checked} handleEdit={handleEdit}/>
                                </div> 
                                <CgClose className='delete-icon' onClick={()=>props.deleteTask(task.id)}/>
                            </article>

                        )}
                        </Draggable>

                    })
                }
                {provided.placeholder}
                </div>
            )
        }
        </Droppable>
        </DragDropContext>
    )
}

export default List
