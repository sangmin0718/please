// frontend/src/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // 파이어베이스 가져오기
import { createUserWithEmailAndPassword } from "firebase/auth"; // 회원가입 함수
import "./signup.css";

function SignUp() {
  const [email, setEmail] = useState(""); // 변수명 id -> email로 변경 (헷갈림 방지)
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("아이디(이메일)와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 1. 파이어베이스에 회원가입 요청
      await createUserWithEmailAndPassword(auth, email, password);
      
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login"); // 로그인 페이지로 이동
      
    } catch (error) {
      console.error("회원가입 에러:", error);
      
      // 자주 나는 에러 메시지 처리
      if (error.code === "auth/email-already-in-use") {
        alert("이미 사용 중인 이메일입니다.");
      } else if (error.code === "auth/invalid-email") {
        alert("이메일 형식이 올바르지 않습니다. (@ 포함 필수)");
      } else if (error.code === "auth/weak-password") {
        alert("비밀번호는 6자리 이상이어야 합니다.");
      } else {
        alert("회원가입 실패: " + error.message);
      }
    }
  };

  return (
    <div className="screen">
      <div className="wrap">
        <img src="/signup.png" className="signup-img" alt="signup-ui" />

        {/* 아이디 입력칸 (이메일 형식 필수) */}
        <input
          type="email"
          placeholder="ID (이메일 형식)"
          className="input-box input1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 비밀번호 입력칸 */}
        <input
          type="password"
          placeholder="PASSWORD"
          className="input-box input2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 투명 버튼 영역 */}
        <button className="btn signup-btn" onClick={handleSignUp} style={{
          width: "220px", height: "110px", top: "142px", left: "670px" 
          /* CSS 파일에 위치가 없어서 임의로 넣었습니다. signup.css에 .signup-btn 위치가 없다면 조정 필요 */
        }}>
        </button>
      </div>
    </div>
  );
}

export default SignUp;
