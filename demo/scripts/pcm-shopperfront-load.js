import http from "k6/http";
import {check} from "k6";

const createHierarchy = () => {
    return {
        "data": {
            "type": "hierarchy",
            "attributes": {
                "name": "perf hierarchy",
                "description": "Hierarchy perflab test data",
                "slug": "perf-slug"
            }
        }
    }
}

// export const options = {
//     stages: [,
//         { target: 2, duration: '20s' }
//     ]
// };


export function setup() {
    const domain = "api.epcc-perf.epcloudops.com";
    const headers = {
        "Content-Type": "application/json",
        "X-Moltin-Auth-Store": "1078026b-3dab-4b7f-a89a-2d5b57606faf",
    }
    const implicitToken = {
        client_id: "AY11vypx0u9hKM6DaaMT2QFR4OObdQIFUd3O1Ugjkw",
        grant_type: "implicit"
    }
    let endpoint = `https://${domain}/oauth/access_token`;
    let res = http.post(endpoint, implicitToken, {
        headers: headers,
        tags: {
            name: "UT_PublicRoleAuthentication"
        }
    });
    let checkRes = check(res, {
        "status is 200": (r) => r.status === 200,
    })
    if (checkRes) {
        return {
            token: res.json()["access_token"]
        }
    } else {
        console.log(`Error in UT_PublicRoleAuthentication": ${res.status_text} ${res.body}`);
    }
}

export default function (contextData) {
    // console.log(JSON.stringify(contextData));
    const domain = "api.epcc-perf.epcloudops.com";
    const headers = {
        "Content-Type": "application/json",
        "X-Moltin-Auth-Store": "1078026b-3dab-4b7f-a89a-2d5b57606faf",
        Authorization: `Bearer ${contextData.token}`
    }
    console.log(JSON.stringify(headers));

    // headers.Authorization = "Bearer " + contextData.token
    // console.log(JSON.stringify(headers))
    //

    // let endpoint = `https://${domain}/experimental/hierarchies`;
    // let payload = createHierarchy();
    // // console.log(JSON.stringify(payload))
    // let res = http.post(endpoint, JSON.stringify(payload), {
    //     headers: headers,
    //     tags: {name: "UT_CreateHierarchy"}
    // })
    // let checkRes = check(res, {
    //     "status is 200": (r) => r.status === 200,
    // })
    // console.log(res.status_text)

    let endpoint = `https://${domain}/experimental/catalog`;
    let res = http.get(endpoint, {
        headers: headers,
        tags: {
            name: "UT_GetCatalog_PCM"
        }
    })
    let checkRes = check(res, {
        "status is 200": (r) => r.status === 200,
    })
    if (checkRes) {
        console.log("Hierarchy id: " + JSON.stringify(res.json().data.attributes.hierarchies[0].id))
    } else {
        console.log(`Error in UT_GetCatalog_PCM": ${res.status_text} ${res.body}`);
    }
}