import { db } from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'


import { useState, useEffect } from 'react'

export const useAuthentication = () => {

    const [error, setError] = useState("")

    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak

    const [cancelled, setCancelled] = useState(false)
    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }
    //register
    const createUser = async (data) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(null);
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)
            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes("password")) {
                systemErrorMessage = "A Senha precisa ter no minimo 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)

        }

    }
    //logout
    const logout = () => {


        checkIfIsCancelled()
        signOut(auth)
    }

    //login
    const login = async (data) => {
        checkIfIsCancelled()
        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)

            setLoading(false)
        } catch (error) {
            console.log("Erro capturado:", error);
            let systemErrorMessage;

            switch (error.code) {
                case "auth/user-not-found":
                    systemErrorMessage = "Usuário não encontrado.";
                    break;
                case "auth/wrong-password":
                    systemErrorMessage = "Senha incorreta.";
                    break;
                case "auth/invalid-credential":
                    systemErrorMessage = "E-mail ou senha incorretos.";
                    break;
                default:
                    systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde.";
            }
            setError(systemErrorMessage)
            setLoading(false)
        }
    }


    useEffect(() => {
        return () => setCancelled(true)
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}
