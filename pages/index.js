import Head from "next/head";
import { useEffect } from "react";
import cookieCutter from "cookie-cutter";

import ColorBlurBG from "../components/colorblurbg";
import ShadowPanel from "../components/shadowPanel";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    useEffect(async () => {
        if (cookieCutter.get("userToken")) {
            const response = await fetch(`/api/user/check`, {
                method: "POST",
                body: JSON.stringify({
                    token: cookieCutter.get("userToken"),
                }),
            });
            const data = await response.json();

            if (data.auth === true) {
                router.push("/platform");
            } else {
                cookieCutter.set("userToken", "0", { expires: new Date(0) });
            }
        }
    }, []);

    return (
        <div className="container">
            <Head>
                <title>ПАС online</title>
                <link rel="icon" href="/icon.png" />
            </Head>

            <ColorBlurBG>
                <main>
                    <ShadowPanel
                        type="auth"
                        title="Авторизация"
                        position="center"
                    ></ShadowPanel>
                </main>
            </ColorBlurBG>
        </div>
    );
}
