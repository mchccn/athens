import mongoose, { Document, Model, Schema } from "mongoose";

export interface INote extends Document {
    name: string;
    note: string;
    website: string;
    private: boolean;
    id: string;
}

export const noteSchema = new Schema({
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
    private: {
        type: Boolean,
        required: true,
    },
});

const notes = (mongoose.models.notes as Model<INote>) || mongoose.model<INote>("notes", noteSchema);

export default notes;
