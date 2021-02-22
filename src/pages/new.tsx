import { GetServerSideProps } from "next";
import { useState } from "react";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Sidebar from "../components/sidebar";
import Splash from "../components/splash";

interface IIndexProps {
    user: string;
}

export default function Index({ user }: IIndexProps) {
    user = JSON.parse(user);

    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [site, setSite] = useState("");

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
                                value={site}
                                onChange={(e) => setSite(e.target.value)}
                                type="text"
                                maxLength={512}
                            />
                            <input className="date" type="date" />
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
