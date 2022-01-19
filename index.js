const express = require("express");
const app = express();
const encrypt = require("./api/encrypt");

app.use(express.json({ extended: false }));

app.use("/api/encrypt", encrypt);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
