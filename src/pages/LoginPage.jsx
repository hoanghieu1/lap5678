// src/pages/LoginPage.jsx
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      
      localStorage.setItem("token", data.accessToken);

      toast.success("Đăng nhập thành công");
      navigate("/list");
    } catch (error) {
      toast.error(error.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Đăng nhập</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            id="email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            id="password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
