import Head from "next/head";

import LeftMenu from "../../components/leftMenu";
import MainContent from "../../components/mainContent";
import Rating from "../../components/rating";
import FlatButton from "../../components/flatButton";
import cookieCutter from "cookie-cutter";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ShadowPanel from "../../components/shadowPanel";
import Image from "next/image";

export default function Home() {
    const router = useRouter();

    const [rating, setRating] = useState(null);
    const [currPAS, setCurrPAS] = useState(0);
    const [userId, setUserId] = useState(0);
    const [OUPnPASs, setOUPnPASs] = useState("");
    const [loading, setLoading] = useState(false);

    let sumUserPoints = 0;
    let sumMaxPoints = 0;

    const getCurrRating = async (PASid, user_id = userId) => {
        console.log(user_id);

        const resRating = await fetch(`/api/platform/getRating`, {
            method: "POST",
            body: JSON.stringify({
                PASid: PASid,
                user_id,
            }),
        });

        return resRating.json();
    };

    const selectPAS = async (index) => {
        setCurrPAS(index);
        setRating(await getCurrRating(OUPnPASs.PASs[index]._id));
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
                setUserId(data.id);

                const resOUPnPASs = await fetch(`/api/platform/getCalendar`, {
                    method: "GET",
                });
                const dataOUPnPASs = await resOUPnPASs.json();
                setOUPnPASs(dataOUPnPASs);

                const dataRating = await getCurrRating(
                    dataOUPnPASs.PASs[currPAS]._id,
                    data.id
                );
                setRating(dataRating);
            }
            setLoading(true);
        } else {
            router.push("/");
        }
    }, []);

    return (
        <>
            <Head>
                <title>ПАС online</title>
                <link rel="icon" href="/icon.png" />
            </Head>

            {loading ? (
                <>
                    <LeftMenu></LeftMenu>

                    {rating.rating.map((day) => {
                        day.map((criteriaGroup) => {
                            criteriaGroup.criteria.map((criteria) => {
                                sumMaxPoints +=
                                    criteria.maxMark * criteria.weightMark;
                                sumUserPoints +=
                                    criteria.userPoint * criteria.weightMark;
                            });
                        });
                    })}

                    <MainContent title="Оценки">
                        <div className="leftSide">
                            <div className="tabsPanel">
                                {OUPnPASs
                                    ? OUPnPASs.PASs.map((PAS, index) => (
                                          <FlatButton
                                              title={`ПАС-${index + 1}`}
                                              active={
                                                  currPAS == index
                                                      ? "true"
                                                      : "false"
                                              }
                                              round="true"
                                              onclick={
                                                  currPAS == index
                                                      ? null
                                                      : () => {
                                                            selectPAS(index);
                                                        }
                                              }
                                          />
                                      ))
                                    : null}
                            </div>
                            <div className="ratingInfo">
                                {OUPnPASs ? (
                                    <>
                                        <p>
                                            <span>
                                                {OUPnPASs.PASs[currPAS].name}
                                            </span>
                                        </p>
                                        <br />
                                        <p>
                                            <span>Всего баллов получено: </span>{" "}
                                            {sumUserPoints}/{sumMaxPoints} (
                                            {(sumUserPoints / sumMaxPoints) *
                                            100
                                                ? Number(
                                                      (sumUserPoints /
                                                          sumMaxPoints) *
                                                          100
                                                  ).toFixed(2)
                                                : 0}
                                            %)
                                        </p>
                                        <p>
                                            <span>Оценка: </span>
                                            {(sumUserPoints / sumMaxPoints) *
                                                100 >=
                                            90
                                                ? 5
                                                : (sumUserPoints /
                                                      sumMaxPoints) *
                                                      100 >=
                                                  80
                                                ? 4
                                                : (sumUserPoints /
                                                      sumMaxPoints) *
                                                      100 >=
                                                  70
                                                ? 3
                                                : 2}
                                        </p>
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div className="rightSide">
                            <Rating ratingInfo={rating} />
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
                .tabsPanel {
                    padding-bottom: var(--padding);
                }

                .content_container {
                    position: relative;
                    padding-top: var(--padding-max);
                }

                .ratingInfo {
                    padding-left: var(--padding);
                }

                .ratingInfo > p {
                    font-weight: 600;
                }

                .ratingInfo > p > span {
                    font-weight: 600;
                }
            `}</style>
        </>
    );
}
