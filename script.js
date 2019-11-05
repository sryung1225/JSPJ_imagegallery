var req = new XMLHttpRequest(); // 객체 생성

req.open("GET", "./json/image_list.json"); // json 파일을 이용해 이미지 목록 가져옴


/* 이미지 화면에 띄우기 */
req.onreadystatechange = function() {
  if (this.readyState == 4) {
    // console.log(this.response); // 응답 출력
    var data = JSON.parse(this.response); // 데이터 파싱

    /* 이미지 목록 html에 추가 */
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      div.setAttribute("class", "image"); // 이미지들을 들고와서 div 태그 생성해 image로 지정
      div.onclick = function () {
        this.classList.toggle("image-selected");
        // 이미지 선택하면 image-selected 클래스 추가(=> 선택 효과)
      }
      div.onmouseover = function () {
        var element = this;
        this.timerId = setTimeout(function() {
          element.classList.add("image-magnified");
        }, 1000);
        // 이미지 위에 마우스 올리면 image-magnified 클래스 추가 (=> 1초 뒤 확대)
      }
      div.onmouseout = function() {
        clearTimeout(this.timerId);
        this.classList.remove("image-magnified");
        // 이미지 위에서 마우스 이탈하면 image-magnified 클래스 제거 (=> 원상복귀)
      }
      var img = document.createElement("img");
      img.src = data[i]; //img에 각각의 url 저장
      div.appendChild(img);
      document.body.appendChild(div);
    }
  }
}
req.send();


/* 이미지 전체 선택 기능 */
function selectAll(btn) {
  var images = document.getElementsByClassName("image"); // image 클래스 가진 태그 모두 배열에 저장
  for (var i = 0; i < images.length; i++ ) {
    if (btn.value == "전체 선택 해제") {
      images[i].classList.remove("image-selected");
    } else {
      images[i].classList.add("image-selected");  
    } // 'Select All'을 누르면 전체 선택 'Unselect All'을 누르면 선택 해제
  }
  if (btn.value == "전체 선택 해제") {
    btn.value = "전체 선택";
  } else {
    btn.value = "전체 선택 해제";
  } // 'Select All'과 'Unselect All' 두 버튼 교차
}


/* 이미지 슬라이드 쇼 기능 */
function slideShow(btn) {
  var images = document.getElementsByClassName("image"); // image 클래스 가진 태그 모두 배열에 저장
  var index = 0;
  images[index].classList.add("image-magnified"); // index값에 따라서 이미지 순차적 확대

  var intervalId = setInterval(function() {
    images[index].classList.remove("image-magnified");
    index++;
    if (index < images.length) {
      images[index].classList.add("image-magnified");
    }
    else {
      clearInterval(intervalId);
    }
  }, 1000); // 배열의 범위 이상으로 진행되어 나는 오류 방지 (images.length제한)

}