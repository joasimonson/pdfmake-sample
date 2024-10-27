import { renderHook } from '../tests/test-utils'
import pdfMake from 'pdfmake/build/pdfmake'
import { usePdfGenerator } from './PdfGenerator'
import { Task } from './TaskList'
import { theme } from 'theme'

jest.mock('pdfmake/build/pdfmake', () => ({
  createPdf: jest.fn()
}))

const tasks: Task[] = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true },
]

describe('usePdfGenerator', () => {
  let mockDownload: jest.Mock
  let mockPdfMake: jest.Mock
  let docDefinition: any

  beforeEach(() => {
    jest.clearAllMocks()

    mockDownload = jest.fn()
    mockPdfMake = pdfMake.createPdf as jest.Mock
    mockPdfMake.mockReturnValue({ download: mockDownload })

    const { result } = renderHook(() => usePdfGenerator())
  
    result.current(tasks)

    docDefinition = mockPdfMake.mock.calls[0][0]
  })

  it('should call createPdf with correct argument type', () => {
    expect(pdfMake.createPdf).toHaveBeenCalledWith(expect.any(Object))
  })
  
  it('should generate a PDF with a title of "Task List"', () => {
    expect(docDefinition.content[0].text).toBe('Task List')
  })
  
  it('should have a table with three rows including header', () => {
    expect(docDefinition.content[1].table.body.length).toBe(3)
  })
  
  it('should apply correct color for header style', () => {
    expect(docDefinition.styles.header.color).toBe(theme.colors.hoverBlue)
  })
  
  it('should apply correct fill color for table header', () => {
    expect(docDefinition.styles.tableHeader.fillColor).toBe(theme.colors.primary)
  })
  
  it('should apply correct color for pending tasks', () => {
    expect(docDefinition.styles.pendingTask.color).toBe(theme.colors.dark)
  })
  
  it('should apply correct color for completed tasks', () => {
    expect(docDefinition.styles.completedTask.color).toBe(theme.colors.gray)
  })
  
  it('should call download with the correct file name', () => {
    expect(mockDownload).toHaveBeenCalledWith('task-list.pdf')
  })
})
