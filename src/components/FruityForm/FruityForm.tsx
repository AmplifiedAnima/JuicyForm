import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ListContainer } from "./ListContainer/ListContainer";

const schema = yup.object().shape({
  selection: yup.string().required("To pole jest wymagane"),
});

interface FormDataToSend {
  selection: string;
  itemPrices: { [itemId: number]: number | null };
}

export const FruityForm = () => {
  const { control, handleSubmit, formState, watch, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedGroup = watch("selection");

  useEffect(() => {
    setValue("selection", selectedGroup);
  }, [selectedGroup, setValue]);

  const [listItemPrices, setListItemPrices] = useState<{
    [itemId: number]: number | null;
  }>({});

  const handleListDataChange = (updatedPrices: {
    [itemId: number]: number | null;
  }) => {
    setListItemPrices(updatedPrices);
  };

  const onSubmit = async (data: { selection: string }) => {
    console.log("Form data:", data);
    console.log("Item prices:", listItemPrices);

    const formDataToSend: FormDataToSend = {
      selection: data.selection,
      itemPrices: listItemPrices,
    };

    console.log("Form data to send:", formDataToSend);

    try {
      const response = await fetch("http://localhost:3001/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
        credentials: "include",
      });

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (response.ok) {
        reset();
        setValue("selection", "");
        console.log("Check cookies :", responseData);
      } else {
        console.error("Error during form submission:", responseData);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <FormControl fullWidth sx={{ marginBottom: 2, maxWidth: 400 }}>
            <InputLabel id="select-label">Wybierz</InputLabel>
            <Controller
              name="selection"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select labelId="select-label" label="Wybierz" {...field}>
                  <MenuItem value="Warzywa">Warzywa</MenuItem>
                  <MenuItem value="Owoce">Owoce</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Typography
            variant="subtitle1"
            sx={{
              margin: "0px 10px",
              color: "red",
            }}
          >
            {formState.errors.selection?.message}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "black", color: "#ffffff", marginTop: 2 }}
          >
            Wyślij
          </Button>
          {selectedGroup && (
            <ListContainer
              selectedGroup={selectedGroup}
              onDataChange={handleListDataChange}
            />
          )}
        </Box>
      </form>
    </>
  );
};
