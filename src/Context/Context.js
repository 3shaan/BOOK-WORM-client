import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../FireBase/FireBase.config';
export const authContext = createContext();
export {} from 'firebase/auth'

const auth = getAuth(app);

const Context = ({ children }) => {
    
    
    const [user, setUser] = useState(null);


    // check user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
        })
        return () => unsubscribe();
    },[])

    //create user
    const emailSignIn = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }



    const contextValue = { emailSignIn };
    return (
        <authContext.Provider value={contextValue}>
            {children}
        </authContext.Provider>
    );
};

export default Context;