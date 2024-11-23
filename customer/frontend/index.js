async function login(){
    const credentials = {
        username: document.getElementById('usernameField').value,
        password: document.getElementById('passwordField').value
    }    

    try{
        const response = await fetch(`http://localhost:3000/api/login?orgid=${org}`, {
            method: 'POST',
            headers: {
                 'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        
        var message = document.getElementById('message')

        if(response.status === 200){
            window.location.href = 'dashboard.html'
        }else{
            const data = await response.json();
            message.textContent = data.message
        }

    }catch(err){
        console.log(err);      
    }
}

var loginButton = document.getElementById('loginButton')
loginButton.addEventListener('click', login)