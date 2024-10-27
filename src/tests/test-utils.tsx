import React, { ReactNode } from 'react'
import { render, renderHook, RenderHookOptions, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>,
    options
  )
}

const customRenderHook = <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>
) => {
  return renderHook(callback, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
    ...options,
  })
}

export * from '@testing-library/react'

export { customRender as render, customRenderHook as renderHook }
