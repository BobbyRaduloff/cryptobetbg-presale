import { withIronSessionApiRoute } from "iron-session/next";
import clientPromise from "../../lib/mongodb";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function userRoute(req, res) {
  console.log(req.session.user);

  if (req.session.user) {
    if (req.session.user.isLoggedIn) {
      const client = await clientPromise;
      const col = client.db(process.env.MONGODB_DB).collection("users");
      const user = await col.findOne({ email: req.session.user.email });

      req.session.user = {
        isLoggedIn: true,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        reserved: user.reserved,
      };
      await req.session.save();

      res.status(200).json(req.session.user);
    } else {
      req.session.user = {
        isLoggedIn: false,
      };
      await req.session.save();

      res.status(200).json(req.session.user);
    }
  } else {
    req.session.user = {
      isLoggedIn: false,
    };
    await req.session.save();

    res.status(200).json(req.session.user);
  }
}, sessionOptions);
