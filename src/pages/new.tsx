import { GetServerSideProps } from "next";
import { useState } from "react";
import DatePicker from "react-datepicker";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Sidebar from "../components/sidebar";
import Splash from "../components/splash";

//! Add CSS

interface INewProps {
    user: string;
}

export default function New({ user }: INewProps) {
    user = JSON.parse(user);

    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [website, setWebsite] = useState("");
    const [due, setDue] = useState(new Date());
    const [isPrivate, setIsPrivate] = useState(false);

    return (
        <Layout user={user}>
            {user ? (
                <div className="layout">
                    <Sidebar user={user} />
                    <div className="content">
                        <Nav>
                            <input
                                className="search"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter the note's name..."
                                maxLength={128}
                            />
                        </Nav>
                        <div>
                            <textarea
                                className="note-editor"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Write your note..."
                                maxLength={4096}
                            ></textarea>
                            <input
                                className="site"
                                type="text"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder="A special website..."
                                maxLength={512}
                            />
                            <DatePicker selected={due} onChange={(d) => setDue(Array.isArray(d) ? d[0] : d || new Date())} />
                            <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
                            {name && note && website ? (
                                <button
                                    className="new-note"
                                    onClick={async () => {
                                        await fetch("/api/new", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            credentials: "include",
                                            body: JSON.stringify({
                                                name,
                                                note,
                                                website,
                                                due,
                                                isPrivate,
                                            }),
                                        });
                                        const a = document.createElement("a");
                                        a.href = "/";
                                        a.click();
                                    }}
                                >
                                    Create
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : (
                <Splash />
            )}
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            //@ts-ignore
            user: ctx.req.user ? JSON.stringify(ctx.req.user) : null,
        },
    };
};
