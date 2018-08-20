$(window).on("load",
    function () {
        $('#tolistener').on('click', function () {
            location.href = "./index.html"
        });
        $('#tomoderator').on('click', function () {
            location.href = "./pages/moderatorpage.html";
        });
        $('#tospeaker').on('click', function () {
            location.href = "./pages/speakerpage.html";
        });
        $('#tostatistics').on('click', function () {
            location.href = "./pages/statistics.html"
        });
    }
);