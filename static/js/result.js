function image_subscription() {
    let formData = new FormData();
    img_sub = document.getElementById('image_subscription').value;
    formData.append('img_sub', img_sub);

    const cookies = document.cookie.split(`; `).map((el) => el.split('='));
    for (let i=0; i<cookies.length; i++) {
        if (cookies[i][0] == 'image_id') {
            formData.append('img_id', cookies[i][1]);
            break;
        }
    }

    fetch('http://127.0.0.1:8000/image/save/', {
        method: 'PUT',
        body: formData,
    })
        .then((response) => response.json())
        .then((result) => {
            if(result.message == "실패") {
                throw "실패";
            }
            alert('성공적으로 등록 되었습니다')
        })
        .catch((error) => {
            alert('등록에 실패했습니다. 처음부터 다시 해보길 바랍니다. 잠시후 사이트가 재실행됩니다.')
            window.location.reload()
        });
}


function handleFileDownload() {
    const cookies = document.cookie.split(`; `).map((el) => el.split('='));
    let image_id = null
    for (let i=0; i<cookies.length; i++) {
        if (cookies[i][0] == 'image_id') {
            image_id = cookies[i][1];
            break;
        }
    }
    console.log('127.0.0.1:8000/image/download/'+image_id)
    const response = fetch('127.0.0.1:8000/image/download/'+image_id);
    const file = response.blob(); 
    const downloadUrl = window.URL.createObjectURL(file); // 해당 file을 가리키는 url 생성
  
    const anchorElement = document.createElement('a');
    document.body.appendChild(anchorElement);
    anchorElement.download = 'some file'; // a tag에 download 속성을 줘서 클릭할 때 다운로드가 일어날 수 있도록 하기
    anchorElement.href = downloadUrl; // href에 url 달아주기
  
    anchorElement.click(); // 코드 상으로 클릭을 해줘서 다운로드를 트리거
  
    document.body.removeChild(anchorElement); // cleanup - 쓰임을 다한 a 태그 삭제
    window.URL.revokeObjectUrl(downloadUrl); // cleanup - 쓰임을 다한 url 객체 삭제
  }