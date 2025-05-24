import styled from "styled-components";
import { TextField } from "../../components/common/TextField";
import { Button } from "../../components/common/Button";
import { colors } from "../../styles/tokens/colors";
import { useState } from "react";
import { login } from "../../services/authApi";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(userId, password); 
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/");
      } else {
        setError(res.message || "로그인 실패");
      }
    } catch (err: any) {
      setError(err); 
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <CenterWrapper>
      <Container>
        <TodoTitle>로그인</TodoTitle>
        <form onSubmit={handleLogin} style={{width: "100%"}}>
          <InputContainer>
            <TextField
              placeholder="아이디를 입력해주세요."
              fullWidth
              value={userId}
              onChange={e => setUserId(e.target.value)}
              disabled={loading}
            />
            <TextField
              type="password"
              placeholder="비밀번호를 입력해주세요."
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <Button variant="slate-filled" size="full" type="submit" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
            </Button>
            <Button variant="gray-outlined" size="full" type="button" onClick={() => navigate("/join")}
              disabled={loading}>
              회원가입
            </Button>
          </InputContainer>
        </form>
      </Container>
    </CenterWrapper>
  );
}

const CenterWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

const Container = styled.div`
  display: flex;
  width: 360px;
  padding-bottom: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;
`;

const TodoTitle = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: ${colors.gray[900]};
  text-align: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ErrorMsg = styled.div`
  color: ${colors.red[500]};
  font-size: 14px;
  margin-bottom: 4px;
`;
