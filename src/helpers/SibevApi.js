import authentication from 'react-azure-adb2c';

const _fetch = (url, method, body) => {
    const token = authentication.getAccessToken();
    let headers = new Headers();
    //headers.append('Content-Type', 'text/json');
    headers.append('Authorization', 'Bearer ' + token);
    return fetch(process.env.REACT_APP_API_HOST+url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
      })
      .then(res => res.json())
    }

const CustomerApi = {
    get: (api) => _fetch(api, "GET"),
    post: (api, body) => _fetch(api, "POST", body),
    delete: (api, body) => _fetch(api, "DELETE", body)
}

export default CustomerApi