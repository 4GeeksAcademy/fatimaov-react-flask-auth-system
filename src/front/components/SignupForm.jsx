import { useState } from "react";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const SignupForm = () => {

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setAlert(null);

        const trimmedFirstName = userFirstName.trim();
        const trimmedLastName = userLastName.trim();
        const trimmedEmail = userEmail.trim();
        const trimmedPassword = userPassword.trim();
        if (!trimmedFirstName || !trimmedLastName || !trimmedEmail || !trimmedPassword) {
            setUserFirstName(trimmedFirstName);
            setUserLastName(trimmedLastName);
            setUserEmail(trimmedEmail);
            setUserPassword(trimmedPassword);
            setAlert("First name, last name, email, and password are required");
            return;
        }
        
        const body = {
            first_name: trimmedFirstName,
            last_name: trimmedLastName,
            email: trimmedEmail,
            password: trimmedPassword
        }
        // Send the signup request to the backend
        async function signupRequest() {
            try {
                const response = await fetch(`${backendUrl}/api/signup`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const responseJS = await response.json();
                if (!response.ok) {
                    setAlert(responseJS.response);
                    return;
                }
                // If signup succeeds, notify the user and redirect to the login page
                window.alert(responseJS.response);
                navigate("/");

            } catch (error) {
                setAlert("Unable to reach the server. Please try again");
            }
        }
        signupRequest();
    }

    return (
        <>
            <form onSubmit={handleSubmit} style={{ maxWidth: 500 }} className="m-auto text-start my-5">
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input onChange={(e) => setUserFirstName(e.target.value)} value={userFirstName} type="text" className="form-control" id="firstName" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input onChange={(e) => setUserLastName(e.target.value)} value={userLastName} type="text" className="form-control" id="lastName" required />
                </div>
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
    )
}
