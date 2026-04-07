import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const UserProfile = () => {

    const { store } = useGlobalReducer();
    const user = store.userData;

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card bg-dark text-light border-secondary shadow-sm">
                        <div className="card-body p-4 p-md-5">
                            <p className="text-uppercase text-secondary small mb-2">Authenticated User</p>
                            <h2 className="display-6 mb-3">Hello, {user.first_name}.</h2>
                            <p className="text-light-emphasis mb-4">
                                You are logged in successfully. This private area shows the information linked to your account.
                            </p>

                            <div className="row g-3">
                                <div className="col-12 col-md-6">
                                    <div className="border rounded-3 border-secondary-subtle p-3 h-100">
                                        <p className="text-secondary small mb-1">First Name</p>
                                        <p className="mb-0 fs-5">{user.first_name}</p>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="border rounded-3 border-secondary-subtle p-3 h-100">
                                        <p className="text-secondary small mb-1">Last Name</p>
                                        <p className="mb-0 fs-5">{user.last_name}</p>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="border rounded-3 border-secondary-subtle p-3">
                                        <p className="text-secondary small mb-1">Email Address</p>
                                        <p className="mb-0 fs-5">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
