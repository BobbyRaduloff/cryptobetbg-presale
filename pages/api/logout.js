import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function logoutRoute(req, res) {
  req.session.destroy();
  res.status(200).json({});
}, sessionOptions);
