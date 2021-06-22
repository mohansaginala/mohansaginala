import { getAllVideos } from "./constants.js";
import { default as overviewBlockFn } from './overviewBlock.js';
import { usernameBlockFn } from "./usernameBlock.js";
import { default as videosBlockFn } from "./videosBlock.js";
let postID = (new URLSearchParams(window.location.search)).get('id');
(() => {
    overviewBlockFn();
    if (postID !== "" && postID !== null && postID !== undefined) {
        fetch(getAllVideos + '/?_id=' + postID, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            response = response[0];
            document.title = response.description;
            var videoElementBlock = document.createElement("div");
            videoElementBlock.classList = "col";
            var videoElement = document.createElement("video");
            var videoSourceElement = document.createElement("source");
            videoSourceElement.src = response.src;
            videoSourceElement.type = "video/mp4";
            videoElement.append(videoSourceElement);
            videoElement.style.width = "100%";
            videoElement.style.maxHeight = "50vh";
            videoElement.poster = response.poster;
            videoElement.controls = true;
            videoElementBlock.append(videoElement);
            $('.singleVideoBlock').append(videoElementBlock);
            var usernameBlock = document.getElementsByClassName('usernameBlock')[0];
            usernameBlock.setAttribute('blockMoment', (response.moment !== undefined && response.moment !== null && response.moment !== '') ? new Date(response.moment).toDateString() : '');
            usernameBlock.setAttribute('blockLocation', (response.location.name !== undefined && response.location.name !== null && response.location.name !== '') ? response.location.name : '');
            $('.singleVideo .singleVideoContent .card .card-body .videoContent .videoDescription .videoDescriptionDetail').html(response.description);
            usernameBlockFn();
            videosBlockFn();
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    } else {
        window.location.href = '/404.html';
    }
})();