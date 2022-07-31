import React from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export default function CompitionsRadar(props) {
    const { userCompitions } = props;

    let labels = [];
    let userData = [];
    let maxData = [];

    userCompitions.map((compition, index) => {
        labels.push(compition.compitionName);
        userData.push(compition.points);
        maxData.push(compition.points * 1.5);
    });

    const width = 400;
    const height = 400;

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Максимально",
                data: maxData,
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(54, 162, 235, 0.2)",
                borderWidth: 1,
            },
            {
                label: "Получено",
                data: userData,
                backgroundColor: "rgba(153, 102, 255, 0.5)",
                borderColor: "rgba(54, 162, 235, 0.5)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Radar data={data} width={width} height={height} />
        </>
    );
}
