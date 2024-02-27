import React, { useEffect, useState } from "react";
import { Box, Checkbox, IconButton, ListItem } from "@mui/material";

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
    <ListItem  sx={{ right: "22px", marginTop: "20px",width:'320px' }}>
      <Checkbox checked={isChecked} onChange={handleToggleAll}/>
      <Box  sx={{margin:'0px 20px'}}>
      <span>{groupName}</span>
      </Box>
      <IconButton onClick={onToggleExpand}>{isExpanded ? "▼" : "►"}</IconButton>
    </ListItem>
  );
};
