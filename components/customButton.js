import styles from "../styles/customButton.module.css";

export default function CustomButton({ title, onclick, url }) {
    return (
        <>
            <button className={styles.btn} onClick={onclick}>
                {title}
            </button>
        </>
    );
}
