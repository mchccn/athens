import { INote } from "../server/database/models/note";
import styles from "../styles/note.module.css";

//! Add markdown parser

export default function Note({ name, note, website, due, isPrivate, _id }: INote) {
    return (
        <a href={`/${_id}`} key={Math.random()}>
            <div className={styles.note}>
                <h3>{name}</h3>
                <p>{note.length > 256 ? note.slice(0, 256 - 3) + "..." : note}</p>
                <a href={website}>{website}</a>
                <p className={new Date(due).getTime() < Date.now() ? styles.overdue : styles.due}>
                    due {new Date(due).toLocaleDateString()}
                </p>
                <p>is private: {isPrivate}</p>
            </div>
        </a>
    );
}
