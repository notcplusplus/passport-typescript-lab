import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { findOrCreateUser } from '../../models/userModel'
import {Request} from "express";

//to stop bots from doing malicious things to get keys
const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "773f3a4369fa631fda85",
        clientSecret: "9b4be40b64836d9a75956e1ce69051bd37a82157 ",
        callbackURL: "auth/github/callback/",
        passReqToCallback: true
    },

    /* FIX ME 😭 */
    async (
        req: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (err?: (Error | null), user?: Express.User, info?: object) => void) => {
        //if done is called, a session is created. Otherwise sends to failureRedirect
        //pull out the email, username, wrap it in an object and save it to the database
        const user = findOrCreateUser(profile); //make this function. return an object
        return done(null, user);
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
