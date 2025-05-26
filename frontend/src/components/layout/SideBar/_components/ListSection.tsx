import { colors } from "../../../../styles/tokens/colors";
import { Button } from "../../../common/Button";
import styled from "styled-components";
import { EmptyMessage } from "../../../common/EmptyMessage";

interface ListSectionProps {
  title: string;
  items: { id: string | number; name: string; active?: boolean }[];
  onMenuOpen: (e: React.MouseEvent, id: string | number) => void;
  onSelectTeam: (id: string | number) => void;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const ListSection = ({
  title, items, onMenuOpen, onSelectTeam, buttonText, onButtonClick
}: ListSectionProps) => (
  <Section>
    <SectionTitle>{title}</SectionTitle>
    <TeamList>
      {items.length === 0 ? (
        <EmptyMessage>
          {title === '내 팀 목록' ? '아직 가입된 팀이 없습니다.' :
           title === '초대받은 목록' ? '아직 받은 팀 초대가 없습니다.' : ''}
        </EmptyMessage>
      ) : (
        items.map(item => (
          <Button
            key={item.id}
            size="full"
            variant="gray-filled"
            active={item.active}
            hasIcon
            onClick={() => onSelectTeam(item.id)}
            onIconClick={e => onMenuOpen(e, item.id)}
          >
            {item.name}
          </Button>
        ))
      )}
    </TeamList>
    {buttonText && onButtonClick && (
      <Button
        size="full"
        variant="gray-outlined"
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    )}
  </Section>
);

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.gray[800]};
  margin: 0;
  padding: 0 4px;
`;
const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
`; 