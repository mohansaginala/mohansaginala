import { getProfileDetails, getAllPhotos } from "./constants.js";
import { default as overviewBlockFn } from './overviewBlock.js';
import { usernameBlockFn } from "./usernameBlock.js";
import { default as photosBlockFn } from "./photosBlock.js";
let postID = (new URLSearchParams(window.location.search)).get('id');
(() => {
    overviewBlockFn();
    if (postID === 'dp') {
        fetch(getProfileDetails, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            response = response[0];
            document.title = response.profilePicture.description;
            var postImage = document.createElement('img');
            postImage.classList = "img-fluid";
            postImage.src = response.profilePicture.full.src;
            $('.singlePost .singlePostContent .card .card-body .postContent #postContentCarousel').addClass("d-none");
            $('.singlePost .singlePostContent .card .card-body .postContent').prepend(postImage);
            $('.singlePost .singlePostContent .card .card-body .postContent .postDescription .postDescriptionDetail').html(response.profilePicture.description);
            var usernameBlock = document.getElementsByClassName('usernameBlock')[0];
            usernameBlock.setAttribute('blockMoment', (response.profilePicture.moment !== undefined && response.profilePicture.moment !== null && response.profilePicture.moment !== '') ? new Date(response.profilePicture.moment).toDateString() : '');
            usernameBlock.setAttribute('blockLocation', (response.profilePicture.location.name !== undefined && response.profilePicture.location.name !== null && response.profilePicture.location.name !== '') ? response.profilePicture.location.name : '');
            usernameBlockFn();
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    } else if (postID === 'cover') {
        fetch(getProfileDetails, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            response = response[0];
            document.title = response.cover.description;
            var postImage = document.createElement('img');
            postImage.classList = "img-fluid";
            postImage.src = response.cover.full.src;
            $('.singlePost .singlePostContent .card .card-body .postContent #postContentCarousel').addClass("d-none");
            $('.singlePost .singlePostContent .card .card-body .postContent').prepend(postImage);
            $('.singlePost .singlePostContent .card .card-body .postContent .postDescription .postDescriptionDetail').html(response.cover.description);
            var usernameBlock = document.getElementsByClassName('usernameBlock')[0];
            usernameBlock.setAttribute('blockMoment', (response.cover.moment !== undefined && response.cover.moment !== null && response.cover.moment !== '') ? new Date(response.cover.moment).toDateString() : '');
            usernameBlock.setAttribute('blockLocation', (response.cover.location.name !== undefined && response.cover.location.name !== null && response.cover.location.name !== '') ? response.cover.location.name : '');
            usernameBlockFn();
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    } else if (postID !== "" && postID !== null && postID !== undefined) {
        fetch(getAllPhotos + '/?_id=' + postID, {
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
            if (response["media"].length > 1) {
                response["media"].forEach((postImage, index) => {
                    var carouselItem = document.createElement("div");
                    if (index === 0) {
                        carouselItem.classList = "carousel-item active";
                    } else {
                        carouselItem.classList = "carousel-item";
                    }
                    var postImage = document.createElement('img');
                    postImage.src = response['media'][index].src;
                    postImage.classList = "d-block w-100 postImage bg-dark";
                    carouselItem.append(postImage);
                    $('.singlePost .singlePostContent .card .card-body .postContent #postContentCarousel .carousel-inner').append(carouselItem);
                });
                $('.singlePost .singlePostContent .card .card-body .postContent .postDescription .postDescriptionDetail').html(response.description);
                var usernameBlock = document.getElementsByClassName('usernameBlock')[0];
                usernameBlock.setAttribute('blockMoment', (response.moment !== undefined && response.moment !== null && response.moment !== '') ? new Date(response.moment).toDateString() : '');
                usernameBlock.setAttribute('blockLocation', (response.location.name !== undefined && response.location.name !== null && response.location.name !== '') ? response.location.name : '');
                usernameBlockFn();
            } else if (response["media"].length === 1) {
                var postImage = document.createElement('img');
                postImage.classList = "img-fluid";
                postImage.src = response['media'][0].src
                $('.singlePost .singlePostContent .card .card-body .postContent #postContentCarousel').addClass("d-none");
                $('.singlePost .singlePostContent .card .card-body .postContent').prepend(postImage);
                $('.singlePost .singlePostContent .card .card-body .postContent .postDescription .postDescriptionDetail').html(response.description);
                var usernameBlock = document.getElementsByClassName('usernameBlock')[0];
                usernameBlock.setAttribute('blockMoment', (response.moment !== undefined && response.moment !== null && response.moment !== '') ? new Date(response.moment).toDateString() : '');
                usernameBlock.setAttribute('blockLocation', (response.location.name !== undefined && response.location.name !== null && response.location.name !== '') ? response.location.name : '');
                usernameBlockFn();
            } else {
                return false;
            }
        }).catch(function (error) {
            console.log("Response Error: " + error);
        });
    } else {
        window.location.href = '/404.html';
    }
    photosBlockFn();
})();