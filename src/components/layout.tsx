import Head from "next/head";
import Splash from "./splash";

interface ILayoutProps {
    children: React.ReactNode;
    title?: string;
    user: any;
}

export default function Layout({ children, title, user }: ILayoutProps) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />
                <meta name="author" content="" />
                <meta name="copyright" content="" />
                <meta name="robots" content="follow" />
                <meta name="theme-color" content="#6366f1" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="" />
                <meta property="og:site_name" content="Athens" />
                <meta property="og:keywords" content="" />
                <meta property="og:locale" content="en-US" />
                <meta property="og:title" content="Athens" />
                <meta property="og:description" content="" />
                <meta property="og:image" content="" />
                <meta property="og:image" content="" />
                <title>{title ? `Athens | ${title}` : "Athens"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {user ? <div className="app">{children}</div> : <Splash />}
        </div>
    );
}
