import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

declare global {
    namespace Express {
        interface User{
            id: number
        }
    }
}
const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email: string, password: string, done) => {
      try {
          const user = getUserByEmailIdAndPassword(email, password);
          return done(null, user) //success case
      }
      catch (error: any){
          //no user was found
          return done(null, false, {
              message: error.message,
          });
      }
    // return user
    //   ? done(null, user)
    //   : done(null, false, {
    //       message: "Your login details are not valid. Please try again",
    //     });

  }
);

/*FIXED (types) 😭*/
passport.serializeUser(function (user: Express.User, done: (err: any, id?: number) => void) {
  done(null, user.id);
});

/*
FIXED (types) 😭
*/
passport.deserializeUser(function (id: number, done: (err: any, user?: Express.User | false | null) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
