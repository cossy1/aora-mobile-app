import { getCurrentUser } from "@/lib/appwrite";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface GlobalContextProps {
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>;
    user: any,
    setUser: any,
    isLoggedIn: boolean,
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);

    if (context === null) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }

    return context;
};

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchCurrentUser = () => {
        getCurrentUser().then(res => {
            if (res) {
                setIsLoggedIn(true);
                setUser(res);
            }
            else {
                setIsLoggedIn(false);
                setUser(null);
            }
        }).catch((error) => {
            throw new Error(error)
        }).finally(() => setLoading(false))
    }


    useEffect(() => {
        fetchCurrentUser()
    }, []);

    return (
        <GlobalContext.Provider value={{ setIsLoggedIn, loading, setLoading, user, setUser, isLoggedIn }}>
            {children}
        </GlobalContext.Provider>
    )
}

