const express = require("express");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
const Router = require("./Routes/sign_up");
// const Router2 = require("./Routes/log_in");
const app = express();
app.use("/users", Router);
app.use(express.json());

const client = new MongoClient(
  "mongodb+srv://ooyundari887:kPDwz0ydJKmhNTvX@cluster-1.l6azy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-1"
);
let db;
const connectDB = () => {
  try {
    client.connect();
    db = client.db("sample_mflix");
    console.log("Connect to DB");
  } catch (error) {
    console.log("failed to connect");
  }
};
connectDB();

// const hashed = async (req, res, next) => {
//   const { password } = req.body;
//   const passhash = await bcrypt.hash(password, 10);
//   req.body.password = passhash;
//   next();
// };

const hashedPass = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const response = await db.collection("users").findOne({ email });
  console.log(response);

  if (!response) {
    res.status(404).send("User not founded");
  }
  const hashpassword = response.password;
  const valid_pass = await bcrypt.compare(password, hashpassword);
  console.log(valid_pass);
  if (valid_pass) {
    res.send(response);
  }
  next();
};

// const deleteUser = async (req, res, next) => {
//   const { id } = req.body;
//   const response = await db
//     .collection("users")
//     .deleteOne({ _id: new ObjectId(id) });
//   if (response) {
//     res.send("user is deleted");
//   }
//   next();
// };

app.get("/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.status(200).send(users);
});

// app.post("/sign_up", hashed, async (req, res) => {
//   try {
//     const body = req.body;
//     const { name, email, password } = body;
//     console.log(name, email);

//     const users = await db.collection("users").insertOne({
//       name,
//       email,
//       password,
//     });
//     console.log(users);
//     res.send("amjillttai burtegdlee");
//   } catch (error) {
//     console.log(error);

//     res.send("amjiltgui");
//   }
// });

// app.post("/log_in", hashedPass, async (req, res) => {
//   res.send("password and email is wrong");
// });

app.delete("/users", deleteUser, async (req, res) => {
  res.send("user is not delete");
});

app.listen(3000, console.log("Your server is running"));
