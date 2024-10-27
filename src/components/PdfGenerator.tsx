import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { useTheme } from 'styled-components'
import { Task } from './TaskList'

pdfMake.vfs = pdfFonts.pdfMake.vfs

export const usePdfGenerator = () => {
  const theme = useTheme()

  const generate = (tasks: Task[]) => {
    const taskList = tasks.map((task) => [
      { text: task.title, style: task.completed ? 'completed' : 'pending' },
    ])

    const docDefinition: TDocumentDefinitions = {
      content: [
        { text: 'Task List', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*'],
            body: [
              [
                { text: 'Task', style: 'tableHeader' }
              ],
              ...taskList,
            ],
          },
          layout: {
            fillColor: (rowIndex: number) =>
              rowIndex === 0 ? theme.colors.primary : rowIndex % 2 === 0 ? theme.colors.lightGray : 'white',
          }
        },
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          color: theme.colors.hoverBlue,
          margin: [0, 0, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 16,
          color: 'white',
          fillColor: theme.colors.primary,
          alignment: 'center',
          margin: [0, 5, 0, 5]
        },
        pendingTask: {
          color: theme.colors.dark,
          fontSize: 14,
          margin: [0, 5, 0, 5]
        },
        completedTask: {
          color: theme.colors.gray,
          fontSize: 14,
          decoration: 'lineThrough',
          margin: [0, 5, 0, 5]
        }
      }
    }

    pdfMake.createPdf(docDefinition).download('task-list.pdf')
  }

  return generate
}