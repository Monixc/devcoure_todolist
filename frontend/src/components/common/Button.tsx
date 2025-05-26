import styled, { css } from "styled-components";
import { colors } from "../../styles/tokens/colors";
import { FiMoreHorizontal } from "react-icons/fi";

type ButtonVariant = 'slate-filled' | 'gray-filled' | 'gray-outlined' | 'red-outlined';
type ButtonSize = 'sm' | 'md' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    hasIcon?: boolean;
    onIconClick?: (e: React.MouseEvent) => void;
    active?: boolean;
}

export const Button = ({
    children,
    variant = 'slate-filled',
    size = 'sm',
    hasIcon,
    onIconClick,
    active,
    ...props
}: ButtonProps) => {
    const handleIconClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onIconClick?.(e);
    };

    return (
        <ButtonContainer
            $variant={variant}
            $size={size}
            $active={active}
            {...props}
        >
            <span>{children}</span>
            {hasIcon && (
                <IconWrapper onClick={handleIconClick}>
                    <FiMoreHorizontal size={20} />
                </IconWrapper>
            )}
        </ButtonContainer>
    );
};


const baseButtonStyle = css`
    height: 40px;
    padding: 8px 16px;
    border-radius: 4px;
`;

const getButtonSize = (size: ButtonSize) => {
    switch (size) {
        case 'sm':
            return css`
                ${baseButtonStyle}
                width: fit-content;
                min-width: 64px;
            `;
        case 'md':
            return css`
                ${baseButtonStyle}
                width: 320px;
            `;
        case 'full':
            return css`
                ${baseButtonStyle}
                width: 100%;
            `;
    }
};

const getButtonStyles = (variant: ButtonVariant) => {
    switch (variant) {
        case 'slate-filled':
            return css`
                background-color: ${colors.gray[900]};  
                color: white;
                border: none;

                &:hover {
                    opacity: 0.9;
                }
            `;
        case 'gray-filled':
            return css`
                background-color: ${colors.gray[300]};  
                color: ${colors.gray[900]};            
                border: none;

                &:hover {
                    opacity: 0.9;
                }
            `;
        case 'gray-outlined':
            return css`
                background-color: white;
                color: ${colors.gray[900]};
                border: 1px solid ${colors.gray[400]}; 

                &:hover {
                    background-color: ${colors.gray[400]};
                    color: white;
                }
            `;
        case 'red-outlined':
            return css`
                background-color: white;
                color: ${colors.red[500]};
                border: 1px solid ${colors.red[500]};

                &:hover {
                    background-color: ${colors.red[500]};
                    color: white;
                }
            `;
    }
};

const ButtonContainer = styled.button<{
    $variant: ButtonVariant;
    $size: ButtonSize;
    $active?: boolean;
}>`
    display: flex;
    align-items: center;
    justify-content: ${({ $variant }) =>
        $variant === 'gray-filled' ? 'space-between' : 'center'};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    ${props => getButtonSize(props.$size)}
    ${props => getButtonStyles(props.$variant)}
    ${({ $active }) => $active && `
        background-color: ${colors.gray[900]};
        color: white;
    `}
`;
const IconWrapper = styled.span`
    margin-left: 4px;
    padding: 4px 8px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;
