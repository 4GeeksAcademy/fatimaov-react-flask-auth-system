import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const Private = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            const token = localStorage.getItem("token");
            if (!token) {
                window.alert("Your session was not found. Please log in.")
                navigate("/")
                return;
            }
            const response = await fetch(`${backendUrl}/api/private`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                window.alert("Your session has expired or is no longer valid. Please log in again.")
                navigate("/")
                return;
            }
            const responseJS = await response.json()
            dispatch({
                type: "ADD_DATA",
                payload: responseJS
            })
        }
        getUserData();
    }, [])

    return (
        <>
            <NavBar />
            <div className="text-center mt-5">
                {store.userData ? <Outlet /> : <p>Loading...</p>}
            </div>
            <Footer />
        </>
    );
}; 