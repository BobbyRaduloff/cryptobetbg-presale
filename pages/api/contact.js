import clientPromise from "../../lib/mongodb";
import * as isemail from "isemail";

export default async function handler(req, res) {
  const client = await clientPromise;
  const coll = client.db(process.env.MONGODB_DB).collection("queries");

  const body = req.body;

  if (!body.email || !body.question) {
    return res.status(400).json({ error: "Please fill out all the fields!" });
  }

  if (!isemail.validate(body.email, { minDomainAtoms: 2 })) {
    return res.status(400).json({ error: "Please enter a valid email!" });
  }

  await coll.insertOne(body);

  return res.status(200).json({});
}
