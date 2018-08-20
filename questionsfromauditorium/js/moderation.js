function reject(event) {
    event.preventDefault();
    $.ajax({
        url: "../php/rejectquestion.php",
        method: "post",
        data: "id=" + event.data.id
    });
    $(`#question${event.data.i}`).remove();
}

function approve(event) {
    event.preventDefault();
    $.ajax({
        url: "../php/approvequestion.php",
        method: "post",
        data: "id=" + event.data.id
    });
    $(`#question${event.data.i}`).remove();
}

function getQuestions(jsonData) {
    let questions = JSON.parse(jsonData);
    for (let i = 0; i < questions.length; i++) {

        $('#moderatortable').append(
        `<tr id=question${i}>
         <td>${questions[i]['Text']}</td>
         <td>${questions[i]['Name']}</td>
         <td><button id=approve${i} class="btn btn-primary control appr"></button>
             <button id=reject${i} class="btn btn-primary control rej"></button></td>
         </tr>`);

        $(`#question${i}`).attr("data-idx", questions[i]['ID']);

        let id = $(`#question${i}`).attr('data-idx');
        $(`#approve${i}`).html("Одобрить")
            .click({id: id, i: i}, approve);
        $(`#reject${i}`).html("Отклонить")
            .click({id: id, i: i}, reject);
    }
}

function checkAsAnswered(event) {
    event.preventDefault();
    $.ajax({
        url: "../php/answerequestion.php",
        method: "post",
        data: "id=" + event.data.id
    });

    $(`#actualquestion${event.data.i}`).remove();
}

function getActualQuestion() {
    $.ajax({
        url: "../php/getactualquestion.php",
        method: "post",
        success: function (jsonData) {
            let questions = JSON.parse(jsonData);
            for (let i = 0; i < questions.length; i++) {
                $('#moderatortable').prepend(`
                <tr id=actualquestion${i}>
                <td>${questions[i]['Text']}</td>
                <td>актуальный</td>
                <td><button id="answered" class="btn btn-primary control">Пометить как отвеченный</button></td>
                `);

                $(`#actualquestion${i}`).attr("data-idx", questions[i]['ID']);
                let id = $(`#actualquestion${i}`).attr("data-idx");

                $(`#answered`).click({id: id, i: i}, checkAsAnswered);
            }
        }
    });
}

function loadQuestions() {
    $.ajax({
        url: "../php/moderation.php",
        method: "post",
        success: function (jsonData) {
            if (jsonData === '0x3')
            {
                location.href = "./authorization.html?where=1";
            }
            getQuestions(jsonData);
            getActualQuestion();
        }
    });
}

$(window).on("load",
    function () {
        $('#logout').on('click', function () {
            $.ajax({
                url: "../php/logout.php",
                method: "post",
                success: function (jsonData) {
                    location.href = "../index.html";
                }
            });
        });

        let oldVersion = getDBVersion();
        loadQuestions();
        setInterval(function () {
            let newVersion = getDBVersion();
            if (newVersion <= oldVersion)
            {
                return;
            }
            oldVersion = newVersion;
            $('#moderatortable').empty();
           loadQuestions();
        }, 5000)
    }
);