import { getBasicInfo } from "./constants.js";
export default () => {
    (() => {
        fetch(getBasicInfo, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            response = response[0];
            var overviewBlock = document.getElementById('overviewBlock');
            overviewBlock.classList = 'w-100';
            var overviewHeading = document.createElement('h5');
            overviewHeading.classList = 'overviewHeading fw-normal mb-3';
            overviewHeading.innerHTML = 'Overview';
            // var currentCity = document.createElement('p');
            // currentCity.classList = 'd-flex align-items-start';
            // var currentCityIcon = document.createElement('i');
            // currentCityIcon.classList = 'bi bi-house me-2';
            // var currentCityText = document.createElement('span');
            // currentCityText.innerHTML = 'Lives in' + ' ' + response.address.currentCity;
            // currentCity.append(currentCityIcon, currentCityText);
            // var homeTown = document.createElement('p');
            // homeTown.classList = 'd-flex align-items-start';
            // var homeTownIcon = document.createElement('i');
            // homeTownIcon.classList = 'bi bi-geo-alt me-2';
            // var homeTownText = document.createElement('span');
            // homeTownText.innerHTML = 'From' + ' ' + response.address.homeTown;
            // homeTown.append(homeTownIcon, homeTownText);
            var relationshipStatus = document.createElement('p');
            relationshipStatus.classList = 'd-flex align-items-start';
            var relationshipStatusIcon = document.createElement('i');
            relationshipStatusIcon.classList = 'bi bi-heart-half me-2';
            var relationshipStatusText = document.createElement('span');
            relationshipStatusText.innerHTML = response.basicDetails.relationshipStatus.content;
            relationshipStatus.append(relationshipStatusIcon, relationshipStatusText);
            var religion = document.createElement('p');
            religion.classList = 'd-flex align-items-start';
            var religionIcon = document.createElement('i');
            religionIcon.classList = 'bi bi bi-peace me-2';
            var religionText = document.createElement('span');
            religionText.innerHTML = response.basicDetails.religion.content;
            religion.append(religionIcon, religionText);
            var birthday = document.createElement('p');
            birthday.classList = 'd-flex align-items-start';
            var birthdayIcon = document.createElement('i');
            birthdayIcon.classList = 'bi bi-gift me-2';
            var birthdayText = document.createElement('span');
            birthdayText.innerHTML = response.basicDetails.birthday.content;
            birthday.append(birthdayIcon, birthdayText);
            var telegram = document.createElement('p');
            telegram.classList = 'd-flex align-items-start';
            var telegramIcon = document.createElement('i');
            telegramIcon.classList = 'bi bi-telegram me-2';
            var telegramText = document.createElement('a');
            var link = response.contact.filter(x => x.name === 'telegram')[0].link;
            telegramText.href = link;
            telegramText.target = '_blank';
            telegramText.rel = 'nofollow noreferrer noopener';
            telegramText.innerHTML = 'mohansaginala';
            telegram.append(telegramIcon, telegramText);
            overviewBlock.append(overviewHeading, relationshipStatus, religion, birthday, telegram);
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    })();
}
