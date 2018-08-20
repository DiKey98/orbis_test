let current = 0;
let staticValue = 1;
let perPage = 5;
let maxPages= 5;
let half = 0;

function getStatistics(jsonData, startNumber) {
    let statistics = JSON.parse(jsonData);
    for (let i = 0; i < statistics.length; i++) {
        $('#statisticstable').append(
            `<tr>
            <th scope="row">${startNumber+1}</th>
            <td>${statistics[i]['Text']}</td>
            <td id=status${i}>${statistics[i]['Name']}</td>
            </tr>`);

        startNumber++;

        switch(statistics[i]['Name'])
        {
            case 'одобренный':
            {
                $(`#status${i}`).css({
                    color: 'green'
                });
                break;
            }
            case 'отклонённый':
            {
                $(`#status${i}`).css({
                    color: 'red'
                });
                break;
            }
            case 'архивный':
            {
                $(`#status${i}`).css({
                    color: 'blue'
                });
                break;
            }
            case 'на модерации':
            {
                $(`#status${i}`).css({
                    color: 'yellow'
                });
                break;
            }
        }
    }
}

function loadStatistics(value) {
    $.ajax({
        url: "../php/getstatistics.php",
        method: "post",
        data: "value=" + staticValue,
        success: function (jsonData) {
            getStatistics(jsonData, (value-1)*perPage);
        }
    });
}

function clickNavigation(event) {
    $('#statisticstable').empty();
    $('.contnav').removeClass('active');
    current = event.data.i;

    staticValue = $(`#page${event.data.i}`).html();

    alert(current);
    console.log(half);
    if (current < half) {
        current = event.data.i;
    }
    else if (staticValue < event.data.pages - half) {
        current = half;
    }
    else {
        alert('alalal');
        current = staticValue % maxPages - 1;
    }
    alert(current);
    loadStatistics(staticValue);
    printNavigation();
}

function printNavigation() {
    $('#nav').empty();

    let questionsCount = getQuestionsCount();
    let pages = Math.ceil(questionsCount * 1.0 / perPage);
    let displayCount = pages;

    if (pages > maxPages) {
        displayCount = maxPages
    }

    half = Math.floor(displayCount / 2);

    if (pages === 1){
        $(`#linext`).addClass('disabled');
    }

    $('#nav').append(`
    <li id="liprev" class="page-item">
                <a class="page-link" href="#" tabindex="-1" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
    `);

    if (current === 0) {
        $(`#liprev`).addClass('disabled');
    } else {
        $(`#liprev`).removeClass('disabled');
    }

    /*for (let i = 0; i < displayCount; i++) {
        $('#nav').append(`
        <li id=linav${i} class="page-item contnav"><a id=page${i} class="page-link">${i+1}</a></li>
        `);

        $(`#page${i}`).click({i: i, pages: pages}, clickNavigation);
    }
    $(`#linav${current}`).addClass('active');*/

    //alert(current);

    if (current < half) {
        for (let i = 0; i < displayCount; i++) {
            $('#nav').append(`
        <li id=linav${i} class="page-item contnav"><a id=page${i} class="page-link">${i+1}</a></li>
        `);

            $(`#page${i}`).click({i: i, pages: pages}, clickNavigation);
        }
        $(`#linav${current}`).addClass('active');
    }
    else if (staticValue < pages - half) {
        let number = staticValue - half + 1;
        for (let i = 0; i < displayCount; i++) {
            $('#nav').append(`
        <li id=linav${i} class="page-item contnav"><a id=page${i} class="page-link">${number}</a></li>
        `);
            $(`#page${i}`).click({i: i, pages: pages}, clickNavigation);
            number++;
        }
        current = half;
        $(`#linav${current}`).addClass('active');
    }
    else {
        let number = pages - displayCount;
        for (let i = 0; i < displayCount; i++) {
            $('#nav').append(`
        <li id=linav${i} class="page-item contnav"><a id=page${i} class="page-link">${number}</a></li>
        `);
            $(`#page${i}`).click({i: i, pages: pages}, clickNavigation);
            number++;
        }
        $(`#linav${current}`).addClass('active');
    }

    $('#nav').append(`
    <li id="linext" class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
    `);

    if (current === displayCount - 1){
        $(`#linext`).addClass('disabled');
    } else {
        $(`#linext`).removeClass('disabled');
    }

}

$(window).on("load",
    function () {
        loadStatistics(staticValue);
        printNavigation();
        let oldVersion = getDBVersion();
        setInterval(function () {
            let newVersion = getDBVersion();
            if (newVersion === oldVersion) {
                return;
            }
            oldVersion = newVersion;
            $('#statisticstable').empty();
            loadStatistics(staticValue);
            printNavigation();
        }, 5000)
    }
);
