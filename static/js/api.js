const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:7000"


async function handleSignin(){

    const signupData = {
        user_id : document.getElementById("id").value,
        username : document.getElementById("username").value,
        password : document.getElementById('password').value,
        password_check : document.getElementById('password_check').value,
    }

    const response = await fetch(`${backend_base_url}/user/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(signupData)
    }
    )

    response_json = await response.json()

    if (response.status ==200){
        window.location.replace(`${frontend_base_url}/sign_in/`);
    }else{
        alert(response.status)
    }
}


async function handleLogin(){
    console.log(user_id)

    const loginData = {
        user_id : document.getElementById("user_id").value,
        password : document.getElementById('password').value,
    }


    const response = await fetch(`${backend_base_url}/user/api/token/`,{
        headers:{
            Accept:"application/json",
            'Content-type':'application/json'
        },
        method:'POST',
        body:JSON.stringify(loginData)
    }
    )


    response_json = await response.json()
    console.log(response_json)

    if (response.status ==200){
        
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh);


        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));


        localStorage.setItem("payload", jsonPayload);
    }else{
        alert(response.status)
    }

}