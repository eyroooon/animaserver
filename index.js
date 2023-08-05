const express = require('express');
const app = express();
const db = require('./models');
const userRouter = require("./routes/user.js");
const contractFunctionRouter = require("./routes/contractFunction");
const categoryFunctionRouter = require("./routes/categories");
const variableFunctionRouter = require("./routes/variables");
const contractFunctionCategoryVariableFunctionRouter = require("./routes/contractFunctionCategoryVariables");
const cors = require('cors')

app.use(express.json());
app.use(cors());

//Routes
app.use("/user", userRouter);
app.use("/contract-functions", contractFunctionRouter);
app.use("/categories", categoryFunctionRouter);
app.use("/variables", variableFunctionRouter);
app.use("/fcv", contractFunctionCategoryVariableFunctionRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server running on port 3001');
  });
});
