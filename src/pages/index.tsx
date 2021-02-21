import { GetServerSideProps } from "next";
import Layout from "../components/layout";

interface IIndexProps {
    user: string;
}

export default function Index({ user }: IIndexProps) {
    user = JSON.parse(user);

    return (
        <Layout user={user}>
            <div>
                <h1>ur logged in</h1>
                <h2>ur logged in</h2>
                <h3>ur logged in</h3>
                <h4>ur logged in</h4>
                <p>ur logged in</p>
            </div>
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
