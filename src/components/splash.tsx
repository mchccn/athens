import { useEffect } from "react";
import Rellax from "rellax";

export default function Splash() {
    useEffect(() => {
        new Rellax(".rellax");
    }, []);

    return (
        <div className="splash">
            <header className="header">
                <h2>Athens</h2>
                <a href="/auth">Log in</a>
            </header>
        </div>
    );
}
