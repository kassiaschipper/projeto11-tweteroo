import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const tweets = [];
const users = [];

// POST /sign-up
server.post("/sign-up", (request, response) => {
  const newUser = request.body;
  //console.log(newUser);
  users.push(newUser);

  response.send("OK");
});

// POST /tweets
server.post("/tweets", (request, response) => {
  const newTweet = request.body;
  //console.log(newTweet);
  tweets.push(newTweet);
  response.send("OK");
});

// GET /tweets
server.get("/tweets", (request, response) => {
  const lastTweets = tweets.slice(-10); 
  // [
  //   {
  //     username: "bobesponja",
  //     avatar:
  //       "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  //     tweet: "eu amo o hub",
  //   },
  // ];

  response.send(lastTweets);
});
server.listen(5000, function () {
  console.log("Listening on 5000");
});
