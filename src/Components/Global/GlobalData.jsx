import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Children, createContext, useEffect, useState } from "react";
import { Firebase } from "./Firebase";

export const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ Children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth(Firebase);
        const check = onAuthStateChanged(auth, (res) => {
            if (res) setUser(res)
            else setUser(null)
        })
        return () => check();
    }, [user])


    return <>

        <GlobalDataContext.Provider value={{ user, setUser }}>
            {Children}
        </GlobalDataContext.Provider>
    </>
}