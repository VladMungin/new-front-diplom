import { Provider as JotaiProvider } from 'jotai'
import { ReactNode } from 'react'

export const WithJotai = ({ children }: { children: ReactNode }) => <JotaiProvider>{children}</JotaiProvider>
