import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { login } from "../utils/apiUtils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full mx-w-lg divide-y divide-gray-700">
      <h1 className="text-2xl my-2 text-gray-700">Login</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <button
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="submit"
            onClick={(e) => handleSubmit}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
