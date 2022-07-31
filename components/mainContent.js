import styles from "../styles/mainContent.module.css";

export default function MainContent({ children, title }) {
    return (
        <>
            <div className={styles.bg}>
                <div className={styles.titleContent}>
                    <p>{title}</p>
                </div>
                {children}
            </div>
        </>
    );
}
