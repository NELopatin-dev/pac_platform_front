export default async function handler(req, res) {
    const urlAPI = process.env.URLAPI;

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    const response = await fetch(`${urlAPI}user/logIn`, {
        method: "POST",
        body: req.body,
        headers,
    });
    const data = await response.json();

    res.status(200).json(data);
}
