import { useState } from "react";
import { useNavigate } from "react-router-dom";  
import "./signup.css";

function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();                 

  const handleSignUp = () => {
    if (!id || !password) {
      alert("ID와 PASSWORD를 모두 입력해주세요.");
      return;
    }

    console.log("회원가입 요청 준비:", { id, password });

    navigate("/login");
  };

  return (
    <div className="screen">
      <div className="wrap">
        <img src="/signup.png" className="signup-img" alt="signup-ui" />

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

        <button className="btn signup-btn" onClick={handleSignUp}>
        </button>
      </div>
    </div>
  );
}

export default SignUp;
