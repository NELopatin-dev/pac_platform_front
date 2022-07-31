import styles from "../styles/flatButton.module.css";

export default function FlatButton({ title, round, onclick, active, url }) {
    return (
        <>
            <button
                className={`${active == "true" ? styles.active : null} ${
                    round == "true" ? styles.btn_round : styles.btn
                }`}
                onClick={onclick}
            >
                {title}
            </button>
        </>
    );
}
