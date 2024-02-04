import React, { useState, useEffect } from 'react'
import AuthStacks from './AuthStacks'
import UserStacks from './UserStacks'

export default function RootNavigator() {
    const [isAuth, setIsAuth] = useState(false)

    
    return !isAuth
                ? <AuthStacks setIsAuth={setIsAuth} />
                : <UserStacks setIsAuth={setIsAuth} />
}