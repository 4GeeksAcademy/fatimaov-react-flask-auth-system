import { SignupForm } from "../components/SignupForm.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Signup = () => {

    const navigate = useNavigate();
    
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token) {
                navigate("/private")
                return;
            }
        }, [])


    return (
        <div className="text-center mt-5">
            <h1>Signup page</h1>
            <SignupForm />
            <Link to="/">
                <button className="btn btn-primary">Login</button>
            </Link>
        </div>
    );
}; 