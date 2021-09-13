import React, { ReactElement, ReactNode } from 'react'

type FallbackRender = (props:{error:Error|null}) => ReactElement

export class ErrorBoundary extends React.Component<{children:ReactNode,fallbackRender:FallbackRender},{error: Error | null}>{
    state = {
        error: null
    }

    static getDerivedStateFromError(error:Error){
        return {error}
    }

    render(){
        const {error} = this.state
        const {children,fallbackRender} = this.props
        if(error){
            fallbackRender({error})
        }else{
            return children
        }
    }
}