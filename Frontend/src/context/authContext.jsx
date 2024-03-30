import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider ({ children }){

    const [ user , setUser ] = useState(false);
    const [ doctor , setDoctor] = useState(false);
    const [ admin , setAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    return(
        <AuthContext.Provider value = {{ user,setUser,doctor,setDoctor,admin,setAdmin,isLoading,setIsLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;