import connectDb from "@/databse/conn";
import Users from "@/models/Schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectDb();
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data...!" });
    const { username, email, password } = req.body;

    // check duplicate users
    const checkexisting = await Users.findOne({ email });
    if (checkexisting)
      return res.status(422).json({ message: "User Already Exists...!" });

    // hash password
    const hashPassword = await hash(password, 10);
    const user = await Users.create({
      username,
      email,
      password: hashPassword,
    });

    await user.save();

    return res.status(201).json(user);
  }
}
