import { createContext, useState} from "react";


const AuthContext = createContext({});

export const AuthProvidor = ({children}) => 
{
   
    const [loggingIn, setLoggingIn] = useState(false);
    const [username, setUsername] = useState(false);
    const [password, setPassword] = useState(false);

    function loginCheck()
    {
        
        if (loggingIn) {
            setLoggingIn(false);
          } else {
            setUsername("");
            setPassword("");
            setLoggingIn(true);
          }
    }


    return(
        <AuthContext.Provider value={{   
            loginCheck,
            loggingIn,
            setLoggingIn
        }}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthContext