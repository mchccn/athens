import mongoose from "mongoose";

export default async function connect() {
    try {
        await mongoose.connect(
            process.env.MONGO_URI!,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                keepAlive: true,
            },
            (err) => {
                if (err) return console.error(err.stack || err.message);
                console.log("Connected to mongo");
            }
        );

        mongoose.connection.on("connect", () => {
            console.log("Mongoose is connected");
        });

        mongoose.connection.on("error", (err) => {
            if (err) console.error(err.stack || err.message);
        });

        mongoose.connection.on("disconnect", () => {
            console.error("Mongoose was disconnected");
        });

        mongoose.connection.on("reconnect", () => {
            console.log("Mongoose has reconnected");
        });

        return mongoose.connection;
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
