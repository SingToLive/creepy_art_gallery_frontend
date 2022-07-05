function fileUpload() {
    var fileInput = document.getElementsByClassName('ex_file');
    var fileArray = [];
    for (var i = 0; i < fileInput.length; i++) {
        if (fileInput[i].files.length > 0) {
            for (var j = 0; j < fileInput[i].files.length; j++) {
                fileArray.push(fileInput[i].files[j].name);
            }
        }
    }

    const formData = new FormData();
    const photos = document.querySelector('input[type="file"][multiple]');

    
    formData.append('title', '업로드한이미지');
    for (let i = 0; i < photos.files.length; i++) {
        formData.append(`photos_${i}`, photos.files[i]);
    }

    fetch('http://127.0.0.1:8000/image/', {
        headers : {Authorization : "Bearer " + localStorage.getItem("access")},
	    withCredentials: true,
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((result) => {
            if(result.message == "실패") {
                throw "실패";
            }
            var uploadPanel = document.getElementById("upload_panel").style.display="none";
            var resultPanel = document.getElementById("result_panel").style.display="block";
            console.log(result.other_img)
            document.getElementById("result_image").src = 
                "data:image/jpeg;base64," + result.data;
            document.cookie = "image_id="+ result.image_id
        })
        .catch((error) => {
            document.write("<h1>사진 전송 실패!</h1>");
            // console.error는 관리자 도구에서만 실행되요 페이지에 에러문이 나오게 해주세요.
            console.error('실패:', error);
        });
}