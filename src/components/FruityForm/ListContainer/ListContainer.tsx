import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  fruityFoodItems,
  vegetableItems,
} from "../../../mockData/FruityFormItems";
import { ContentHeader } from "./ContentHeader";
import { Content } from "./Content";

interface ListContainerProps {
  selectedGroup: string;
  onDataChange: (data: { [itemId: number]: number | null }) => void;
}

export const ListContainer: React.FC<ListContainerProps> = ({
  selectedGroup,
  onDataChange,
}) => {
  const [allChecked, setAllChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState(
    selectedGroup === "Owoce" ? fruityFoodItems : vegetableItems
  );

  const [itemPrices, setItemPrices] = useState<{
    [itemId: number]: number | null;
  }>({});

  const [validationErrors, setValidationErrors] = useState<{
    [itemId: number]: string | null;
  }>({});

  const [inputPrice, setInputPrice] = useState<number | null>(null);

  useEffect(() => {
    setAllChecked(false);
    setIsExpanded(false);
    setItems(selectedGroup === "Owoce" ? fruityFoodItems : vegetableItems);
    setItemPrices({});
    setInputPrice(null);
    setValidationErrors({});
  }, [selectedGroup]);

  const handleToggleAll = () => {
    setAllChecked((prev) => !prev);
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => ({
        ...item,
        checked: !allChecked,
      }));

      return updatedItems;
    });
  };
  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleToggleItem = (itemId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );

    const checkedItem = items.find((item) => item.id === itemId);
    setItemPrices((prevPrices) => ({
      ...prevPrices,
      [itemId]: checkedItem?.checked ? inputPrice : null,
    }));

    setValidationErrors((prevErrors) => ({ ...prevErrors, [itemId]: null }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrice(+e.target.value);
    const currentItemId = Object.keys(validationErrors)[0];
    if (inputPrice !== null && +e.target.value !== 0 && currentItemId) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [currentItemId]: null,
      }));
    }
  };

  const handleAddPriceButton = (itemId: number) => {
    if (inputPrice !== null && inputPrice !== 0) {
      handleAddPrice(itemId, inputPrice);
      setInputPrice(null);
      setValidationErrors((prevErrors) => ({ ...prevErrors, [itemId]: null }));
    } else {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [itemId]: "Proszę wprowadzić cenę przed dodaniem.",
      }));
    }
  };
  const handleAddPrice = (itemId: number, price: number | null) => {
    setItemPrices((prevPrices) => {
      const updatedPrices = { ...prevPrices, [itemId]: price };
      onDataChange(updatedPrices);
      return updatedPrices;
    });
  };

  return (
    <Box>
      <ContentHeader
        onToggleAll={handleToggleAll}
        groupName={selectedGroup}
        isExpanded={isExpanded}
        onToggleExpand={handleToggleExpand}
      />
      {isExpanded && (
        <>
          <Content
            items={items}
            onToggleItem={handleToggleItem}
            itemPrices={itemPrices}
          />
          {isExpanded &&
            items
              .filter((item) => item.checked)
              .map((checkedItem) => (
                <div key={checkedItem.id}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "left",
                    }}
                  >
                    <Typography sx={{ maxWidth: 400 }}>
                      {checkedItem.label}
                    </Typography>
                    <TextField
                      type="number"
                      placeholder={`Cena dla ${checkedItem.label}`}
                      onChange={handleInputChange}
                      sx={{
                        border: "1px solid black",
                        borderRadius: "4px",
                        marginBottom: "15px",
                        "&:hover": {
                          border: "0px transparent",
                        },
                        width: "400px",
                      }}
                    />
                    <Button
                      onClick={() => handleAddPriceButton(checkedItem.id)}
                      variant="contained"
                      sx={{
                        backgroundColor: "black",
                        color: "#ffffff",
                      }}
                    >
                      Dodaj cenę
                    </Button>
                    {validationErrors[checkedItem.id] && (
                      <Typography sx={{ color: "red" }}>
                        {validationErrors[checkedItem.id]}
                      </Typography>
                    )}
                  </Box>
                </div>
              ))}
        </>
      )}
    </Box>
  );
};
