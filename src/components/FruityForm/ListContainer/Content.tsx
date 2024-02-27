import React from "react";
import { Box, Checkbox, List, ListItem, Typography } from "@mui/material";
import { FoodItemsInterface } from "../../../interfaces/FoodItemsInterface";

interface ContentProps {
  items: FoodItemsInterface[];
  onToggleItem: (itemId: number) => void;
  itemPrices: { [itemId: number]: number | null };
}

export const Content: React.FC<ContentProps> = ({
  items,
  onToggleItem,
  itemPrices,
}) => {
  console.log("itemPrices", itemPrices);

  return (
    <List>
      {items.map((item) => (
        <ListItem
          key={item.id}
          sx={{
            
            borderBottom: "0.1px solid rgba(0, 0, 0, 0.2)",
          }}
        >
          <Checkbox
            checked={item.checked}
            onChange={() => onToggleItem(item.id)}
            sx={{
              right: "22px",
              color: "black",
              "&.Mui-checked": {
                color: "black",
              },
            }}
          />
          <Box sx={{margin:'0px 0px'}}>
          <span>{item.label}</span>
          </Box>
          {/* itemPrices[item.id] !== 0 by nie wyświetlać wartości zerowych jesli nie zostaly wprowadzone */}
          {item.checked &&
          itemPrices[item.id] !== null &&
          itemPrices[item.id] !== 0 ? (
            <Typography variant="subtitle1" sx={{ margin: "0px 10px" }}>
              {itemPrices[item.id]}
            </Typography>
          ) : null}
        </ListItem>
      ))}
    </List>
  );
};
