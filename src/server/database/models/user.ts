import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
    _id: string;
    username: string;
    avatar: string;
    theme: "DEFAULT" | "DARK" | "DISCORD" | "CRIMSON" | "SKY" | "NEO";
    premium: ("PRIVACY" | "NOTES" | "WRITER" | "PROFESSIONAL")[];
    isSubscribed: boolean;
}

export const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    theme: {
        type: String,
        enum: ["DEFAULT", "DARK", "DISCORD", "CRIMSON", "SKY", "NEO"],
        default: "DEFAULT",
    },
    premium: {
        type: [String],
        default: [],
    },
    isSubscribed: {
        type: Boolean,
        default: false,
    },
});

const users = (mongoose.models.users as Model<IUser>) || mongoose.model<IUser>("users", userSchema);

export default users;
