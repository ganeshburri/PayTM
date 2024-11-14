import { useState, useEffect } from "react";
import axios from "axios";

function useIsSignedIn() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        setIsSignedIn(false);
        setLoading(false);
        return;
    }
    const verifyToken = async () => {
        try {
        const response = await axios.get("http://localhost:3000/api/v1/users/me", {
            headers: {
            Authorization: "Bearer " + token,
            },
        });
        if (response.data.user) {
            setIsSignedIn(true);
            setLoading(false);
        } else {
            setIsSignedIn(false);
            setLoading(false);
        }
        } catch (error) {
        setIsSignedIn(false);
        setLoading(false);
        }
    };
    verifyToken();
    }, []);
    return { isSignedIn, loading };
}

export default useIsSignedIn;