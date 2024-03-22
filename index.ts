import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/api", async (req, res) => {
  const { email, name } = req.body;
  console.log(req.body);

  if (!email || !name)
    return res
      .status(400)
      .json({ message: `Email and name are required fields` });

  try {
    const createdRow = await prisma.waitList.create({
      data: {
        email,
        name,
      },
    });
    res.json(createdRow);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

const server = app.listen(PORT, () => {
  console.log(`приложение запущено на порту: ${PORT}`);
});
