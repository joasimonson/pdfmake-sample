import { render, screen, fireEvent } from '../tests/test-utils'
import TaskList from './TaskList'

describe('TaskList Component', () => {
  beforeEach(() => {
    render(<TaskList />)
  })

  test('renders initial tasks', () => {
    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
    expect(screen.getByText('Task 4')).toBeInTheDocument()
  })

  test('renders completed tasks with correct styles', () => {
    const completedTask1 = screen.getByText('Task 3')
    const completedTask2 = screen.getByText('Task 4')
    
    expect(completedTask1).toHaveStyle('text-decoration: line-through')
    expect(completedTask2).toHaveStyle('text-decoration: line-through')
  })

  test('adds a new task', () => {
    const newTaskTitle = 'New Task 5'

    const input = screen.getByPlaceholderText('New task')
    fireEvent.change(input, { target: { value: newTaskTitle } })

    fireEvent.click(screen.getByText('Add Task'))

    expect(screen.getByText(newTaskTitle)).toBeInTheDocument()
  })

  test('does not add an empty task', () => {
    const initialTaskCount = screen.getAllByRole('listitem').length

    fireEvent.click(screen.getByText('Add Task'))

    expect(screen.getAllByRole('listitem')).toHaveLength(initialTaskCount)
  })
})
