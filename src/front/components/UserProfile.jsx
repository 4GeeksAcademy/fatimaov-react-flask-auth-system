import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const UserProfile = () => {

    const { store, dispatch } = useGlobalReducer();

	return (
		<div className="text-center mt-5">
			<h2>Hello {store.userData.first_name} 🥳</h2>
			<p>You are logged in successfully👌</p>
		</div>
	);
}; 