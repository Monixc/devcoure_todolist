// @ts-ignore
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

// @ts-ignore - Node.js 글로벌 객체 사용
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // @ts-ignore
  console.log(process.env.PORT);
});
