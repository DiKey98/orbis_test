function authorize(event) {
    event.preventDefault();

    let login = $('#inputEmail').val();
    let password = $('#inputPassword').val();
    let where = GET('where');

    $.ajax({
        url: '../php/authorization.php',
        method: 'post',
        data: `login=${login}&password=${password}&where=${where}`,
        success: function (jsonData) {
            switch(jsonData)
            {
                case "0x1":
                {
                    $('#inputEmail').css({
                        borderColor: 'red',
                        borderWidth: '4px',
                    });
                    $('#loginInfo').html('неверный логин').css({
                        color: 'red'
                    });
                    break;
                }
                case "0x2":
                {
                    $('#inputPassword').css({
                        borderColor: 'red',
                        borderWidth: '5px',
                    });
                    $('#passwordInfo').html('неверный пароль').css({
                        color: 'red'
                    });
                    break;
                }
                case "0x0":
                {
                    redirect(where);
                }
            }
        }
    })
}

$(window).on("load",
    function () {
        $('#authButton').on('click', authorize);

        $('#inputEmail').focus(function () {
            $('#inputEmail').css({
                borderWidth: '0',
            });
            $('#loginInfo').html('');
        });

        $('#inputPassword').focus(function () {
            $('#inputPassword').css({
                borderWidth: '0',
            });
            $('#passwordInfo').html('');
        })
    }
);