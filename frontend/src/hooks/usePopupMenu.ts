import { useState } from "react";

export function usePopupMenu() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: -20, left: -100 });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const openMenu = (e: React.MouseEvent, id: number) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPosition({ top: rect.bottom + window.scrollY, left: rect.right + window.scrollX - 120 });
    setSelectedId(id);
    setOpen(true);
  };
  const closeMenu = () => setOpen(false);

  return { open, position, selectedId, openMenu, closeMenu, setSelectedId };
} 