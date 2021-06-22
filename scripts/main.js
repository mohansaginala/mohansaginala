import { getProfileDetails } from "./constants.js";
import { default as loaderBlock } from './loaderBlock.js';

(() => {
    var js_script = document.createElement('script');
    js_script.type = "text/javascript";
    js_script.src = "https://www.googletagmanager.com/gtag/js?id=G-RXXNSJR0BS";
    js_script.async = true;
    document.getElementsByTagName('head')[0].appendChild(js_script);
})();

(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-RXXNSJR0BS');
})();

(() => {
    loaderBlock();
    if (!$('.mainWrapper').hasClass('nofooter')) {
        var mainWrapper = document.getElementsByClassName('mainWrapper')[0];
        var footer = document.createElement('footer');
        var footerBlock = document.createElement('div');
        footerBlock.classList = 'footerBlock bg-dark w-100';
        var copyrightSection = document.createElement('div');
        copyrightSection.classList = 'container-fluid bg-light text-secondary text-center copyrightSection p-1';
        var copyright = document.createElement('span');
        copyright.innerHTML = 'Mohan Saginala Creations | 2021';
        copyrightSection.append(copyright);
        footerBlock.append(copyrightSection);
        footer.append(footerBlock);
        mainWrapper.append(footer);
    }
})();
var profilePictureAction;
(() => {
    if (!$('.mainWrapper').hasClass('nobanner')) {
        fetch(getProfileDetails, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            hideLoader();
            return response.json();
        }).then(function (response) {
            response = response[0];
            var bannerBlock = document.getElementById('bannerBlock');
            // banner section
            var bannerSection = document.createElement('div');
            bannerSection.classList = 'bannerSection';
            var bannerImage = document.createElement('img');
            bannerImage.src = response.cover.thumbnail.src;
            bannerImage.classList = 'img-fluid bannerImage';
            bannerImage.onclick = () => { window.location.href = '/single/post/?id=cover' };
            bannerSection.append(bannerImage);
            bannerBlock.append(bannerSection);
            // profile section
            var profilePictureSection = document.createElement('div');
            profilePictureSection.classList = 'profilePictureSection';
            var profilePictureBlock = document.createElement('div');
            profilePictureBlock.classList = 'profilePictureBlock mb-2';
            var storyStatus = document.createElement('div');
            storyStatus.classList = 'storyStatus';
            var profilePictureLink = document.createElement('div');
            profilePictureLink.classList = 'profilePictureLink';
            var profilePictureImage = document.createElement('img');
            profilePictureImage.src = response.profilePicture.thumbnail.src;
            profilePictureImage.id = 'profilePicture';
            profilePictureImage.classList = 'profilePicture rounded-circle mx-auto d-block';
            profilePictureImage.onclick = function () { window.location.href = '/single/post/?id=dp' };
            profilePictureImage.tabIndex = 0;
            profilePictureImage.classList = 'profilePicture rounded-circle mx-auto d-block';
            profilePictureLink.append(profilePictureImage);
            storyStatus.append(profilePictureLink);
            var fullName = document.createElement('h1');
            fullName.classList = 'text-center mb-0';
            var homePageLink = document.createElement('span');
            homePageLink.classList = 'fullName fs-4';
            homePageLink.onclick = () => { window.location.href = '/' };
            homePageLink.innerHTML = response.name;
            fullName.append(homePageLink);
            var status = document.createElement('p');
            status.classList = 'text-center mb-0 fw-lighter fs-6';
            status.innerHTML = response.status;
            profilePictureBlock.append(storyStatus);
            profilePictureSection.append(profilePictureBlock, fullName, status);
            bannerBlock.append(profilePictureSection);
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    } else {
        hideLoader();
    }
})();
function hideLoader() {
    $('#defaultLoader').fadeOut("slow");
}

$(document).ready(function () {
});
$(window).on("load", function () {
});
$(window).on("resize", function () {
});
$(window).scroll(function () {
});