import { useState } from 'react'
import { FlexContainer } from './TaskList.styles'
import { Button, InputText, List, ListItem } from '../App.styles'
import { usePdfGenerator } from './PdfGenerator'

export interface Task {
  id: number
  title: string
  completed: boolean
}

export default function TaskList() {  
  const generatePdf = usePdfGenerator();

  const initialTasks: Task[] = [
    { id: 1, title: 'Task 1', completed: false },
    { id: 2, title: 'Task 2', completed: false },
    { id: 3, title: 'Task 3', completed: true },
    { id: 4, title: 'Task 4', completed: true },
  ]

  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (!newTask.trim()) return

    const newTaskObj: Task = {
      id: Math.random(),
      title: newTask,
      completed: false,
    }

    setTasks([...tasks, newTaskObj])
    setNewTask('')
  }

  return (
    <FlexContainer>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} disabled={task.completed}>
            {task.title}
          </ListItem>
        ))}
      </List>
      <InputText
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <Button onClick={() => generatePdf(tasks)}>Print Task List</Button>
    </FlexContainer>
  )
}