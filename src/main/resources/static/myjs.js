let targetId;

$(document).ready(function () {
    // id 가 query 인 녀석 위에서 엔터를 누르면 execSearch() 함수를 실행하라는 뜻입니다.
    getMessages();
    $('#query').on('keypress', function (e) {
        if (e.key == 'Enter') {
            execSearch();
        }
    });
    // $('#objectContent').on('keypress', function (e) {
    //     if (e.key == 'Enter') {
    //         getMessages();
    //     }
    // });

    $('#close').on('click', function () {
        $('#container').removeClass('active');
    })

    $('.nav div.nav-object').on('click', function () {
        $('div.nav-object').addClass('active');
        $('div.nav-search').removeClass('active');
        $('div.nav-neverClick').removeClass('active');

        $('#see-area').show();
        $('#search-area').hide();
        $('#never-click-area').hide();
    })
    $('.nav div.nav-search').on('click', function () {
        $('div.nav-object').removeClass('active');
        $('div.nav-search').addClass('active');
        $('div.nav-neverClick').removeClass('active');


        $('#see-area').hide();
        $('#search-area').show();
        $('#never-click-area').hide();

    })
    $('.nav div.nav-neverClick').on('click', function () {
        $('div.nav-object').removeClass('active');
        $('div.nav-search').removeClass('active');
        $('div.nav-neverClick').addClass('active');

        $('#see-area').hide();
        $('#search-area').hide();
        $('#never-click-area').show();

    })

    $('#see-area').show();
    $('#search-area').hide();
    $('#never-click-area').hide();


    showProduct();
})


function isValidTitle(title) {
    if (title == '') {
        alert('제목을 입력해주세요');
        return false;
    }
    if (title.length > 20) {
        alert('제목은 공백 포함 20자 이하로 입력해주세요');
        return false;
    }
    return true;
}

function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 140) {
        alert('내용은 공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}

function isValidPassword(password) {
    if (password == "") {
        alert('비밀번호를 입력하세오');
        return false;
    }
    if (password.length > 11 || password.length<4) {
        alert('비밀번호는 4자이상 10자 이내로 입력하세오');
        return false;
    }
    return true;
}


function comparePassword(password,id) {
    let objectPassword = $(`#${id}-contentsPas`).text().trim();
    if (password != objectPassword) {
        alert('비밀번호가 다릅니다');
        return false;
    }
    if (password.length > 11) {
        alert('10자 이내로 입력하세오');
        return false;
    }
    return true;
}
// 수정 글 띄우기

function editPost(id) {
    $(`#${id}-editarea`).hide();

    showEdits(id);
    let objectContent = $(`#${id}-contents`).text().trim();
    let objectTitle = $(`#${id}-title`).text().trim();
    let objectPassword = $(`#${id}-contentsPas`).text().trim();
    $(`#${id}-textarea`).val(objectContent);
    $(`#${id}-titleInput`).val(objectTitle);



}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();


    $(`#${id}-contents`).hide();
    $(`#${id}-contentsPas`).hide();
    $(`#${id}-edit`).hide();
    $(`#${id}-title`).hide();

}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}


function genRandomName(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        let number = Math.random() * charactersLength;
        let index = Math.floor(number);
        result += characters.charAt(index);
    }
    return result;
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//////////////////////////////////////////////////////////////////////////////////////////
///// 여기 아래에서부터 코드를 작성합니다. ////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


// 검색 실행 기능


