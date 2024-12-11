const express = require("express");

const app = express();
const cors = require("cors");
const path = require("path")

app.use(cors());
app.use(express.json());

const PORT = 8001;

app.use(require("./routes"));
console.log(app.use("/uploads" ,express.static(path.join(__dirname, "uploads"))));
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
