interface INProps {
    width: number;
    height: number;
    speed: number;
    color: string;
}

export default function N({ height, speed, width, color }: INProps) {
    return (
        <div
            style={{
                width,
                height,
                backgroundColor: color,
            }}
            className="rellax"
            data-rellax-speed={speed}
        ></div>
    );
}
