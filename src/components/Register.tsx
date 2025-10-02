import React, { useState } from "react";
import axios from "axios";

interface RegisterProps {
  onRegisterSuccess: (username: string) => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    setLoading(true);
    // Mock API: đăng ký thành công nếu username chưa là 'admin'
    await new Promise(resolve => setTimeout(resolve, 800));
    if (username === "admin") {
      setError("Tài khoản đã tồn tại!");
    } else {
      // Nếu dùng API thật, thay thế đoạn này bằng axios.post(endpoint, { username, password })
      // const response = await axios.post('API_REGISTER_URL', { username, password });
      // if (response.data.success) { ... }
      onRegisterSuccess(username);
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-[400px] max-w-full p-8">
        <form className="flex flex-col space-y-6 w-full" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-indigo-700 mb-2 text-center">Đăng ký tài khoản</h2>
          {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition disabled:opacity-60" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
          <div className="text-center text-sm text-gray-600">
            <span>Đã có tài khoản? </span>
            <button type="button" className="text-indigo-500 hover:underline font-medium" onClick={onSwitchToLogin}>
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
