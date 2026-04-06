import { useState } from "react";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function LoginForm() {

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setAlert(null);
        const trimmedPassword = userPassword.trim();
        const trimmedEmail = userEmail.trim();
        if (!trimmedEmail || !trimmedPassword) {
            setUserEmail(trimmedEmail);
            setUserPassword(trimmedPassword);
            setAlert("Email and password are required.");
            return;
        }
        const body = {
            email: trimmedEmail,
            password: trimmedPassword
        };
        // Send the login request to the backend
        async function loginRequest() {
            try {
                const response = await fetch(`${backendUrl}/api/login`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const responseJS = await response.json();
                if (!response.ok) {
                    setAlert(responseJS.response);
                    return;
                }
                // If the login succeeds, handle the token and redirect the user
                localStorage.setItem("token", responseJS.access_token);
                navigate("/private");

            } catch (error) {
                setAlert("Unable to reach the server. Please try again.");
            }
        }
        loginRequest();
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{ maxWidth: 500 }} className="m-auto text-start my-5">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={(e) => setUserEmail(e.target.value)} value={userEmail} type="email" className="form-control" id="email" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={(e) => setUserPassword(e.target.value)} value={userPassword} type="password" className="form-control" id="password" required />
                </div>
                {alert && (
                    <div className="alert alert-danger" role="alert">
                        {alert}
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default LoginForm;
