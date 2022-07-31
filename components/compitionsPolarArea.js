import React from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function CompitionsPolarArea(props) {
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
            // {
            //     label: "Максимально",
            //     data: maxData,
            //     backgroundColor: [
            //         "rgba(255, 99, 132, 0.2)",
            //         "rgba(54, 162, 235, 0.2)",
            //         "rgba(255, 206, 86, 0.2)",
            //         "rgba(75, 192, 192, 0.2)",
            //         "rgba(153, 102, 255, 0.2)",
            //         "rgba(255, 159, 64, 0.2)",
            //     ],
            //     borderWidth: 1,
            // },
            {
                label: "Получено",
                data: userData,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "bottom",
                align: "center",
            },
        },
        elements: {
            line: {
                borderWidth: 3,
            },
        },
    };

    return (
        <>
            <PolarArea
                data={data}
                width={width}
                height={height}
                options={options}
            />
        </>
    );
}
