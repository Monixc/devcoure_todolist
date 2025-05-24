import { colors } from "../../../styles/tokens/colors";
import { Button } from "../../common/Button";
import styled from "styled-components";

interface ListSectionProps {
  title: string;
  items: { id: number; name: string }[];
  onMenuOpen: (e: React.MouseEvent, id: number) => void;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const ListSection = ({
  title, items, onMenuOpen, buttonText, onButtonClick
}: ListSectionProps) => (
  <Section>
    <SectionTitle>{title}</SectionTitle>
    <TeamList>
      {items.map(item => (
        <Button
          key={item.id}
          size="full"
          variant="gray-filled"
          hasIcon
          onIconClick={e => onMenuOpen(e, item.id)}
        >
          {item.name}
        </Button>
      ))}
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