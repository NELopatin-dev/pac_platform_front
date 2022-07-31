import Head from "next/head";

import { RadarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

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
import CompitionsPolarArea from "../../components/compitionsPolarArea";
import CompitionsRadar from "../../components/compitionsRadar";

function Home() {
    const router = useRouter();

    const [userInfo, setUserInfo] = useState("userInfo");
    const [userGroups, setUserGroups] = useState("userInfo");
    const [loading, setLoading] = useState(false);

    const userLogOut = async () => {
        cookieCutter.set("userToken", "0", { expires: new Date(0) });
        router.push("/");
    };

    const state = {
        data: [],
        options: {
            title: "Развитие универсальных компитенций",
            radar: {
                axes: {
                    angle: "compitionName",
                    value: "points",
                },
            },
            data: {
                groupMapsTo: "compitionId",
            },
            height: "800px",
        },
    };

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
                const response = await fetch(`/api/user/getUserInfo`, {
                    method: "POST",
                    body: JSON.stringify({
                        token: cookieCutter.get("userToken"),
                    }),
                });
                const data = await response.json();
                setUserInfo(data);

                if (data.tutor) {
                    const groupRes = await fetch(
                        `/api/tutor/getTutorPASgroup`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                token: cookieCutter.get("userToken"),
                            }),
                        }
                    );
                    const groupData = await groupRes.json();
                    setUserGroups(groupData);
                }
            }

            setLoading(true);
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

            {userInfo && loading ? (
                <>
                    <LeftMenu></LeftMenu>

                    <MainContent title="Профиль">
                        <div className="leftSide">
                            <Panel width="100%">
                                <div className="persanalInfo">
                                    {/* <div className="avatar_container">
                            <div className="avatar"></div>
                        </div> */}
                                    <div className="info">
                                        <p className="firstName">
                                            {userInfo.lastName}
                                        </p>
                                        <p className="lastName">
                                            {userInfo.firstName}
                                        </p>
                                        <p className="status">
                                            {userInfo.tutor
                                                ? userInfo.pac
                                                    ? "Сотрудник ПАЦ"
                                                    : "Тьютор"
                                                : "Студент"}
                                        </p>
                                    </div>
                                    <div className="topPanel">
                                        <FlatButton
                                            title="Выйти"
                                            round="true"
                                            onclick={userLogOut}
                                        ></FlatButton>
                                    </div>
                                </div>
                            </Panel>
                            <div className="content_container">
                                <div className="groupsInfo">
                                    <p className="group">
                                        <span>Учебная группа:</span>
                                        <br />{" "}
                                        {userInfo.studyGroupFullName +
                                            " (" +
                                            userInfo.studyGroupName +
                                            ")"}
                                    </p>
                                    <p className="group">
                                        <span>Направление на ПАС:</span>
                                        <br />
                                        {userInfo.tutor
                                            ? userGroups.PASgroups.map(
                                                  (pasgroup) => (
                                                      <>
                                                          {pasgroup.name}
                                                          <br />
                                                      </>
                                                  )
                                              )
                                            : userInfo.PASGroup.map(
                                                  (pasgroup) => (
                                                      <>
                                                          {pasgroup}
                                                          <br />
                                                      </>
                                                  )
                                              )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="rightSide">
                            <CompitionsPolarArea
                                userCompitions={userInfo.compitions}
                            />
                            {/* <CompitionsRadar
                                userCompitions={userInfo.compitions}
                            /> */}
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
                .persanalInfo {
                    width: 100%;
                }

                .topPanel,
                .avatar_container,
                .info {
                    display: inline-block;
                    vertical-align: top;
                }

                .avatar_container {
                    width: 200px;
                    height: 200px;
                    position: relative;
                    margin-right: var(--margin-max);
                }

                .avatar_container > .avatar {
                    width: 190px;
                    height: 190px;
                    position: absolute;
                    left: 5px;
                    top: 5px;
                    border: 10px solid var(--blue);
                    border-radius: 50%;
                    background: url("/img/avatars/default.svg");
                    background-size: cover;
                    background-color: var(--white);
                }

                .info {
                    width: calc(100% - var(--margin-min) - 100px);
                }

                .info > .firstName,
                .info > .lastName {
                    font-weight: 600;
                    font-size: xx-large;
                }

                .info > .status {
                    padding-top: var(--padding-min);
                    font-size: medium;
                }

                .topPanel {
                    position: relative;
                    text-align: right;
                }

                .content_container {
                    padding: 0 var(--padding);
                }

                .groupsInfo > .group {
                    margin-bottom: var(--padding-min);
                    font-size: large;
                }

                .groupsInfo > .group > span {
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}

export default Home;
