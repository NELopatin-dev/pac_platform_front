import styles from "../styles/shadowPanel.module.css";
import CustomInput from "./customInput";
import CustomButton from "./customButton";
import { useState } from "react";

import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";

export default function ShadowPanel({ type, title, position, children }) {
    const [userToken, setUserToken] = useState("userToken");
    const [userLogin, setUserLogin] = useState("userLogin");
    const [userPassword, setUserPassword] = useState("userPassword");

    const [errMess, setErrMess] = useState("errMess");

    const router = useRouter();

    const getUserToken = async () => {
        const response = await fetch(`/api/user/logIn`, {
            method: "POST",
            body: JSON.stringify({
                login: userLogin,
                password: userPassword,
            }),
        });
        const data = await response.json();

        if (data.message) {
            setErrMess(data.message);
            console.log("Error");
        } else {
            setUserToken(data.token);
            setErrMess("");

            cookieCutter.set("userToken", data.token);
            router.push("/platform");
        }
    };

    return (
        <div className={styles.bg}>
            <h1>{title}</h1>

            {type !== "simple" ? (
                // <form method="POST">
                type === "auth" ? (
                    <>
                        <CustomInput
                            title="Логин"
                            type=""
                            placeholder=""
                            onChange={(e) => setUserLogin(e.target.value)}
                        />
                        <CustomInput
                            title="Пароль"
                            type="password"
                            placeholder=""
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <p className={styles.errMess}>
                            {errMess == "errMess" ? null : errMess}
                        </p>
                        <CustomButton
                            title="Войти"
                            onclick={getUserToken}
                        ></CustomButton>
                    </>
                ) : type === "reg" ? (
                    <>
                        <CustomInput title="Логин" type="" placeholder="" />
                        <CustomInput
                            title="Пароль"
                            type="password"
                            placeholder=""
                        />
                        <CustomInput
                            title="Повторите пароль"
                            type="password"
                            placeholder=""
                        />
                        <CustomButton
                            title="Зарегистрироваться"
                            onclick="userReg"
                        ></CustomButton>
                    </>
                ) : null
            ) : (
                // </form>
                <>{children}</>
            )}
        </div>
    );
}
