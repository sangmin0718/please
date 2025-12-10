import { useState } from 'react';
import { useNavigate } from "react-router-dom";   
import "./App.css?v=1";

function App() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();             
  const handleLogin = () => {
    if (!id || !password) {
      alert('ID와 PASSWORD를 모두 입력해 주세요.');
      return;
    }
    console.log('LOGIN 요청 준비:', { id, password });
  };

  const handleSignUp = () => {
    console.log('SIGN UP 버튼 클릭');
    navigate("/signup");                     
  };

  return (
    <div className="screen">
      <div className="wrap">
        <img
          src="/login.png"
          alt="center-img"
          className="login-img"
        />

        <input
          type="text"
          placeholder="ID"
          className="input-box input1"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="password"
          placeholder="PASSWORD"
          className="input-box input2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn1" onClick={handleLogin}>
        </button>

        <button className="btn btn2" onClick={handleSignUp}>
        </button>
      </div>
    </div>
  );
}

export default App;
