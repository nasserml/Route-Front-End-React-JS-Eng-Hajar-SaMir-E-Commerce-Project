import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";


export let auth = createContext(null)

export default function AuthContextProvider({children}) {

    let [isLogin, setLogin] = useState(null);

    // handle refresh

    useEffect(()=>{
        if(localStorage.getItem('userToken'))
            setLogin(jwtDecode(localStorage.getItem('userToken')))

    },[]);

    return <auth.Provider value={{isLogin, setLogin}}>
        {children}

    </auth.Provider>

}