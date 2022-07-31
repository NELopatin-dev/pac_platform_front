import Head from "next/head";

import LeftMenu from "../../components/leftMenu";
import MainContent from "../../components/mainContent";
import Panel from "../../components/panel";
import FlatButton from "../../components/flatButton";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import ShadowPanel from "../../components/shadowPanel";
import Image from "next/image";

function Home() {
    const router = useRouter();

    const [Calendar, setCalendar] = useState("Calendar");
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
                const response = await fetch(`/api/platform/getCalendar`, {
                    method: "GET",
                });
                const data = await response.json();
                setLoading(true);
                setCalendar(data);
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

            {Calendar && loading ? (
                <>
                    <LeftMenu></LeftMenu>

                    <MainContent title="Календарь">
                        <div className="leftSide">
                            <p className="OUPtheme">
                                {Calendar.OUP ? Calendar.OUP.title : null}
                            </p>
                            <p className="OUPdate">
                                {Calendar.OUP ? Calendar.OUP.yearStart : null}-
                                {Calendar.OUP ? Calendar.OUP.yearEnd : null}
                            </p>
                        </div>
                        <div className="rightSide">
                            {Calendar.PASs
                                ? Calendar.PASs.map((PAS, index) => (
                                      <Panel
                                          title={`ПАС-${index + 1}`}
                                          width="100%"
                                      >
                                          <p className="theme">{PAS.name}</p>
                                          <p className="date">
                                              {new Date(
                                                  PAS.dateStart
                                              ).toLocaleDateString(
                                                  "ru-RU"
                                              )}{" "}
                                              -{" "}
                                              {new Date(
                                                  PAS.dateEnd
                                              ).toLocaleDateString("ru-RU")}
                                          </p>
                                      </Panel>
                                  ))
                                : null}
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
