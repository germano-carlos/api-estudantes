import app from "./src/server";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

// Comentário X (Inicializa a porta para escuta da aplicação)
app.listen(port, () =>
  console.log(`This beautiful and updated server is running on port ${port}`)
);
