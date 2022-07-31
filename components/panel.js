import styles from "../styles/panel.module.css";

import Link from "next/link";

export default function Panel(props) {
    let { children, width, height, display, center, title } = props;
    let margin = center ? "0 auto" : null;

    return (
        <>
            {title ? <p className={styles.title}>{title}</p> : null}
            <div
                className={styles.container}
                style={{
                    width: width,
                    height: height,
                    display: display,
                    margin: margin,
                }}
            >
                {children}
            </div>
        </>
    );
}
