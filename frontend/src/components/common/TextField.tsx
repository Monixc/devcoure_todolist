import styled from "styled-components";
import { colors } from "../../styles/tokens/colors";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    focused?: boolean;
    fullWidth?: boolean;
}

export const TextField = ({
    error,
    focused,
    fullWidth = false,
    ...props
}: TextFieldProps) => {
    return (
        <TextFieldContainer
            $error={error}
            $focused={focused}
            $fullWidth={fullWidth}
            {...props}
        />
    );
};

const TextFieldContainer = styled.input<{
    $error?: boolean;
    $focused?: boolean;
    $fullWidth: boolean;
}>`
    box-sizing: border-box;
    height: 40px;
    padding: 0 16px;
    width: ${props => props.$fullWidth ? '100%' : '360px'};
    border: 1px solid ${colors.gray[400]};
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    outline: none;
    transition: all 0.2s ease-in-out;
    
    ${props => props.$error && `
        border-color: ${colors.red[500]};
        color: ${colors.gray[900]};
    `}

    ${props => props.$focused && `
        border-color: ${colors.gray[900]};
        color: ${colors.gray[900]};
    `}

    &::placeholder {
        color: ${colors.gray[400]};
    }

    &:hover {
        border-color: ${colors.gray[900]};
    }

    &:focus {
        border-color: ${colors.gray[900]};
        color: ${colors.gray[900]};
    }
`;
