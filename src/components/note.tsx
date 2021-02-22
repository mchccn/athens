import { INote } from "../server/database/models/note";

export default function Note({ name, note, website, due, isPrivate, _id }: INote) {
    return (
        <a href={`/${_id}`}>
            <div></div>
        </a>
    );
}
