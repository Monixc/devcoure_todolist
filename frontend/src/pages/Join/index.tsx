import styled from "styled-components";
import { TextField } from "../../components/common/TextField";
import { Button } from "../../components/common/Button";
import { colors } from "../../styles/tokens/colors";

export default function Join() {
  return (
    <CenterWrapper>
      <Container>
        <TodoTitle>회원가입</TodoTitle>
        <InputContainer>
          <TextField placeholder="아이디를 입력해주세요." fullWidth />
          <TextField type="password" placeholder="비밀번호를 입력해주세요." fullWidth />
          <TextField type="password" placeholder="비밀번호를 다시 입력해주세요." fullWidth />
          <Button variant="slate-filled" size="full">
            회원가입
          </Button>
        </InputContainer>
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
