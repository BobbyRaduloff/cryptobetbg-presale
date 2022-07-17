import { withIronSessionApiRoute } from "iron-session/next";
import clientPromise from "../../lib/mongodb";
import * as bcrypt from "bcryptjs";
import { sessionOptions } from "../../lib/session";
import * as isemail from "isemail";
import { verifyRecaptcha } from "../../lib/recaptcha";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ error: "Only POST requests are allowed on this endpoint!" });
  }

  const client = await clientPromise;
  const col = client.db(process.env.MONGODB_DB).collection("users");

  const { email, password, recaptcha } = req.body;

  if (!email || !password) {
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

  if (!isemail.validate(email, { minDomainAtoms: 2 })) {
    return res.status(400).json({ error: "Please enter a valid email!" });
  }

  const existing = await col.findOne({ email });
  if (!existing) {
    return res.status(400).json({
      error: "A user with this email does not exist!",
    });
  }

  if (!bcrypt.compareSync(password, existing.hash)) {
    return res.status(404).json({
      error: "Wrong password!",
    });
  }

  req.session.user = {
    isLoggedIn: true,
    firstName: existing.firstName,
    lastName: existing.lastName,
    email: existing.email,
    reserved: existing.reserved,
    wallet: existing.wallet,
  };
  await req.session.save();

  res.status(200).json({});
}, sessionOptions);
