const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);


const itemSeed = [ 
   
            {
                name: "Coke 12 Pack",
                quantity:"1",
                cost:3.99,
                category:"grocery"
            },
            {
                name: "Chicken Brest 2.5lbs",
                quantity:"1",
                cost:5.49,
                category:"grocery"
            },
            {
                name: "Penne Pasta",
                quantity:"1",
                cost:0.99,
                category:"grocery"
            },
            {
                name: "Tomato Sauce",
                quantity:"1",
                cost:3.78,
                category:"grocery"
            },
            {
                name: "eggs",
                quantity:"1",
                cost:1.48,
                category:"grocery"
            },
    

    date: new Date(Date.now()),
    store:"Cub Foods",
    total: 15.32
},



]