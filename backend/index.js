const express = require("express");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = 8001;

app.use(require("./routes"));

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
