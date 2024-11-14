
const signUp = async (req, res) => {
  try {
    const body = req.body;
    const { name, email, password } = body;
    console.log(name, email);

    const users = await db.collection("users").insertOne({
      name,
      email,
      password,
    });
    console.log(users);
    res.send("amjillttai burtegdlee");
  } catch (error) {
    console.log(error);

    res.send("amjiltgui");
  }
};
module.exports = signUp;
