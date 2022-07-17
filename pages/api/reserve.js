import { withIronSessionApiRoute } from "iron-session/next";
import clientPromise from "../../lib/mongodb";
import { sessionOptions } from "../../lib/session";

const maxAmount = 100000;
const minAmount = 100;
const ethWalletRegex = /^0x[a-fA-F0-9]{40}$/;

export default withIronSessionApiRoute(async function reserveRoute(req, res) {
  if (req.method !== "POST") {
    res
      .status(405)
      .json({ error: "Only POST requests are allowed on this endpoint!" });
  }

  if (!req.session.user) {
    return res.status(401).json({ error: "You are not logged in!" });
  }

  const client = await clientPromise;
  const col = client.db(process.env.MONGODB_DB).collection("users");

  const { amount } = req.body;

  if (amount > maxAmount) {
    return res
      .status(400)
      .json({ error: "You cannot claim more than " + maxAmount + " tokens!" });
  }

  if (amount < minAmount) {
    return res
      .status(400)
      .json({ error: "You cannot claim less than " + minAmount + " tokens!" });
  }

  const user = await col.findOne({ email: req.session.user.email });
  if (!user) {
    return res.status(400).json({ error: "User does not exist!" });
  }

  if (user.reserved) {
    return res
      .status(400)
      .json({ error: "You've already claimed your spot on the whitelist!" });
  }

  col.updateOne(
    { email: req.session.user.email },
    { $set: { reserved: amount } }
  );

  req.session.user = {
    reserved: amount,
    ...req.session.user,
  };
  await req.session.save();

  return res.status(200).json({});
}, sessionOptions);
