import mongo from "connect-mongo";
import { config as dotenv } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import next from "next";
import passport from "passport";
import connect from "./server/database/connect";

dotenv();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

export { dev, port, app, handle };

(async () => {
    try {
        const auth = (await import("./server/routes/auth")).default;
        const api = (await import("./server/routes/api")).default;

        const connection = await connect();
        const MongoStore = mongo(session);

        await app.prepare();

        const server = express();

        const requireAuth = (req: Request, res: Response, next: NextFunction) => {
            if (!req.user) return res.redirect("/");

            return next();
        };

        server.use(
            session({
                name: "athens",
                secret: "some random secret",
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                    sameSite: "lax",
                    secure: !dev,
                },
                store: new MongoStore({
                    mongooseConnection: connection,
                }),
                saveUninitialized: false,
                resave: false,
            })
        );

        server.use(passport.initialize());
        server.use(passport.session());

        server.use(express.json());
        server.use(
            express.urlencoded({
                extended: true,
            })
        );

        server.use("/auth", auth);
        server.use("/api", api);

        server.use("/settings", requireAuth);
        server.use("/premium", requireAuth);
        server.use("/notes", requireAuth);
        server.use("/outlines", requireAuth);
        server.use("/notes/:id", requireAuth);
        server.use("/outlines/:id", requireAuth);

        server.get("*", (req, res) => handle(req, res));

        server.listen(port, () => console.log("Server listening on port 3000!"));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
