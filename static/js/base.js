window.onload = async function checkLogin(){
    var payload = localStorage.getItem("payload");
    var parsed_payload = await JSON.parse(payload)

    const username = document.getElementById("username_nav")
    const loginoutButton = document.getElementById("loginout")

    if(parsed_payload){
        username.innerText = parsed_payload.username
        loginoutButton.innerText = "로그아웃"
        loginoutButton.setAttribute("onclick", "handleLogout()")

    }else{
        username.innerText = "환영합니다."
        loginoutButton.innerText = "로그인"
        loginoutButton.setAttribute("onclick", "location.href='sign_in'")
    }
}
