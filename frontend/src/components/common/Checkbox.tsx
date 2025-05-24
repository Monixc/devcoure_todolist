import styled from "styled-components";
import { colors } from "../../styles/tokens/colors";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: React.ReactNode;
}

export const Checkbox = ({
    label,
    ...props
}: CheckboxProps) => {
    return (
        <CheckboxWrapper>
            <StyledCheckbox 
                type="checkbox"
                {...props}
            />
            {label && <CheckboxLabel>{label}</CheckboxLabel>}
        </CheckboxWrapper>
    );
};

const CheckboxWrapper = styled.label`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`;

const StyledCheckbox = styled.input`
    width: 16px;
    height: 16px;
    border: 1px solid ${colors.gray[400]};
    border-radius: 4px;
    cursor: pointer;
    accent-color: ${colors.gray[600]};

    &:hover {
        border-color: ${colors.gray[600]};
    }

    &:checked + span {
        color: ${colors.gray[600]};
    }
`;

const CheckboxLabel = styled.span`
    font-size: 16px;
    color: ${colors.gray[900]};
    user-select: none;
`; 