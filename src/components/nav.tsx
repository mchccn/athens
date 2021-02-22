interface INavProps {
    children: React.ReactNode;
}

export default function Nav({ children }: INavProps) {
    return (
        <nav
            style={{
                height: 66,
                backgroundColor: "var(--clr-top)",
                color: "var(--clr-light-grey)",
                padding: "0.75rem",
                display: "flex",
                alignItems: "center",
            }}
        >
            {children}
        </nav>
    );
}
