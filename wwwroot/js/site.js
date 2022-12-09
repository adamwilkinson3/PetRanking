// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


$(document).ready(function () {
    var currentPic = '';
    var imageRating = 0;
    var blk = 'black';
    var gld = 'gold';
    function getPet() {
        $.get("https://api.thecatapi.com/v1/images/search", function (data, status) {
            $(".pet-image").attr("src", data[0].url)
            currentPic = data[0].url;
        })
    }
    getPet();

    $(".star").on({
        mouseenter: function () {
            if (imageRating === 0) {
                var rating = parseInt($(this).attr("id").split("-")[0])
                for (i = rating; i > 0; i--) {
                    $(`#${i}-star`).css("color", "gold")
                }
            }
        },
        mouseleave: function () {
            if (imageRating === 0) {
                $(".star").css("color", "black")
            }
        },
        click: function () {
            imageRating = parseInt($(this).attr("id").split("-")[0])
            $(".star").css("color", "black")
            for (i = imageRating; i > 0; i--) {
                $(`#${i}-star`).css("color", "gold")
            }
        }
    })

    $("#next-button").click(function () {
        if (imageRating > 0) {
            var individualRating = [blk, blk, blk, blk, blk];
            for (i = 0; i < imageRating; i++) {
                individualRating[i] = gld;
            }
            imageRating = 0;
            $(".star").css("color", "black")

            $(".rated-images-container").append(`
                <div class="ratings" style="background: url(${currentPic}) center; background-size: cover;">
                    <i class="fa fa-star" id="1-star" style="color: ${individualRating[0]}"></i>
                    <i class="fa fa-star" id="2-star" style="color: ${individualRating[1]}"></i>
                    <i class="fa fa-star" id="3-star" style="color: ${individualRating[2]}"></i>
                    <i class="fa fa-star" id="4-star" style="color: ${individualRating[3]}"></i>
                    <i class="fa fa-star" id="5-star" style="color: ${individualRating[4]}"></i>
                </div>
            `);
        }
        getPet();
    })


})