import { INote } from "../server/database/models/note";
import styles from "../styles/note.module.css";

export default function Note({ name, note, website, due, isPrivate, _id }: INote) {
    return (
        <a href={`/${_id}`} key={Math.random()} className={styles.note}>
            <div>
                <h3>{name}</h3>
                <a href={website}>{website}</a>
                <p className={new Date(due).getTime() < Date.now() ? styles.overdue : styles.due}>
                    due {new Date(due).toLocaleDateString()}
                </p>
                <p>{isPrivate ? "🔒" : "🌐"}</p>
            </div>
        </a>
    );
}
