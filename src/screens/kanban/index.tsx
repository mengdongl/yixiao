import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sleectUser, setUser } from 'store/auth.slice'
import { useAuth } from 'context/auth-context'

export const KanbanScreen = () => {
    const {user:contextUser} = useAuth()
    const user = useSelector(sleectUser)
    const dispatch = useDispatch()
    const getUser = () => {
        console.log(contextUser)
        dispatch(setUser({user:contextUser}))
    }

    return <div>
        <span>看板</span>
        <button onClick={getUser}>获取user</button>
<span>展示username: {user?.name}</span>
<span>展示usertoken: {user?.token}</span>
    </div>
}