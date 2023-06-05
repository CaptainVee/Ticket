import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [chekingStatus, setChekingStatus] = useState(true)

    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if(user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setChekingStatus(false)
    }, [user])

    return {loggedIn, chekingStatus}
}

export default useAuthStatus