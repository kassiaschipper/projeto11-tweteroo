import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const tweets = [];
const users = [];

// POST /sign-up
server.post("/sign-up", (request, response) => {
  const { username, avatar } = request.body;

  if (!username || !avatar) {
    return response.status(400).send("Todos os campos são obrigatórios!");
  }

  users.push({
    username,
    avatar,
  });

  response.status(201).send("OK");
});

// POST /tweets
server.post("/tweets", (request, response) => {
  const { username, tweet } = request.body;

  if (!username || !tweet) {
    return response.status(400).send("Todos os campos são obrigatórios!");
  }
  tweets.push({
    username,
    tweet,
  });
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

server.get("/tweets/:username", (request, response) => {
  const { username } = request.params;
  const allUserTweets = [];

  const filterTweets = tweets.filter((value) => value.username === username);

  filterTweets.forEach((value) => {
    let username = value.username;
    let tweet = value.tweet;
    const user = users.find((value) => value.username === username);

    if (user !== undefined) {
      const post = {
        ...user,
        tweet,
      };
      allUserTweets.push(post);
    }
  });
  response.send(allUserTweets);
});

server.listen(5000, function () {
  console.log("Listening on 5000");
});
