import encoding from "k6/encoding";
import http from "k6/http";
import { check } from "k6";

const username = 'user';
const password = 'passwd';


export const options = {
    stages: [,
        { target: 2, duration: '1m' }
    ]
};

export default function () {
    const credentails = `${username}:${password}`;

    // Passing username and password as part of the URL will
    // allow us to authenticate using HTTP Basic Auth.
    const url = `http://${credentails}@httpbin.org/basic-auth/${username}/${password}`;

    let res = http.get(url)

    // Verify response
    check(res, {
        'status is 200': (r) => r.status === 200,
        'is authenticated': (r) => r.json().authenticated === true,
        'is correct user': (r) => r.json().user === username,
    })
}