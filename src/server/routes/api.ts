import express from "express";
import notes from "../database/models/note";
import users from "../database/models/user";

const api = express.Router();

api.post("/new", async (req, res) => {
    try {
        if (!req.user) return res.sendStatus(403);

        const { name, note, website, due, isPrivate } = req.body;

        if (!name || name.length > 128) return res.sendStatus(400);
        if (!note || note.length > 4096) return res.sendStatus(400);
        if (!website || website.length > 512) return res.sendStatus(400);

        await notes.create({
            //@ts-ignore
            author: req.user._id,
            name,
            note,
            website,
            due: new Date(due),
            //@ts-ignore
            isPrivate: req.user.premium.includes("PRIVACY") || req.user.premium.includes("PROFESSIONAL") ? isPrivate : false,
        });

        return res.redirect("/");
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
});

api.post("/user/theme", async (req, res) => {
    try {
        if (!req.user) return res.sendStatus(403);

        const { theme } = req.body;

        if (!theme) return res.sendStatus(400);

        if (!["DEFAULT", "DARK", "DISCORD", "CRIMSON", "SKY", "NEO"].includes(theme)) return res.sendStatus(400);

        //@ts-ignore
        await users.findByIdAndUpdate(req.user._id, {
            theme,
        });

        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
});

export default api;
