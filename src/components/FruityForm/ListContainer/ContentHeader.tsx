import React, { useEffect, useState } from "react";
import { Checkbox, IconButton, ListItem } from "@mui/material";

interface ContentHeaderProps {
  onToggleAll: (isChecked: boolean) => void;
  groupName: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const ContentHeader: React.FC<ContentHeaderProps> = ({
  onToggleAll,
  groupName,
  isExpanded,
  onToggleExpand,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(false);
  }, [groupName]);

  const handleToggleAll = () => {
    setIsChecked((prev) => !prev);
    onToggleAll(!isChecked);
  };

  return (
    <ListItem>
      <Checkbox checked={isChecked} onChange={handleToggleAll} />
      <span>{groupName}</span>
      <IconButton onClick={onToggleExpand} >{isExpanded ? "▼" : "►"}</IconButton>
    </ListItem>
  );
};
