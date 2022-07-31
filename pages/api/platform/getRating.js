export default async function handler(req, res) {
    const urlAPI = process.env.URLAPI;

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response_PAS = await fetch(`${urlAPI}platform/getRating_PAS`, {
        method: "POST",
        body: req.body,
        headers,
    });
    const data_PAS = await response_PAS.json();

    const response_Day = await fetch(`${urlAPI}platform/getRating_rating_day`, {
        method: "POST",
        body: data_PAS,
        headers,
    });
    const data_Day = await response_Day.json();

    const response_Criteria = await fetch(
        `${urlAPI}platform/getRating_rating_criteria`,
        {
            method: "POST",
            body: data_Day,
            headers,
        }
    );
    const data_Criteria = await response_Criteria.json();

    const response_Subriteria = await fetch(
        `${urlAPI}platform/getRating_rating_subcriteria`,
        {
            method: "POST",
            body: data_Criteria,
            headers,
        }
    );
    const data_Subriteria = await response_Subriteria.json();

    res.status(200).json(data_Subriteria);
}
