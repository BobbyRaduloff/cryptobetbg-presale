import { withIronSessionApiRoute } from "iron-session/next";
import clientPromise from "../../lib/mongodb";
import { verifyRecaptcha } from "../../lib/recaptcha";
import { sessionOptions } from "../../lib/session";
import * as bcrypt from "bcryptjs";
import { saltRounds } from "../../lib/password";

export default withIronSessionApiRoute(async function changePasswordRoute(
  req,
  res
) {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ error: "Only POST requests are allowed on this endpoint!" });
  }

  if (req.session.user.isLoggedIn !== true) {
    return res.status(401).json({ error: "You're not logged in!" });
  }

  const client = await clientPromise;
  const col = client.db(process.env.MONGODB_DB).collection("users");

  const { oldPassword, newPassword, recaptcha } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: "Please fill out all the fields!" });
  }

  if (!recaptcha) {
    return res.status(400).json({ error: "No ReCaptcha submitted!" });
  }

  if (!verifyRecaptcha(recaptcha)) {
    return res.status(400).json({
      error:
        "Our system seems to think you're a robot. Please try again later.",
    });
  }

  const existing = await col.findOne({ email: req.session.user.email });
  if (!existing) {
    return res.status(400).json({
      error: "A user with this email does not exist!",
    });
  }

  if (!bcrypt.compareSync(oldPassword, existing.hash)) {
    return res.status(404).json({
      error: "Wrong password!",
    });
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(newPassword, salt);

  col.updateOne({ email: req.session.user.email }, { $set: { hash } });

  res.status(200).json({});
},
sessionOptions);