function addProductItem(product) {
    // link, image, title, lprice, myprice 변수 활용하기
    return `<div class="product-card" onclick="window.location.href='${product.url}'">
            <div class="card-header">
                <img src="${product.image}"
                     alt="">
            </div>
            <div class="card-body">
                <div class="title">
                    ${product.title}
                </div>
                <div class="lprice">
                    <span>${numberWithCommas(product.lprice)}</span>원
                </div>
                <div class="isgood ${product.lprice <= product.myprice ? '' : 'none'}">          <!--삼항연산자 my price가 클경우 빈값(isgood이 나옴), 작을경우  none 리턴 -->
                    최저가
                </div>
            </div>
        </div>`;
}


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//////////          게시물 조회
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function getMessages() {
    // 1. 기존 메모 내용을 지웁니다.
    $('#card-box').empty();


    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: '/api/objects',
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                let object = response[i];
                let id = object.id;
                let title = object.objectTitle;
                let name = object.objectName;
                let content = object.objectContent;
                let modifiedAt = object.modifiedAt;
                let objectPassword = object.objectPassword;
                addToObject(id, name, title, content, modifiedAt, objectPassword)
            }

        }
    })
}

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addToObject(id, name, title, content, modifiedAt, objectPassword) {
    let temp_html = `<div class="card" >
                                            <!-- date/username 영역 -->

                                            <!-- contents 조회/수정 영역-->
                                            <div class="contents">
                                                 <div id="${id}-title" class="text" >
                                                    ${title}
                                                </div>
                                                <div id="${id}-contents" class="text">
                                                    ${content}
                                                </div>
                                                <div id="${id}-contentsPas" class="text" style="display: none">
                                                    ${objectPassword}
                                                </div>
                                                <div id="${id}-editarea" class="edit">
                                                    <div><input id="${id}-titleInput" class="te-edit" name="" id="" cols="30" rows="5" type="text"></div>
                                                    <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
                                                    <div>비밀번호를 입력하세요<br><input id="${id}-input" class="te-edit" name="" id="" cols="30" rows="5" type="password"></div>
                                                </div>
                                            </div>
                                              <div class="metadata">
                                                <div class="date">
                                                  최근 수정 날짜: ${modifiedAt}
                                                </div>
    <!--유저네임일때와 컨텐츠일때 차이 -->         작성자<div id="${id}-name" class="username">
    <!--유저네임은 수정불가   html    -->              ${name}
    <!--컨텐츠 부분은수정 가능한 html -->              </div>
    <!--359 360 줄 submitEdit -->       </div>
                                            <!-- 버튼 영역-->
                                            <div class="footer">
                                                <img id="${id}-edit" onclick="editPost('${id}')" class="icon-start-edit" src="images/edit.png" alt="">
                                                <img id="${id}-delete" onclick="deleteOne('${id}')" class="icon-delete" src="images/delete (1).png" alt="">
                                                <img id="${id}-submit" onclick="submitEdit('${id}')" class="icon-end-edit" src="images/done.png" alt="">
                                            </div>
                                        </div>`;
    // 1. HTML 태그를 만듭니다.
    // 2. #cards-box 에 HTML을 붙인다.
    $('#card-box').append(temp_html);
}


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//////////          게시물 생성
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.

function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    let objectContent = $('#objectContent').val();
    let objectPassword = $('#objectPassword').val();
    let objectTitle = $('#objectTitle').val();


    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidTitle(objectTitle) == false) {
        return;
    }
    if (isValidContents(objectContent) == false) {
        return;
    }
    if (isValidPassword(objectPassword) == false) {
        return;
    }
    // 3. genRandomName 함수를 통해 익명의 username을 만듭니다.
    let objectName = genRandomName(10);

    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'objectName': objectName, 'objectTitle':objectTitle, 'objectContent': objectContent, 'objectPassword': objectPassword};

    // 5. POST /api/memos 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/objects",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
            window.location.reload();
        }
    });
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////// 게시글 수정
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function submitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    let objectName = $(`#${id}-name`).text().trim();
    let objectContent = $(`#${id}-textarea`).val();
    let objectPassword = $(`#${id}-input`).val();
    let objectTitle = $(`#${id}-titleInput`).val();


    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidTitle(objectTitle) == false) {
        return;
    }
    if (isValidContents(objectContent) == false) {
        return;
    }
    if (isValidPassword(objectPassword) == false) {
        return;
    }
    if (comparePassword(objectPassword, id) == false) {
        return;
    }

    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'objectName': objectName, 'objectTitle':objectTitle,'objectContent': objectContent, 'objectPassword': objectPassword};

    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/objects/${id}`,  <!--백틱 사이에 ${id} = 스프링에서 {id} 변하는 아이디 주는것과같음-->
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 수정완료!.');
            window.location.reload();
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////// 게시글 삭제
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// 메모를 삭제합니다.
function deleteOne(id) {
    let objectPassword = $(`#${id}-input`).val();

    if (comparePassword(objectPassword, id) == false) {
        return;
    }

    let data = {'objectPassword': objectPassword};
    // 1. DELETE /api/memos/{id} 에 요청해서 메모를 삭제합니다.
    {
        $.ajax({
            type: "DELETE",
            url: `/api/objects/${id}`,
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (response) {
                alert('메시지 삭제에 성공하였습니다.');
                window.location.reload();
            }
        })
    }
}