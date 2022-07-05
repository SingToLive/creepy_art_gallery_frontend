var backend_base_url = "http://127.0.0.1:8000"
var frontend_base_url = "http://127.0.0.1:7000"

// 회원가입 부분
async function handleSignup(){

    const signupData = {
        user_id : document.getElementById('id').value,
        username : document.getElementById('username_input').value,
        password : document.getElementById('password').value,
        password_check : document.getElementById('password_check').value,
    }
    console.log(document.getElementById('username_input'))
    console.log(document.getElementById('username_input').value)
    console.log(signupData)
    if(signupData['user_id'] === "" ){
        alert("아이디를 입력해주세요.") 
    } else if (signupData['username'] === "" ){
        alert("이름을 입력해주세요.") 
    } else if (signupData['password'] === "" ){
        alert("비밀번호를 입력해주세요.") 
    } else if (signupData['password_check'] === "" ){
        alert("비밀번호 확인을 입력해주세요.")     
    } else if (signupData['password'] !== signupData['password_check']){
        alert("비밀번호가 틀렸습니다. 다시 확인해주세요.") 
    } else {
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
    }


// 로그인 부분     
async function handleLogin(){

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

     // 아래의 변수 호출 access,refresh 
    response_json = await response.json();

    // access,refresh 값 저장
    if (response.status ==200){
        localStorage.setItem("access", response_json.access)
        localStorage.setItem("refresh", response_json.refresh)
        
    
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));


        //payload 저장 후 로그인시 메인 페이지로 이동
        localStorage.setItem("payload", jsonPayload);
        window.location.replace(`${frontend_base_url}/`);
    }else{
        alert("아이디 or 비밀번호가 틀립니다.")
    }
}


// 로그아웃 부분
async function handleLogout(){
    localStorage.removeItem("payload");
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
    alert("로그아웃 되었습니다.")
    location.reload()
    window.location.replace(`${frontend_base_url}/`);
}