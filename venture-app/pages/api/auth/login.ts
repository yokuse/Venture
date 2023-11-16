import { prisma } from "../../../lib/prisma";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import type { User } from "./user";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { verifyTOTP } from "../../../lib/totp";
import argon2 from "argon2";
import logger from "../../../Logger";
import { loginSchema } from "../../../schemas/loginSchema";
import { validate } from "../../../middleware/loginValidate";

const handler = withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    logger.notice("Non POST Request made to login API");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const accountData = req.body;
  const userDetails = await prisma.user.findUnique({
    where: {
      email: accountData.email,
    },
    select: {
      password: true,
      mfaSecret: true,
    },
  });

  if (await argon2.verify(userDetails!.password, accountData.password)) {
    if (verifyTOTP(accountData.mfa, userDetails!.mfaSecret)) {
      const user = { isLoggedIn: true, email: accountData.email } as User;
      req.session.user = user;
      await req.session.save();
      logger.info(
        "User with email: " + accountData.email + " login successfully"
      );
      return res.json(user);
    }
  }
  logger.notice("User with email: " + accountData.email + " login failed");
  return res.status(500).send({ login: false });
}

export default validate(loginSchema, handler);
