import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const tweets = [];
const users = [];

// POST /sign-up
server.post("/sign-up", (request, response) => {
  // const newUser = request.body;
  const { username, avatar } = request.body;
  
  if(!username || !avatar) {
    return response.status(400).send("Todos os campos são obrigatórios!")
  }
  //users.push(newUser);
  users.push({
    username,
    avatar,
  })
  //response.send("OK")
  response.status(201).send("OK");
});

// POST /tweets
server.post("/tweets", (request, response) => {
  //const newTweet = request.body;
  const { username, tweet } = request.body;
  //tweets.push(newTweet);
  //response.send("OK"); 
  if(!username || !tweet) {
    return response.status(400).send("Todos os campos são obrigatórios!")
  }
  tweets.push({
    username,
    tweet,
  })
  response.status(201).send("OK");
});

// GET /tweets
server.get("/tweets", (request, response) => {
  const lastTweets = tweets.slice(-10);
  let usersTweet = [];

  lastTweets.forEach((value) => {
    let username = value.username;
    let tweet = value.tweet;
    const user = users.find((value) => value.username === username);
    // Verifica se o usuário existe;
    if (user !== undefined) {
      const post = {
        ...user,
        tweet,
      };
      usersTweet.push(post);
    }
  });

  response.send(usersTweet);
});
server.listen(5000, function () {
  console.log("Listening on 5000");
});
