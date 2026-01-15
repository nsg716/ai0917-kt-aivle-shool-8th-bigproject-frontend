import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

interface RedirectURIProps {
  onLoginSuccess: (type: 'manager' | 'author' | 'admin') => void;
}

const RedirectURI: React.FC<RedirectURIProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const isRequestSent = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    const loginProcess = async () => {
      if (isRequestSent.current) return;
      isRequestSent.current = true;

      try {
        const response = await axios.post("http://localhost:8080/auth/naver/login", {
          code,
          state,
        });

        if (response.status === 200) {
          // 백엔드 응답 예시: { role: 'admin', token: '...' }
          const { role, token } = response.data;
          
          // 1. 토큰 저장
          localStorage.setItem("accessToken", token);
          
          // 2. App.tsx의 상태 업데이트 (권한 설정 + 화면 이동)
          onLoginSuccess(role); 

          // 3. 만약 React Router의 경로로 이동하고 싶다면 navigate 사용
          // navigate('/dashboard'); 
          
          console.log(`${role} 권한으로 로그인 성공`);
        }
      } catch (error) {
        console.error("로그인 실패:", error);
        alert("로그인 중 오류가 발생했습니다.");
        navigate("/login");
      }
    };

    if (code) loginProcess();
  }, [navigate, onLoginSuccess]);

  return (
    <Wrap>
      <LoadingText>사용자 권한을 확인 중입니다...</LoadingText>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  color: #333;
`;

export default RedirectURI;
