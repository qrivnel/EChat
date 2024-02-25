import React, { useState, useEffect } from 'react'
import AuthStacks from './AuthStacks'
import UserStacks from './UserStacks'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootNavigator() {
    const [isAuth, setIsAuth] = useState(false)


    useEffect(() => {
        AsyncStorage.getItem('currentuser')
            .then(res => {
                if (res != null)
                    setIsAuth(true)
                else
                    setIsAuth(false)
            })
    })


    return !isAuth
        ? <AuthStacks setIsAuth={setIsAuth} />
        : <UserStacks setIsAuth={setIsAuth} />
}