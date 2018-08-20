function getQuestions(jsonData) {
    let questions = JSON.parse(jsonData);

    for (let i = 0; i < questions.length; i++) {
        let appendElement =
            `<tr id=question${i}>
            <th scope="row">${i + 1}</th>
            <td>${questions[i]['Text']}</td>`;
        if (i === 0)
        {
            appendElement += `<td>да</td> </tr>`
        } else {
            appendElement += `<td>нет</td> </tr>`
        }

        $('#approvedtable').append(appendElement);
        $(`#question${i}`).attr("data-idx", questions[i]['ID']);

        if (i === 0) {
            $(`#question${i}`).css({
              color: 'green',
            })
        }
    }
}

function loadQuestions()
{
    $.ajax({
        url: "../php/getapprovedquestions.php",
        method: "post",
        success: function (jsonData) {
            if (jsonData === '0x3') {
                location.href = "./authorization.html?where=2";
            }
            getQuestions(jsonData);
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

        loadQuestions();
        let oldCount = getApprovedQuestionsCount();
        setInterval(function () {
            let newCount = getApprovedQuestionsCount();
            if (newCount === oldCount)
            {
                return;
            }
            oldCount = newCount;
            $('#approvedscontainer').empty();
            loadQuestions();
        }, 5000)
    }
);



