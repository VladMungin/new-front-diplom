import type { ComponentType, ReactNode } from 'react'

export type ProviderComponent = ComponentType<{ children: ReactNode }>

export const composeProviders = (...providers: ProviderComponent[]): ProviderComponent =>
  providers.reduce(
    (AccumulatedProviders, CurrentProvider) =>
      ({ children }: { children: ReactNode }) => (
        <AccumulatedProviders>
          <CurrentProvider>{children}</CurrentProvider>
        </AccumulatedProviders>
      ),
    ({ children }: { children: ReactNode }) => children
  )
