import http from "k6/http";

const headers = {
    headers: {"X-Moltin-Auth-Store": "1078026b-3dab-4b7f-a89a-2d5b57606faf"
    }
}

const implicitToken = {
    "client_id": "AY11vypx0u9hKM6DaaMT2QFR4OObdQIFUd3O1Ugjkw",
    "grant_type": "implicit"
}

export default function () {
    const server = "api.epcc-perf.epcloudops.com";
    const url = `https://${server}/oauth/access_token`;

    // console.log(JSON.stringify(data))
    let res;
    res = http.post(url, implicitToken, headers);

    console.log(res.body)
}