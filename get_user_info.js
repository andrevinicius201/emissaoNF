function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const user_info = parseJwt(window.location.href.split("#")[1].split("&")[0].replace("id_token=",""))
const user_name = user_info['cognito:username']
const user_email = user_info['email']

localStorage.setItem('loggedUser', user_name); 
localStorage.setItem('user_email', user_email); 
localStorage.setItem('id_Token', window.location.href.split("#")[1].split("&")[0].replace("id_token=",""))
