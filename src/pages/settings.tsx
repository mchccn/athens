import { GetServerSideProps } from "next";
import Dropdown from "react-dropdown";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import Splash from "../components/splash";

//! Add CSS

interface ISettingsProps {
    user: any;
}

export default function Settings({ user }: ISettingsProps) {
    user = JSON.parse(user);

    return (
        <Layout user={user}>
            {user ? (
                <div className="layout">
                    <Sidebar user={user} />
                    <div className="content">
                        <div className="settings">
                            <div>
                                <img src={user.avatar} alt="" />
                                <div className="theme">
                                    <p>theme</p>
                                    <Dropdown
                                        options={[
                                            {
                                                label: "light",
                                                value: "DEFAULT",
                                            },
                                            {
                                                label: "dark",
                                                value: "DARK",
                                            },
                                            {
                                                label: "discord",
                                                value: "DISCORD",
                                            },
                                            {
                                                label: "crimson",
                                                value: "CRIMSON",
                                            },
                                            {
                                                label: "sky",
                                                value: "SKY",
                                            },
                                            {
                                                label: "neo",
                                                value: "NEO",
                                            },
                                        ]}
                                        value={user.theme}
                                        onChange={async ({ value }) => {
                                            await fetch("/api/user/theme", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                credentials: "include",
                                                body: JSON.stringify({
                                                    theme: value,
                                                }),
                                            });

                                            const theme = document.createElement("link");
                                            theme.rel = "stylesheet";
                                            theme.href = `/themes/${value.toLowerCase()}.css`;
                                            document.head.append(theme);
                                        }}
                                    />
                                </div>
                            </div>
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
