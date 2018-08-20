$(window).on("load",
    function () {
        $('#submitquestion').click(function (event) {
            event.preventDefault();
            $.ajax({
                url: "./php/addquestion.php",
                method: "post",
                data : "question=" + $('#questioninput').val(),
                success: function () {
                    alert("Вопрос успешно отправлен !!!");
                }
            });
            $('#questionform')[0].reset();
        });
    }
);