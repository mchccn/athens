import { useEffect, useRef, useState } from "react";
import styles from "../styles/sidebar.module.css";

interface ISidebarProps {
    user: any;
}

export default function Sidebar({ user }: ISidebarProps) {
    const sidebar = useRef<null | HTMLElement>(null);

    const [width, setWidth] = useState(0);

    const [open, setOpen] = useState(false);
    const [dontMovePls, setDontMovePls] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setDontMovePls(false);
        }, 250);
    }, []);

    useEffect(() => {
        setWidth(window.innerWidth);

        //@ts-ignore
        const manageClose = (e: MouseEvent) => (!sidebar.current?.contains(e.target) ? setOpen(false) : undefined);

        const updateWidth = () => setWidth(window.innerWidth);

        document.addEventListener("click", manageClose);
        window.addEventListener("resize", updateWidth);

        return () => {
            document.removeEventListener("click", manageClose);
            window.removeEventListener("resize", updateWidth);
        };
    });

    return (
        <aside className={styles.sidebar + (open ? " " + styles.open : "")} ref={sidebar}>
            <div
                className={styles.content}
                style={{
                    transform: !open && width < 800 ? "translateX(-100%)" : "none",
                    transition: dontMovePls ? "none" : "0.25s transform ease",
                }}
            >
                <div>
                    <div className={styles.profile}>
                        <div>
                            <a href="/">
                                <img src={user.avatar} alt="" />
                            </a>
                        </div>
                        <h4>{user.username}</h4>
                        <p>{user._id}</p>
                    </div>
                    <div>
                        <a href="/explore" className={styles.explore}>
                            🔍 Explore
                        </a>
                        <a href="/new" className={styles.new}>
                            ➕ New Note
                        </a>
                    </div>
                    <div>
                        <a href="/settings" className={styles.settings}>
                            ⚙️ Settings
                        </a>
                        <a href="/auth/logout" className={styles.logout}>
                            🚪 Log out
                        </a>
                    </div>
                    <div>
                        <a href="/premium" className={styles.settings}>
                            👑 Premium
                        </a>
                    </div>
                </div>
            </div>
            {width < 800 ? <div className={styles.trigger} onClick={() => setOpen(!open)}></div> : null}
        </aside>
    );
}
