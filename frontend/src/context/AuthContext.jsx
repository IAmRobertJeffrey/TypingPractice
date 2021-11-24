import { createContext, useState} from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4024";
const socket = socketIOClient(ENDPOINT, {
    auth: {
        token: localStorage.getItem("token")
    }
});


const AuthContext = createContext({});

export const AuthProvidor = ({children}) => 
{
   
    const [loggingIn, setLoggingIn] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

   

    async function login()
    {
        try{     
        
            const clientData = {
                username: username, 
                password:password
            }
            socket.emit("login", clientData);
            socket.on("loginResponse", (data) => {
                console.log(data);
                localStorage.setItem("token",JSON.stringify(data))
               })
       
        }catch(err)
        {
            console.log(err);
        }
    }

    async function register()
    {
        if(username.length > 1 && password.length > 1 && verifyPassword.length > 1)
        {
            if(password === verifyPassword)
            {
                try
                {   
                const bodyObj = {
                    username: username, 
                    password:password, 
                    passwordVerify:verifyPassword

                }
                
    
               socket.emit("register", bodyObj)
               socket.on("registerResponse", (data) => {
                console.log(data);
                localStorage.setItem("token",JSON.stringify(data))
               })
            
                }catch(err)
                {
                    console.log(JSON.stringify(err));
                }
            }
            else
            {
                console.log("not matching passwords");
            }
        }
        else
        {
            console.log("fill all fields");
        }
    }

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
            setLoggingIn,
            username,
            password,
            verifyPassword,
            setUsername,
            setPassword,
            setVerifyPassword,
            registering,
            setRegistering,
            register,
            login
            
        }}>
        {children}
        </AuthContext.Provider>
    )
}

export default AuthContext