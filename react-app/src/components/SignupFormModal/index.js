import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useHistory } from "react-router-dom";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory()
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState(null)
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			// const data = await dispatch(signUp(username, email, password, firstname, lastname));
			const formData = new FormData();
			formData.append("image", image);
			formData.append("username", username);
			formData.append("email", email);
			formData.append("first_name", firstname);
			formData.append("last_name", lastname);
			formData.append("password", password);
			// console.log("this is the form data image: ", formData.get("image"))

			const data = await dispatch(signUp(formData))

			if (data) {
				setErrors(data);
			} else {
				closeModal();
				history.push('/home')

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
				<form className="form-box" onSubmit={handleSubmit} encType="multipart/form-data">
					<ul className="errors">
						{Object.values(errors).map((error, idx) => {
							return (
								<li key={idx}>{error}</li>
							)
						})}
					</ul>
					<label className="signup-labels">
						First Name
						<input
							type="text"
							className="input-area"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							required
						/>
					</label>
					<label className="signup-labels">
						Last Name
						<input
							type="text"
							className="input-area"
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							required
						/>
					</label>
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
						Image icons
						<input
							type="file"
							className="input-area"
							accept="image/*"
							onChange={(e) => setImage(e.target.files[0])}
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
