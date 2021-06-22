import { getAllInterests, getAllRightNow, getAllDidYouKnow } from "./constants.js";
import { default as overviewBlockFn } from './overviewBlock.js';
import { default as featuredImagesBlockFn } from "./featuredImagesBlock.js";
import { default as photosBlockFn } from "./photosBlock.js";
import { default as thoughtsBlockFn } from "./thoughtsBlock.js";
import { default as videosBlockFn } from "./videosBlock.js";
import { default as audioClipsBlockFn } from "./audioClipsBlock.js";

var photosFetched = false;
var thoughtsFetched = false;
var videosFetched = false;
var audioClipsFetched = false;

(() => {
    overviewBlockFn();
    featuredImagesBlockFn();
    photosBlockFn();
    photosFetched = true;
    fetch(getAllInterests + '/?slug=hobbies', {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        response = response[0]['data'].sort(function (a, b) {
            return a.order - b.order;
        });
        var hobbiesBlock = document.getElementById('hobbiesBlock');
        var homeHobbiesBlock = document.createElement('div');
        homeHobbiesBlock.classList = 'homeHobbiesBlock w-100';
        var hobbiesHeading = document.createElement('h5');
        hobbiesHeading.classList = 'fw-normal mb-3';
        hobbiesHeading.innerHTML = 'Hobbies';
        response.forEach(element => {
            var buttonElement = document.createElement("button");
            buttonElement.innerHTML = element.name;
            buttonElement.classList = "btn btn-sm btn-light rounded-pill mb-2 me-2 border";
            homeHobbiesBlock.append(buttonElement);
        });
        var hobbiesText = document.createElement('p');
        hobbiesText.classList = 'text-muted text-center mb-0';
        hobbiesText.innerHTML = 'That&apos;s not everything&#x0021;';
        hobbiesBlock.append(hobbiesHeading, homeHobbiesBlock, hobbiesText);
    }).catch(function (error) {
        console.log("Error: " + error);
    });
    fetch(getAllRightNow, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        response = response.filter(x => x.status === 'active');
        response = response.sort(function (a, b) {
            return a.order - b.order;
        });
        var rightNowBlock = document.getElementById('rightNowBlock');
        rightNowBlock.classList = 'w-100';
        var rightNowHeadingBlock = document.createElement('div');
        rightNowHeadingBlock.classList = 'd-flex justify-content-between mb-2';
        var rightNowHeading = document.createElement('h5');
        rightNowHeading.innerHTML = 'Right now...';
        rightNowHeadingBlock.append(rightNowHeading);
        var rightNowFirstData = response.pop();
        var colElement = document.createElement("div");
        var cardElement = document.createElement("div");
        var cardBodyElement = document.createElement("div");
        var cardFooterElement = document.createElement("div");
        var titleElement = document.createElement("h5");
        var descriptionElement = document.createElement("p");
        var linkElement = document.createElement("p");
        var momentElement = document.createElement("small");
        colElement.classList = "col";
        cardElement.classList = "card h-100 shadow";
        cardBodyElement.classList = "card-body";
        cardFooterElement.classList = "card-footer d-flex justify-content-between";
        titleElement.classList = "card-title";
        titleElement.innerHTML = rightNowFirstData.title;
        descriptionElement.classList = "card-text";
        descriptionElement.innerHTML = rightNowFirstData.description;
        momentElement.innerHTML = new Date(rightNowFirstData.moment).toDateString();
        cardBodyElement.append(titleElement, descriptionElement, linkElement);
        cardFooterElement.append(momentElement);
        if (rightNowFirstData.link && rightNowFirstData.link.length) {
            var linkElement = document.createElement("button");
            var iconElement = document.createElement("i");
            var anchorElement = document.createElement("a");
            iconElement.classList = "bi bi-link-45deg";
            anchorElement.classList = "card-link ms-2";
            anchorElement.href = rightNowFirstData.link;
            anchorElement.target = "_blank";
            anchorElement.rel = 'nofollow noreferrer noopener';
            anchorElement.append(iconElement);
            cardFooterElement.append(anchorElement);
        }
        cardElement.append(cardBodyElement, cardFooterElement);
        colElement.append(cardElement);
        rightNowBlock.append(rightNowHeadingBlock, colElement);
    }).catch(function (error) {
        console.log("Error: " + error);
    });
    fetch(getAllDidYouKnow, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        response = response.sort(function (a, b) {
            return a.order - b.order;
        });
        var didYouKnowBlock = document.getElementById('didYouKnowBlock');
        didYouKnowBlock.classList = 'w-100';
        var didYouKnowHeadingBlock = document.createElement('div');
        didYouKnowHeadingBlock.classList = 'd-flex justify-content-between mb-2';
        var didYouKnowHeading = document.createElement('h5');
        didYouKnowHeading.innerHTML = 'Did you know?';
        didYouKnowHeadingBlock.append(didYouKnowHeading);
        var didYouKnowFirstData = response[0];
        var colElement = document.createElement("div");
        var cardElement = document.createElement("div");
        var cardBodyElement = document.createElement("div");
        var titleElement = document.createElement("h5");
        var descriptionElement = document.createElement("p");
        var linkElement = document.createElement("p");
        var momentElement = document.createElement("small");
        colElement.classList = "col";
        cardElement.classList = "card h-100 shadow";
        cardBodyElement.classList = "card-body";
        cardBodyElement.style.backgroundColor = didYouKnowFirstData.background;
        cardBodyElement.style.color = didYouKnowFirstData.color;
        titleElement.classList = "card-title";
        titleElement.innerHTML = didYouKnowFirstData.title;
        descriptionElement.classList = "card-text";
        descriptionElement.innerHTML = didYouKnowFirstData.description;
        momentElement.innerHTML = new Date(didYouKnowFirstData.moment).toDateString();
        cardBodyElement.append(titleElement, descriptionElement, linkElement);
        cardElement.append(cardBodyElement);
        colElement.append(cardElement);
        didYouKnowBlock.append(didYouKnowHeadingBlock, colElement);
    }).catch(function (error) {
        console.log("Error: " + error);
    });
})();

// click events
$('#homePhotosTab').on('click', function () {
    if (!photosFetched) photosBlockFn(); photosFetched = true;    
});
$('#homeThoughtsTab').on('click', function () {
    if (!thoughtsFetched) thoughtsBlockFn(); thoughtsFetched = true;
});
$('#homeVideosTab').on('click', function () {
    if (!videosFetched) videosBlockFn(); videosFetched = true;
});
$('#homeAudioTab').on('click', function () {
    if (!audioClipsFetched) audioClipsBlockFn(); audioClipsFetched = true;
});