const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/table"));
app.use(require("./routes/party"));
app.use(require("./routes/order"));
app.use(require("./routes/menu"));
app.use(require("./routes/waiter"));
const dbo = require("./db/conn");
 
app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});