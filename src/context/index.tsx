import React, { ReactNode } from "react"
import {AuthProvider} from './auth-context'
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from 'react-redux'
import { store } from 'store'

export const AppProviders = ({children}: {children: ReactNode}) => {
    return <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
        </Provider>
    </QueryClientProvider>
}