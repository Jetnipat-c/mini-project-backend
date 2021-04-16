import { Database, user } from "../database/database.js";
const db = new Database();
let users = user;
console.log("user >> ", users);
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
      console.log("User: ", username, password);
      const index = await db.checkExistingUser(username);
      console.log("Index: ", index);
      if (
        index !== db.NOT_FOUND &&
        (await db.isValidUser(username, password))
      ) {
        console.log("asdasd");
        const { id, username, email } = users.users[index];
        console.log(" cb : ");
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
    (jwtPayload, cb) => {
      try {
        // find the user in db if needed
        console.log("jwt strategy");
        const index = db.checkExistingUser(jwtPayload.username);
        if (index !== db.NOT_FOUND) {
          // Strip password out
          const { id, username, email } = users.users[index];
          //Return to caller via req.user
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
