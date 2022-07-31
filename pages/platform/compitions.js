import Head from "next/head";
import Image from "next/image";
import parse from "html-react-parser";

import LeftMenu from "../../components/leftMenu";
import MainContent from "../../components/mainContent";
import Panel from "../../components/panel";
import FlatButton from "../../components/flatButton";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import ShadowPanel from "../../components/shadowPanel";

function Home() {
    const router = useRouter();

    const [Compitions, setCompitions] = useState(null);
    const [CurrCompition, setCurrCompition] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        if (cookieCutter.get("userToken")) {
            const response = await fetch(`/api/user/check`, {
                method: "POST",
                body: JSON.stringify({
                    token: cookieCutter.get("userToken"),
                }),
            });
            const data = await response.json();

            if (data.auth === false) {
                cookieCutter.set("userToken", "0", { expires: new Date(0) });
                router.push("/");
            } else {
                const response = await fetch(`/api/platform/getCompitions`, {
                    method: "GET",
                });
                const data = await response.json();
                setLoading(true);
                setCompitions(data.compitions);
            }
        } else {
            router.push("/");
        }
    }, []);

    return (
        <div className="container">
            <Head>
                <title>ПАС online</title>
                <link rel="icon" href="/icon.png" />
            </Head>

            {Compitions && loading ? (
                <>
                    <LeftMenu></LeftMenu>

                    <MainContent title="Компетенции">
                        <div className="leftSide">
                            {Compitions.map((compition, index) => (
                                <FlatButton
                                    title={compition.title}
                                    active={
                                        CurrCompition == index
                                            ? "true"
                                            : "false"
                                    }
                                    round="true"
                                    onclick={
                                        CurrCompition == index
                                            ? null
                                            : () => {
                                                  setCurrCompition(index);
                                              }
                                    }
                                />
                            ))}
                        </div>
                        <div className="rightSide">
                            <Panel
                                title={Compitions[CurrCompition].title}
                                width="100%"
                            >
                                <p>
                                    {parse(
                                        Compitions[CurrCompition].description
                                    )}
                                </p>
                            </Panel>
                        </div>
                    </MainContent>
                </>
            ) : (
                <>
                    <ShadowPanel type="simple" position="center">
                        <main className="preloaderIcon">
                            <Image src="/icon.png" width={300} height={300} />
                        </main>
                    </ShadowPanel>
                </>
            )}

            <style jsx>{`
                .OUPtheme {
                    font-weight: 900;
                    font-size: x-large;
                }

                .OUPdate {
                    font-weight: 400;
                    font-size: large;
                }

                .theme {
                    font-weight: 600;
                    font-size: large;
                }

                .date {
                    font-weight: 400;
                    font-size: medium;
                }
            `}</style>
        </div>
    );
}

export default Home;
