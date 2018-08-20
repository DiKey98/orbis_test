$(window).on("load",
    function () {
        $('#tolistener').on('click', function () {
            location.href = "../index.html"
        });
        $('#tomoderator').on('click', function () {
            location.href = "./moderatorpage.html";
        });
        $('#tospeaker').on('click', function () {
            location.href = "./speakerpage.html";
        });
        $('#tostatistics').on('click', function () {
            location.href = "./statistics.html"
        });
    }
);