import styled from "styled-components";
import { TextField } from "../../components/common/TextField";
import { Button } from "../../components/common/Button";
import { colors } from "../../styles/tokens/colors";
import { useState } from "react";
import { join } from "../../services/authApi";
import { useNavigate } from "react-router-dom";

export default function Join() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== passwordCheck) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    try {
      await join(userId, password);
      navigate("/login");
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenterWrapper>
      <Container>
        <TodoTitle>회원가입</TodoTitle>
        <form onSubmit={handleJoin} style={{width: "100%"}}>
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
            <TextField
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              fullWidth
              value={passwordCheck}
              onChange={e => setPasswordCheck(e.target.value)}
              disabled={loading}
            />
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <Button variant="slate-filled" size="full" type="submit" disabled={loading}>
              {loading ? "회원가입 중..." : "회원가입"}
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
  line-height: 150%; /* 36px */
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
