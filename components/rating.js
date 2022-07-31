import styles from "../styles/rating.module.css";

import parse from "html-react-parser";
import { useEffect, useState } from "react";

import CustomInput from "./customInput";

export default function Rating(props) {
    const { ratingInfo, editMode = false, user_id } = props;

    const [points, setPoints] = useState({});
    const [rating, setRating] = useState(ratingInfo);

    const getCurrRating = async () => {
        const resRating = await fetch(`/api/platform/getRating`, {
            method: "POST",
            body: JSON.stringify({
                PASid: rating.PAS._id,
                user_id: user_id,
            }),
        });

        const dataRating = resRating.json();
        return dataRating;
    };

    const updatePoint = async (criteriaId, subCriteriaId) => {
        const id = criteriaId ? criteriaId : subCriteriaId;

        await fetch(`/api/tutor/updatePoint`, {
            method: "POST",
            body: JSON.stringify({
                criteriaId: criteriaId ? criteriaId : null,
                subCriteriaId: subCriteriaId ? subCriteriaId : null,
                user_id,
                point: points[id],
            }),
        });

        let newPoints = points;
        delete newPoints[id];
        setPoints({ ...newPoints });

        const newRating = await getCurrRating();
        setRating(newRating);
    };

    const editPoint = (
        criteriaId,
        subCriteriaId,
        maxMark,
        weightMark,
        value
    ) => {
        const id = criteriaId ? criteriaId : subCriteriaId;

        if (value < 0) value = 0;
        if (value > maxMark) value = maxMark;

        setPoints({ ...points, [id]: value ? value : 0 });
    };

    useEffect(() => {
        if (ratingInfo.PAS._id !== rating.PAS._id) setRating(ratingInfo);
    });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrap}>
                    {rating.rating.map((day, index) => (
                        <>
                            <p className={styles.title}>
                                <span>День {index + 1}</span>
                            </p>
                            {day.map((CriteriaGroup, index) => (
                                <>
                                    <div className={styles.criteriaGroup}>
                                        <p className={styles.title}>
                                            {CriteriaGroup.title}
                                        </p>

                                        {CriteriaGroup.criteria.map(
                                            (Criteria, index) => (
                                                <>
                                                    <div
                                                        className={
                                                            styles.criteria
                                                        }
                                                    >
                                                        <p
                                                            className={
                                                                styles.title
                                                            }
                                                        >
                                                            <span
                                                                className={
                                                                    styles.points
                                                                }
                                                            >
                                                                {editMode &&
                                                                Criteria
                                                                    .subCriteria
                                                                    .length ===
                                                                    0 ? (
                                                                    <>
                                                                        <CustomInput
                                                                            type="text"
                                                                            name="point"
                                                                            placeholder="0"
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                editPoint(
                                                                                    Criteria._id,
                                                                                    null,
                                                                                    Criteria.maxMark,
                                                                                    Criteria.weightMark,
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            onClick={
                                                                                points[
                                                                                    Criteria
                                                                                        ._id
                                                                                ]
                                                                                    ? (
                                                                                          e
                                                                                      ) =>
                                                                                          updatePoint(
                                                                                              Criteria._id,
                                                                                              null
                                                                                          )
                                                                                    : null
                                                                            }
                                                                            value={
                                                                                Criteria.userPoint
                                                                            }
                                                                            size={
                                                                                3
                                                                            }
                                                                            inputFontSize={
                                                                                "x-large"
                                                                            }
                                                                            inputFontWeight={
                                                                                "600"
                                                                            }
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    Criteria.userPoint
                                                                )}
                                                                /
                                                                {
                                                                    Criteria.maxMark
                                                                }
                                                            </span>
                                                            {" " +
                                                                Criteria.title +
                                                                " "}
                                                            <span
                                                                className={
                                                                    styles.criteriaInfo
                                                                }
                                                            >
                                                                Вес:{" "}
                                                                {
                                                                    Criteria.weightMark
                                                                }
                                                            </span>
                                                        </p>

                                                        <p
                                                            className={
                                                                styles.description
                                                            }
                                                        >
                                                            {parse(
                                                                Criteria.description
                                                            )}
                                                        </p>

                                                        {Criteria.subCriteria
                                                            .length != 0 ? (
                                                            <>
                                                                <div className="subcriteria_container">
                                                                    {Criteria.subCriteria.map(
                                                                        (
                                                                            SubCriteria,
                                                                            index
                                                                        ) => (
                                                                            <div
                                                                                className={
                                                                                    styles.subcriteria
                                                                                }
                                                                            >
                                                                                <p
                                                                                    className={
                                                                                        styles.title
                                                                                    }
                                                                                >
                                                                                    <span
                                                                                        className={
                                                                                            styles.points
                                                                                        }
                                                                                    >
                                                                                        {editMode ? (
                                                                                            <>
                                                                                                <CustomInput
                                                                                                    type="text"
                                                                                                    name="point"
                                                                                                    placeholder="0"
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        editPoint(
                                                                                                            null,
                                                                                                            SubCriteria._id,
                                                                                                            SubCriteria.maxMark,
                                                                                                            SubCriteria.weightMark,
                                                                                                            e
                                                                                                                .target
                                                                                                                .value
                                                                                                        )
                                                                                                    }
                                                                                                    onClick={
                                                                                                        points[
                                                                                                            SubCriteria
                                                                                                                ._id
                                                                                                        ]
                                                                                                            ? () =>
                                                                                                                  updatePoint(
                                                                                                                      null,
                                                                                                                      SubCriteria._id
                                                                                                                  )
                                                                                                            : null
                                                                                                    }
                                                                                                    value={
                                                                                                        SubCriteria.userPoint
                                                                                                    }
                                                                                                    size={
                                                                                                        3
                                                                                                    }
                                                                                                    inputFontSize={
                                                                                                        "x-large"
                                                                                                    }
                                                                                                    inputFontWeight={
                                                                                                        "600"
                                                                                                    }
                                                                                                />
                                                                                            </>
                                                                                        ) : (
                                                                                            SubCriteria.userPoint
                                                                                        )}

                                                                                        /
                                                                                        {
                                                                                            SubCriteria.maxMark
                                                                                        }
                                                                                    </span>
                                                                                    {" " +
                                                                                        SubCriteria.title +
                                                                                        " "}
                                                                                    <span
                                                                                        className={
                                                                                            styles.criteriaInfo
                                                                                        }
                                                                                    >
                                                                                        Вес:{" "}
                                                                                        {
                                                                                            SubCriteria.weightMark
                                                                                        }
                                                                                    </span>
                                                                                </p>
                                                                                <p
                                                                                    className={
                                                                                        styles.description
                                                                                    }
                                                                                >
                                                                                    {parse(
                                                                                        SubCriteria.description
                                                                                    )}
                                                                                </p>
                                                                                <p
                                                                                    className={
                                                                                        styles.result
                                                                                    }
                                                                                >
                                                                                    <span>
                                                                                        Итог:{" "}
                                                                                    </span>
                                                                                    {
                                                                                        SubCriteria.userPoint
                                                                                    }{" "}
                                                                                    *{" "}
                                                                                    {
                                                                                        SubCriteria.weightMark
                                                                                    }{" "}
                                                                                    ={" "}
                                                                                    {SubCriteria.userPoint *
                                                                                        SubCriteria.weightMark}
                                                                                </p>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </>
                                                        ) : null}

                                                        <p
                                                            className={
                                                                styles.result
                                                            }
                                                        >
                                                            <span>Итог: </span>{" "}
                                                            {Criteria.userPoint}{" "}
                                                            *{" "}
                                                            {
                                                                Criteria.weightMark
                                                            }{" "}
                                                            ={" "}
                                                            {Criteria.userPoint *
                                                                Criteria.weightMark}
                                                        </p>
                                                    </div>
                                                </>
                                            )
                                        )}
                                    </div>
                                </>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}
