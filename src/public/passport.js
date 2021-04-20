import { Database, user } from "../database/database.js";
const db = new Database();
//let users = user;
import passport from "passport";
import passport_jwt from "passport-jwt";
import passport_local from "passport-local";
import { env } from "../constants/environment.js";

const ExtractJWT = passport_jwt.ExtractJwt,
  JWTStrategy = passport_jwt.Strategy,
  LocalStrategy = passport_local.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, cb) => {
      const index = await db.checkExistingUser(username);
      if (
        index !== db.NOT_FOUND &&
        (await db.isValidUser(username, password))
      ) {
        const { id, username, email } = user.users[index];
        return cb(
          null,
          { id, username, email },
          { message: "Logged In Successfully" }
        );
      } else return cb(null, false, { message: "Incorrect user or password." });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.SECRET,
    },
    async (jwtPayload, cb) => {
      try {
        console.log(jwtPayload.username)
        const index = await db.checkExistingUser(jwtPayload.username);
        if (index !== db.NOT_FOUND) {
          const { id, username, email } = user.users[index];
          return cb(null, { id, username, email });
        } else {
          return cb(null, false);
        }
      } catch (error) {
        return cb(error, false);
      }
    }
  )
);
