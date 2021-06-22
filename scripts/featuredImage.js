import { getAllFeaturedImages } from "./constants.js";
import { default as overviewBlockFn } from './overviewBlock.js';
import { usernameBlockFn } from "./usernameBlock.js";
import { default as featuredImagesBlockFn } from "./featuredImagesBlock.js";
const featuredImageID = (new URLSearchParams(window.location.search)).get('id');

(() => {
    overviewBlockFn();
    featuredImagesBlockFn();
    fetch(getAllFeaturedImages + '/?_id=' + featuredImageID, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        response = response[0];
        var featuredImageData;
        featuredImageData = response;
        document.title = featuredImageData.description;
        var featuredImage = document.createElement('img');
        featuredImage.classList = "img-fluid";
        featuredImage.src = featuredImageData['media'][0].src;
        $('.featuredImage .featuredImageContent .card .card-body .featuredImageBlock').prepend(featuredImage);
        $('.featuredImage .featuredImageContent .card .card-body .featuredImageBlock .featuredImageDescription .featuredImageDescriptionDetail').html(featuredImageData.description);
        var usernameBlock = document.getElementsByClassName('usernameBlock')[0];
        usernameBlock.setAttribute('blockMoment', (featuredImageData.moment !== undefined && featuredImageData.moment !== null && featuredImageData.moment !== '') ? new Date(featuredImageData.moment).toDateString() : '');
        usernameBlock.setAttribute('blockLocation', (featuredImageData.location.name !== undefined && featuredImageData.location.name !== null && featuredImageData.location.name !== '') ? featuredImageData.location.name : '');
        usernameBlockFn();
    }).catch(function (error) {
        console.log("Error: " + error);
    });
})();