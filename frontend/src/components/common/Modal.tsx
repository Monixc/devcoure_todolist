import styled from "styled-components";
import { Button } from "./Button";

interface ModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    children?: React.ReactNode;
}

export const Modal = ({
    isOpen,
    onConfirm,
    onCancel,
    title,
    confirmText = "확인",
    cancelText = "취소",
    children
}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContainer>
                {title && <ModalTitle>{title}</ModalTitle>}
                <ModalContent>
                    {children}
                </ModalContent>
                <ButtonGroup>
                    <Button 
                        variant="slate-filled" 
                        size="sm"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                    <Button 
                        variant="gray-outlined" 
                        size="sm"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </Button>
                </ButtonGroup>
            </ModalContainer>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    display: flex;
    width: 360px;
    min-height: 100px;
    padding: 24px 20px;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 24px;
    background-color: white;
    border-radius: 4px;
`;

const ModalTitle = styled.h2`
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 700;
`;

const ModalContent = styled.div`
    text-align: left;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;
