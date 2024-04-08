import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider ({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : false;
    });
    const [doctor, setDoctor] = useState(() => {
        const storedDoctor = localStorage.getItem('doctor');
        return storedDoctor ? JSON.parse(storedDoctor) : false;
    });
    const [admin, setAdmin] = useState(() => {
        const storedAdmin = localStorage.getItem('admin');
        return storedAdmin ? JSON.parse(storedAdmin) : false;
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('doctor', JSON.stringify(doctor));
        console.log('doctor state from auth provider:',doctor);
    }, [doctor]);

    useEffect(() => {
        localStorage.setItem('admin', JSON.stringify(admin));
    }, [admin]);

    return (
        <AuthContext.Provider value={{ user, setUser, doctor, setDoctor, admin, setAdmin, isLoading, setIsLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;