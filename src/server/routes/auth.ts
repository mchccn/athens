import express from "express";
import fetch from "node-fetch";
import passport from "passport";
import { Strategy } from "passport-github";
import users from "../database/user";

passport.serializeUser(async (user, done) => {
    //@ts-ignore
    return done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await users.findById(id);

    if (user) done(null, user);
});

passport.use(
    new Strategy(
        {
            clientID: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/auth/redirect",
            scope: ["user:email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const emails = await (
                    await fetch("https://api.github.com/user/emails", {
                        headers: {
                            Authorization: "token " + accessToken,
                        },
                    })
                ).json();

                const email = profile.emails?.length
                    ? profile.emails?.[0].value
                    : emails.find((e: any) => e.primary).email || undefined;

                if (!email) throw new Error("No email detected.");

                const user = await users.findById(email);

                if (!user) {
                    const newUser = await users.create({
                        _id: email,
                        username: profile.displayName || profile.username,
                        avatar:
                            profile.photos?.[0].value ||
                            //@ts-ignore
                            profile._json.avatar_url ||
                            "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
                    });

                    return done(undefined, newUser);
                }

                return done(undefined, user);
            } catch (error) {
                console.error(error);
                return done(error, undefined);
            }
        }
    )
);

const auth = express.Router();

auth.get("/", passport.authenticate("github"));

auth.get("/redirect", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => res.redirect("/"));

auth.get("/logout", (req, res) => {
    if (req.user) req.logOut();

    return res.redirect("/");
});

auth.get("*", (req, res) => res.redirect("/auth"));

export default auth;
