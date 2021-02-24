import mongoose, { Document, Model, Schema } from "mongoose";

export interface INote extends Document {
    author: string;
    name: string;
    note: string;
    website: string;
    due: Date;
    isPrivate: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const noteSchema = new Schema(
    {
        author: {
            type: String,
            required: true,
        },
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
        due: {
            type: Date,
            required: true,
        },
        isPrivate: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const notes = (mongoose.models.notes as Model<INote>) || mongoose.model<INote>("notes", noteSchema);

export default notes;
