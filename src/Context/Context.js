import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../FireBase/FireBase.config';
export const authContext = createContext();
export {} from 'firebase/auth'

const auth = getAuth(app);

const Context = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    
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

    //login user
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // google log in 
    const googleLogIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    //logout user 
    const logOut = () => {
        return (
            signOut(auth)
                .then(() => { 
                    localStorage.removeItem('token')
                })
                .catch(err => console.log(err))
        )
    }


    const contextValue = { emailSignIn, login, googleLogIn, logOut, user };
    return (
        <authContext.Provider value={contextValue}>
            {children}
        </authContext.Provider>
    );
};

export default Context;