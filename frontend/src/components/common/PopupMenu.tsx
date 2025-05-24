import styled from "styled-components";

interface MenuItem {
    label: string;
    onClick: () => void;
}

interface PopupMenuProps {
    open: boolean;
    anchorPosition: { top: number; left: number };
    items: MenuItem[];
    onClose: () => void;
}

export const PopupMenu = ({ open, anchorPosition, items, onClose }: PopupMenuProps) => {
    if (!open) return null;
    return (
        <MenuOverlay onClick={onClose}>
            <MenuContainer
                style={{
                    position: "fixed",
                    top: anchorPosition.top,
                    left: anchorPosition.left,
                }}
                onClick={e => e.stopPropagation()}
            >
                {items.map((item, idx) => (
                    <MenuItemButton key={idx} onClick={item.onClick}>
                        {item.label}
                    </MenuItemButton>
                ))}
            </MenuContainer>
        </MenuOverlay>
    );
};

const MenuOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 2000;
`;

const MenuContainer = styled.div`
    max-width: 155px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    padding: 4px 0;
    z-index:1000;
`;

const MenuItemButton = styled.button`
    width: 100%;
    padding: 10px 16px;
    background: none;
    border: none;
    text-align: left;
    font-size: 12px;
    color: #222;
    cursor: pointer;
    &:hover {
        background: #f3f4f6;
    }
`; 