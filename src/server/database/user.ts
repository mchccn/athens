import mongoose, { Document, Model, Schema } from "mongoose";

interface INote {
    name: string;
    note: string;
    website: string;
    private: boolean;
    id: string;
}

interface IOutline {
    name: string;
    outline: string;
    private: boolean;
    id: string;
}

interface IUser extends Document {
    _id: string;
    username: string;
    avatar: string;
    premium: ("PRIVACY" | "NOTES" | "OUTLINES" | "WRITER" | "PROFESSIONAL")[];
    isSubscribed: boolean;
    notes: INote[];
    outlines: IOutline[];
}

const schema = new Schema({
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
    premium: {
        type: [String],
        default: [],
    },
    isSubscribed: {
        type: Boolean,
        default: false,
    },
    notes: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                note: {
                    type: String,
                    required: true,
                },
                website: {
                    type: String,
                    required: true,
                },
                private: {
                    type: Boolean,
                    required: true,
                },
                id: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [],
    },
    outlines: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                outline: {
                    type: String,
                    required: true,
                },
                private: {
                    type: Boolean,
                    required: true,
                },
                id: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: [],
    },
});

const users = (mongoose.models.users as Model<IUser>) || mongoose.model<IUser>("users", schema);

export default users;
