import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Signout = ({ setIsloggedIn }) => {
    // get the navigate function reference
    setIsloggedIn(false);
    const navigate = useNavigate()
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('role')
    console.log(sessionStorage.id)
    useEffect(() => {
        toast.success("Logged out successfully")
        navigate('/')
    }, [])

}
export default Signout
