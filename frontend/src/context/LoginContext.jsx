import { createContext, useState} from "react";


const LoginContext = createContext({});

export const LoginProvidor = ({children}) => 
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
        <LoginContext.Provider value={{   
            loginCheck,
            loggingIn,
            setLoggingIn
        }}>
        {children}
        </LoginContext.Provider>
    )
}

export default LoginContext