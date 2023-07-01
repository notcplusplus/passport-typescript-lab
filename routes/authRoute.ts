import express, {Request} from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

// --- Github login Endpoint
router.get('/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get("/login", forwardAuthenticated, (req, res) => {
    // @ts-ignore
    const errorMessage = req.session.messages;
    res.render("login", {errorMessage});
    // @ts-ignore
    req.session.messages = [] //doesn't work
})

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
        failureMessage: true //using a boolean can display different things based on the error
        /* FIXED: 😭 failureMsg needed when login fails req.session.messages
            but req.session.messages can't be cleared
       */
    })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
