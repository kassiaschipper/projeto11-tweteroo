import express from "express";
import cors from "cors";
import { runInNewContext } from "vm";

const server = express();
server.use(cors());
server.use(express.json());

const tweets = [];
const user = [];

// GET /tweets
server.get("/tweets", (request, response) => {
  
    response.send(tweets);
   
});




// POST /sign-up
server.post("/sign-up", (request, response) => {
     const newUser = request.body;
    //console.log(newTweet);
    
    user.push(newUser);
    
    response.send("OK");
  });
  

// POST /tweets
server.post("/tweets", (request, response) => {
    
  const newTweet = request.body;
  //console.log(newTweet);
  
  tweets.push(newTweet);
  
  response.send("OK");
});







server.listen(5000, function () {
  console.log("Listening on 5000");
});
