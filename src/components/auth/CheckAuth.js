import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CheckAuth = (Components)=>{

    function wrapper(props){
        let user = useSelector((store)=>store.auth.user)
        const navigate = useNavigate()

        useEffect(()=>{
            if(!user){
                navigate('/login')
            }
        },[user])

        return <Components {...props}/>

    }
    return wrapper
}

export default CheckAuth;