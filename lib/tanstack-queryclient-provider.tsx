import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'

const queryClient = new QueryClient()

interface Props {
  children: React.ReactNode
};

export default function TanstackQueryClientProvider({ children }: Props) {
  return <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
}
