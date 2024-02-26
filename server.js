import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post("/submit-form", (req, res) => {
  const formData = req.body;
  console.log("Received form data:", formData);

  // Zmiana formatu danych na na id : item.id : price 
  const formattedFormData = {
    selection: formData.selection,
    itemPrices: Object.entries(formData.itemPrices).map(([itemId, price]) => ({
      itemId: +itemId,
      price,
    })),
  };

  console.log("Formatted form data:", formattedFormData);

  res.cookie("myCookie", JSON.stringify(formattedFormData), { httpOnly: true, secure: true });

  // Zwróć sformatowane dane wraz z odpowiedzią
  res.status(200).json({ message: "Form data received successfully", formattedFormData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
