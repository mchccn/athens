import { useEffect } from "react";
import Rellax from "rellax";
import N from "./n";

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
            <main className="main">
                <div>
                    <h1>
                        Note taking, <br />
                        <span className="purple">redefined</span>
                    </h1>
                </div>
                <N color="var(--clr-main)" height={60} width={80} speed={2} />
            </main>
            {new Array(100).fill("").map(() => (
                <br key={Math.random()} />
            ))}
        </div>
    );
}
