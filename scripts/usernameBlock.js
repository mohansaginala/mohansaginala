import { getProfileDetails } from "./constants.js";
export function usernameBlockFn() {
    fetch(getProfileDetails, {
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        var profileData = response[0];
        var usernameBlocks = document.getElementsByClassName('usernameBlock');
        Array.from(usernameBlocks).forEach(usernameElement => {
            var usernameElementBlock = document.createElement('div');
            usernameElementBlock.classList = 'd-flex align-items-start';
            var dpThumbnail = document.createElement('img');
            dpThumbnail.classList = 'dpThumbnail';
            dpThumbnail.src = profileData.profilePicture.smallThumbnail.src;
            var wholeDetailsBlock = document.createElement('div');
            var username = document.createElement('a');
            username.href = '/';
            username.classList = 'fw-bold me-2 username';
            username.innerHTML = profileData.username;
            var detailsBlock = document.createElement('div');
            detailsBlock.classList = 'fw-lighter text-secondary d-flex flex-row align-items-center flex-wrap';
            (usernameElement.getAttribute('blockMoment') && (usernameElement.getAttribute('blockMoment')).length) ? (() => {
                var momentBlock = document.createElement('div');
                momentBlock.classList = 'momentBlock';
                momentBlock.innerHTML = new Date(usernameElement.getAttribute('blockMoment')).toDateString();
                detailsBlock.append(momentBlock);
            })() : (() => { })();
            (usernameElement.getAttribute('blockLocation') && (usernameElement.getAttribute('blockLocation')).length) ? (() => {
                var locationBlock = document.createElement('div');
                locationBlock.classList = 'locationBlock';
                locationBlock.innerHTML = usernameElement.getAttribute('blockLocation');
                detailsBlock.append(locationBlock);
            })() : (() => { })();
            wholeDetailsBlock.append(username, detailsBlock);
            usernameElementBlock.append(dpThumbnail, wholeDetailsBlock);
            usernameElement.append(usernameElementBlock);
        });
    }).catch(function (error) {
        console.log("Error: " + error);
    });
}