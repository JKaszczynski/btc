export const postRequest = (path = "", body = {}) => (
    fetch(`http://localhost:8080/topic/${path}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => response.json()));

export const getRequest = (path) => (
    fetch(`http://localhost:8080/topic/${path}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    })
        .then(response => response.json()));
