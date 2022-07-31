import styles from "../styles/customInput.module.css";

export default function CustomInput({
    type,
    name,
    title,
    placeholder,
    onChange,
    onClick,
    value,
    size,
    inputFontSize,
    inputFontWeight,
}) {
    return (
        <>
            {title ? <p className={`${styles.title}`}>{title}</p> : null}
            <input
                className={`${styles.input} ${
                    "inputFontSize_" + inputFontSize
                }  ${"inputFontWeight_" + inputFontWeight}`}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={value ? value : ""}
                size={size ? size : "auto"}
            />
            {onClick ? (
                <div className={styles.btnOK} onClick={onClick}></div>
            ) : null}

            <style jsx>
                {`
                    .inputFontSize_x-large {
                        font-size: x-large;
                    }

                    .inputFontWeight_600 {
                        font-weight: 600;
                    }
                `}
            </style>
        </>
    );
}
