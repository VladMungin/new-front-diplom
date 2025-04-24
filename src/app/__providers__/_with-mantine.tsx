'use client'

import { ReactNode } from 'react'

import { createTheme, MantineColorsTuple, MantineProvider } from '@mantine/core'

const myColor: MantineColorsTuple = [
  '#eceaff',
  '#d4d0ff',
  '#a59cfe',
  '#7366fc',
  '#4a38fb',
  '#301bfb',
  '#220dfc',
  '#1502e1',
  '#0d00ca',
  '#0000b2',
]

const theme = createTheme({ colors: { blue: myColor }, primaryColor: 'blue' })

export const WithMantine = ({ children }: { children: ReactNode }) => (
  <MantineProvider theme={theme} defaultColorScheme='dark'>
    {children}
  </MantineProvider>
)
