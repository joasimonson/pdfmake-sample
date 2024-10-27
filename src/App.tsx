import { ThemeProvider } from 'styled-components'
import { FlexContainer } from './App.styles'
import TaskList from '@components/TaskList'
import { theme } from './theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <FlexContainer>
        <TaskList />
      </FlexContainer>
    </ThemeProvider>
  )
}

export default App