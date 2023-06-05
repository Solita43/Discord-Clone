import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<div id="form-container">
				<h1 className="form-title">Sign Up</h1>
				<form className="form-box" onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<label className="signup-labels">
						Email
						<input
							type="text"
							className="input-area"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					<label className="signup-labels">
						Username
						<input
							type="text"
							className="input-area"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
					<label className="signup-labels">
						Password
						<input
							type="password"
							className="input-area"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
					<label className="signup-labels">
						Confirm Password
						<input
							type="password"
							className="input-area"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
					<button className="form-button" type="submit">Sign Up</button>
				</form>
			</div>
		</>
	);
}

export default SignupFormModal;
