import Head from "next/head";

import LeftMenu from "../../components/leftMenu";
import MainContent from "../../components/mainContent";
import Panel from "../../components/panel";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import ShadowPanel from "../../components/shadowPanel";
import Image from "next/image";

function Home() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [PASgroups, setPASgroups] = useState("PASgroups");

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
                const response = await fetch(`/api/platform/getPASgroup`, {
                    method: "GET",
                });
                const data = await response.json();
                setPASgroups(data);
                setLoading(true);
            }
        } else {
            router.push("/");
        }
    }, []);

    let getPASgroups = (PASgroupId) => {
        let PASgroup_elem = PASgroups.PASgroups.filter((item) => {
            return item._id === PASgroupId;
        });

        return PASgroup_elem;
    };

    return (
        <div className="container">
            <Head>
                <title>ПАС online</title>
                <link rel="icon" href="/icon.png" />
            </Head>

            {PASgroups && loading ? (
                <>
                    <LeftMenu></LeftMenu>

                    <MainContent title="Направления">
                        <div className="leftSide">
                            <p className="OUPtheme">
                                {PASgroups.OUP ? PASgroups.OUP.title : null}
                            </p>
                            <p className="OUPdate">
                                {PASgroups.OUP ? PASgroups.OUP.yearStart : null}
                                -{PASgroups.OUP ? PASgroups.OUP.yearEnd : null}
                            </p>
                        </div>
                        <div className="rightSide">
                            {PASgroups.PASs
                                ? PASgroups.PASs.map((PAS, index) => (
                                      <Panel
                                          title={`ПАС-${index + 1}`}
                                          width="100%"
                                      >
                                          <p className="PAStheme">{PAS.name}</p>
                                          <p className="PASdate">
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
                                          {PAS.PASgroups.map(
                                              (PASgroupId, index) => (
                                                  <p className="groupName">
                                                      {getPASgroups(
                                                          PASgroupId
                                                      ).map(
                                                          (PASgroup) =>
                                                              index +
                                                              1 +
                                                              ". " +
                                                              PASgroup.name
                                                      )}
                                                  </p>
                                              )
                                          )}
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

                .PAStheme {
                    font-weight: 600;
                    font-size: large;
                }

                .PASdate {
                    font-weight: 400;
                    font-size: medium;
                    margin-bottom: var(--margin);
                }

                .groupName {
                    font-weight: 400;
                    font-size: large;
                    margin-left: var(--margin-max);
                }
            `}</style>
        </div>
    );
}

export default Home;
