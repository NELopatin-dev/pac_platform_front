import styles from "../styles/leftMenu.module.css";

import Link from "next/link";
import { Calendar, User, Analytics, Group, Diagram } from "@carbon/icons-react";
import { Menu } from "@carbon/icons-react";

import cookieCutter from "cookie-cutter";
import { useEffect } from "react";
import { useState } from "react";

export default function LeftMenu({}) {
    const [userInfo, setUserInfo] = useState(false);

    useEffect(async () => {
        if (userInfo) {
            return;
        }
        const response = await fetch(`/api/user/getUserInfo`, {
            method: "POST",
            body: JSON.stringify({
                token: cookieCutter.get("userToken"),
            }),
        });
        const data = await response.json();
        setUserInfo(data);
    }, [userInfo]);

    if (userInfo != null)
        return (
            <>
                <div className={styles.bg}>
                    <div className={styles.menuBtn}>
                        <Menu className="menuBtn" />
                    </div>

                    <div className={styles.menu}>
                        <div className={styles.menuElem}>
                            <Link href={"/platform/"}>
                                <p className={styles.menuElemName}>Профиль</p>
                            </Link>

                            <div className={styles.menuElemIcon}>
                                <User />
                            </div>
                        </div>

                        <div className={styles.menuElem}>
                            <Link
                                href={
                                    userInfo.tutor
                                        ? "/platform/tutorRating"
                                        : "/platform/rating"
                                }
                            >
                                <p className={styles.menuElemName}>Рейтинг</p>
                            </Link>

                            <div className={styles.menuElemIcon}>
                                <Analytics />
                            </div>
                        </div>

                        <div className={styles.menuElem}>
                            <Link href={"/platform/compitions"}>
                                <p className={styles.menuElemName}>
                                    Компетенции
                                </p>
                            </Link>

                            <div className={styles.menuElemIcon}>
                                <Diagram />
                            </div>
                        </div>

                        <div className={styles.menuElem}>
                            <Link href={"/platform/pasgroup"}>
                                <p className={styles.menuElemName}>
                                    Направление
                                </p>
                            </Link>

                            <div className={styles.menuElemIcon}>
                                <Group />
                            </div>
                        </div>

                        <div className={styles.menuElem}>
                            <Link href={"/platform/calendar"}>
                                <p className={styles.menuElemName}>
                                    График ПАС
                                </p>
                            </Link>

                            <div className={styles.menuElemIcon}>
                                <Calendar />
                            </div>
                        </div>
                    </div>

                    <div className={styles.menuSocial}>
                        <div className={styles.menuElem}>
                            <a
                                className={styles.menuElemName}
                                href={"https://vk.com/aboutpasmidis"}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <p className={styles.menuElemName}>Группа ВК</p>
                            </a>
                            <div
                                id={styles.vk}
                                className={styles.menuElemIcon}
                            ></div>
                        </div>
                    </div>
                </div>

                <style>
                    {`
                svg {
                    height: 30px;
                    width: 30px;
                    fill: white
                }
                svg.menuBtn {
                    height: 40px;
                    width: 40px;
                }
                `}
                </style>
            </>
        );
    else return null;
}
