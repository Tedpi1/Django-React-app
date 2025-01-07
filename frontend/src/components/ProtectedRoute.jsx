import {Navigate} from 'react-router-dom'
import {jwtdecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useState, useEffect } from 'react'

userEffect(() => {
    auth().catch( ()=>setIsAuthorized(false))
})


const ProtectedRoute = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState(null)

    const refreshToken= async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{

            const response = await api.post('/api/token/refresh', {refresh: refreshToken})
            if(res.status===200){
                const {access} = response.data
                localStorage.setItem(ACCESS_TOKEN, access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }

        }
        catch(error){
            console.log(error)
            setIsAuthorized(false)
        }

    }
    

    const auth = async () => {
        //check if we have token
        const accessToken = localStorage.getItem(ACCESS_TOKEN)
        if(!accessToken){
            setIsAuthorized(false)
            return
        }

        //check if token is expired
        const decodedToken = jwtdecode(accessToken)
        const currentTime = Date.now() / 1000
        if(decodedToken.exp < currentTime){
            await refreshToken()
        }else{
            setIsAuthorized(true)
        }
        
        
    }

    if(isAuthorized=null){
        return <div> Loading...</div>
    }

    return isAuthorized ? children:<Navigate to='/login'/>
}


export default ProtectedRoute