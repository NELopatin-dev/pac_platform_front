import styles from "../styles/colorBlurBG.module.css";

export default function ColorBlurBG({ children }) {
    return <div className={styles.bg}>{children}</div>;
}
