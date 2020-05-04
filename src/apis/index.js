export const registerEvents = userId => {
    return fetch(`http://localhost/api/users/${userId}/events/register/`, {
        method: 'POST',
        headers: {
            'Authorization': "kumarmo2",
            // 'Content-Type': 'application/json',
        },
        // mode: 'no-cors'
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw Error(response.statusText);
    })
}