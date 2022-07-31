import Head from "next/head";

import LeftMenu from "../../../components/leftMenu";
import MainContent from "../../../components/mainContent";
import Panel from "../../../components/panel";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import cookieCutter from "cookie-cutter";
import ShadowPanel from "../../../components/shadowPanel";
import Image from "next/image";
import FlatButton from "../../../components/flatButton";
import Link from "next/link";

function Home() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [PASgroupsMembers, setPASgroupsMembers] = useState();
    const [userInfo, setUserInfo] = useState(false);
    const [currGroup, setCurrGroup] = useState(0);

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
                const responseUI = await fetch(`/api/user/getUserInfo`, {
                    method: "POST",
                    body: JSON.stringify({
                        token: cookieCutter.get("userToken"),
                    }),
                });
                const dataUI = await responseUI.json();
                setUserInfo(dataUI);

                if (dataUI.tutor) {
                    const response = await fetch(
                        `/api/tutor/getTutorPASgroup`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                token: cookieCutter.get("userToken"),
                            }),
                        }
                    );
                    const data = await response.json();
                    setPASgroupsMembers(data);

                    setLoading(true);
                } else {
                    router.push("/platform/rating");
                }
            }
        } else {
            router.push("/");
        }
    }, []);

    const selectGroup = async (index) => {
        setCurrGroup(index);
    };

    return (
        <div className="container">
            <Head>
                <title>ПАС online</title>
                <link rel="icon" href="/icon.png" />
            </Head>

            {PASgroupsMembers && loading ? (
                <>
                    <LeftMenu></LeftMenu>

                    <MainContent title="Рейтинг">
                        <div className="leftSide">
                            {PASgroupsMembers.PASgroups
                                ? PASgroupsMembers.PASgroups.map(
                                      (group, index) => (
                                          <>
                                              <FlatButton
                                                  title={group.name}
                                                  active={
                                                      currGroup == index
                                                          ? "true"
                                                          : "false"
                                                  }
                                                  round="true"
                                                  onclick={
                                                      currGroup == index
                                                          ? null
                                                          : () => {
                                                                selectGroup(
                                                                    index
                                                                );
                                                            }
                                                  }
                                              />
                                          </>
                                      )
                                  )
                                : null}
                        </div>
                        <div className="rightSide">
                            <div className="member-group">
                                {PASgroupsMembers.members[
                                    PASgroupsMembers.PASgroups[currGroup]._id
                                ]
                                    ? PASgroupsMembers.members[
                                          PASgroupsMembers.PASgroups[currGroup]
                                              ._id
                                      ].map((member) => (
                                          <Link
                                              href={
                                                  "/platform/tutorRating/" +
                                                  member._id
                                              }
                                          >
                                              <p className="member-name">
                                                  {member.lastName +
                                                      " " +
                                                      member.firstName}
                                              </p>
                                          </Link>
                                      ))
                                    : null}
                            </div>
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
                .member-group {
                    position: relative;
                }

                .member-name {
                    cursor: pointer;
                    width: max-content;
                    color: var(--black);
                    text-decoration: none;
                    padding: var(--padding-min);
                    transition: all 0.5s;
                    border-radius: var(--border-radius);
                }

                .member-name:hover {
                    transform: scale(1.1);
                }

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
