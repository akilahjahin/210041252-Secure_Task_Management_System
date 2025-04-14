import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            login(res.data.token);
        } catch (err) {
            alert("Login failed: " + err.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
