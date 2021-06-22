import { getAllVideos } from "./constants.js";
let videoID = (new URLSearchParams(window.location.search)).get('id');
export default () => {
    (() => {
        var videosBlock = document.getElementById('videosBlock');
        videosBlock.innerHTML = '';
        var loaderBlock = document.createElement('div');
        loaderBlock.classList = 'text-center';
        var spinner = document.createElement('div');
        spinner.classList = 'spinner-grow';
        spinner.setAttribute('role', 'status');
        var spinnerText = document.createElement('span');
        spinnerText.classList = 'visually-hidden';
        spinnerText.innerHTML = 'Loading...';
        spinner.append(spinnerText);
        loaderBlock.append(spinner);
        videosBlock.append(loaderBlock);
        fetch(getAllVideos, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            var videosGalleryBlock = document.createElement('div');
            videosGalleryBlock.classList = 'col-12 videosGalleryBlock';
            var videosGallery = document.createElement('div');
            videosGallery.classList = 'row row-cols-1 row-cols-lg-3 videosGallery';
            var videosData = response.filter(x => x.status === 'active');
            videosData = videosData.sort(function (a, b) {
                return b.order - a.order;
            });
            videosData.forEach(video => {
                if (videoID !== video._id) {
                    var videoElementBlock = document.createElement("a");
                    videoElementBlock.classList = "col mb-4";
                    videoElementBlock.href = "/single/video/?id=" + video._id;
                    var videoPosterElement = document.createElement("img");
                    videoPosterElement.src = video.poster;
                    videoPosterElement.classList = "position-relative";
                    var videoPosterBackground = document.createElement("img");
                    videoPosterBackground.src = video.poster;
                    videoPosterBackground.classList = "videoPosterBackground";
                    var videoPosterBackgroundBlock = document.createElement("div");
                    videoPosterBackgroundBlock.classList = "videoPosterBackgroundBlock";
                    var videoPlayIconBlock = document.createElement("div");
                    var videoOverlayBlock = document.createElement("div");
                    videoOverlayBlock.classList = "videoOverlayBlock position-relative";
                    videoPlayIconBlock.classList = "videoPlayIconBlock";
                    var videoPlayIcon = document.createElement("i");
                    videoPlayIcon.classList = "bi bi-play-btn text-white fs-1";
                    videoPlayIconBlock.append(videoPlayIcon);
                    videoOverlayBlock.append(videoPosterBackground, videoPosterBackgroundBlock, videoPosterElement, videoPlayIconBlock);
                    videoElementBlock.append(videoOverlayBlock);
                    videosGallery.append(videoElementBlock);
                }
            });
            videosGalleryBlock.append(videosGallery);
            videosBlock.innerHTML = '';
            videosBlock.append(videosGalleryBlock);
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    })();
}