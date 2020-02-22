document.querySelector('#login-email')
    .addEventListener('submit', async function (event) {
        event.preventDefault();
        const form = event.target;
        const res = await fetch('/api/v1/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.loginEmail.value,
                password: form.loginPassword.value
            })
        })
        const result = await res.json();
        // console.log(result);
        if (result.success === true) {
            window.location = "/";
        } else if (result.success === false) {
            document.querySelector('#loginerror-message').innerHTML = "";
            const alertBox = document.createElement('div');
            alertBox.textContent = `Please enter a valid email address or password.`;
            document.querySelector('#loginerror-message').appendChild(alertBox);
        }

    })

    
// const searchParams = new URLSearchParams(window.location.search);
// const errMessage = searchParams.get('error');
// console.log(errMessage);
// console.log('test');
// if (errMessage) {
//     document.querySelector('#loginerror-message').innerHTML = "";
//     const alertBox = document.createElement('div');
//     alertBox.textContent = `Please enter a valid email address or password.`;
//     document.querySelector('#loginerror-message').appendChild(alertBox);
// }



document.querySelector('#reg-email')
    .addEventListener('submit', async function (event) {
        event.preventDefault();
        const form = event.target;
        const res = await fetch('/api/v1/register', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.regEmail.value,
                password: form.regPassword.value
            })
        })
        const result = await res.json();
        if (result.success === true) {
            window.location = "/m";
        } else if (result.success === false) {
            document.querySelector('#regerror-message').innerHTML = "";
            const alertBox = document.createElement('div');
            alertBox.textContent = `This email address have been exist. Try again`;
            document.querySelector('#regerror-message').appendChild(alertBox);
        }

    })