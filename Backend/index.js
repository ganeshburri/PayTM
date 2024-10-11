if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const appRouter = require("./routes/app.js");

app.use(cors());
app.use(express.json());

//Establishing Connection to Database..
main()
    .then((res)=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    })
async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}

//Routes
app.use("/api/v1",appRouter);

app.listen(PORT,()=>{
    console.log(`Server is listening on Port ${PORT}`);
})