import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext';
import io from 'socket.io-client'

const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setsocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [authUser, setauthUser] = useAuthContext();

    useEffect(() => {
        if (authUser) {
            // for development : - http://localhost:8000
            // for production :- https://ai-pow-real-time-chatapp.onrender.com
            const socket = io("https://ai-pow-real-time-chatapp.onrender.com", {
                query: {
                    userID: authUser.id,
                }
            });

            setsocket(socket);

            //socket.on is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setsocket(null);
            }
        }
    }, [authUser])
    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
}