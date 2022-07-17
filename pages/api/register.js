import { withIronSessionApiRoute } from "iron-session/next";
import clientPromise from "../../lib/mongodb";
import * as bcrypt from "bcryptjs";
import { sessionOptions } from "../../lib/session";
import * as isemail from "isemail";
import { verifyRecaptcha } from "../../lib/recaptcha";
import { checkPassword, saltRounds } from "../../lib/password";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ error: "Only POST requests are allowed on this endpoint!" });
  }

  const client = await clientPromise;
  const col = client.db(process.env.MONGODB_DB).collection("users");

  const { firstName, lastName, email, password, recaptcha } = req.body;

  if (!recaptcha) {
    return res.status(400).json({ error: "No ReCaptcha submitted!" });
  }

  if (!verifyRecaptcha(recaptcha)) {
    return res.status(400).json({
      error:
        "Our system seems to think you're a robot. Please try again later.",
    });
  }

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Please fill out all the fields!" });
  }

  if (!isemail.validate(email, { minDomainAtoms: 2 })) {
    return res.status(400).json({ error: "Please enter a valid email!" });
  }

  const existing = await col.findOne({ email });
  if (existing) {
    return res.status(400).json({
      error: "This email is already taken!",
    });
  }

  if (!checkPassword(password)) {
    return res.status(400).json({
      error:
        "Your password must be at least 8 characters long and must have at least one digit, uppercase letter, and a lowercase letter!",
    });
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  await col.insertOne({ firstName, lastName, email, hash, reserved: 0 });

  req.session.user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    reserved: 0,
  };
  await req.session.save();

  res.status(200).json({});
}, sessionOptions);
