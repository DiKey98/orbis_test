function getApprovedQuestionsCount() {
    let questionsCount = 0;
    $.ajax({
        async: false,
        url: "../php/getapprovedquestionscount.php",
        method: "get",
        success: function (jsonData) {
            questionsCount = jsonData;
        }
    });

    return questionsCount;
}

function getDBVersion() {
    let res = 0;
    $.ajax({
        async: false,
        url: "../php/getDBVersion.php",
        method: "get",
        success: function (jsonData) {
            res = jsonData;
        }
    });

    return res;
}

function GET(key) {
    let p = window.location.search;
    p = p.match(new RegExp(key + '=([^&=]+)'));
    return p ? p[1] : false;
}

function redirect(where) {
    switch(where) {
        case "1": {
            location.href = "../pages/moderatorpage.html";
            break;
        }
        case "2": {
            location.href = "../pages/speakerpage.html";
            break;
        }
    }
}

function getQuestionsCount() {
    let questionsCount = 0;
    $.ajax({
        async: false,
        url: "../php/getquestionscount.php",
        method: "get",
        success: function (jsonData) {
            questionsCount = jsonData;
        }
    });

    return questionsCount;
}