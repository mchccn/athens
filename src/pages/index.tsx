import { GetServerSideProps } from "next";
import { useState } from "react";
import Dropdown from "react-dropdown";
import Layout from "../components/layout";
import Nav from "../components/nav";
import Note from "../components/note";
import Sidebar from "../components/sidebar";
import Splash from "../components/splash";
import notes from "../server/database/models/note";

interface IIndexProps {
    user: any;
    notes: any;
}

type SortBy = "NEWEST" | "OLDEST" | "RELEVANT" | "DUE_DATE";

export default function Index({ user, notes }: IIndexProps) {
    user = JSON.parse(user);
    notes = JSON.parse(notes);

    const [search, setSearch] = useState("");

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
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                            />
                            <div className="control">
                                <p>sort by</p>
                                <Dropdown
                                    options={[
                                        {
                                            label: "newest",
                                            value: "NEWEST",
                                        },
                                        {
                                            label: "oldest",
                                            value: "OLDEST",
                                        },
                                        {
                                            label: "relevant",
                                            value: "RELEVANT",
                                        },
                                        {
                                            label: "due date",
                                            value: "DUE_DATE",
                                        },
                                    ]}
                                    value={"newest"}
                                />
                            </div>
                        </Nav>
                        <div>
                            <div>{notes.map(Note)}</div>
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
            //@ts-ignore
            notes: ctx.req.user ? JSON.stringify(await notes.find({ author: ctx.req.user._id })) : null,
        },
    };
};
