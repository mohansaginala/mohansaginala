import { getAllThoughts } from "./constants.js";
import { usernameBlockFn } from "./usernameBlock.js";
export default function () {
    (() => {
        var thoughtsBlock = document.getElementById('thoughtsBlock');
        thoughtsBlock.innerHTML = '';
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
        thoughtsBlock.append(loaderBlock);
        fetch(getAllThoughts, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            var thoughtGalleryBlock = document.createElement('div');
            thoughtGalleryBlock.classList = 'w-100 thoughtsGalleryBlock d-flex flex-wrap';
            var thoughtGallery = document.createElement('ul');
            thoughtGallery.classList = 'w-100 list-group list-group-flush thoughtGallery';
            var thoughtsData = response.filter(x => x.status === 'active');
            thoughtsData = thoughtsData.sort(function (a, b) {
                return a.order - b.order;
            });
            thoughtsData.forEach(element => {
                var thoughtBlock = document.createElement('li');
                thoughtBlock.classList = 'list-group-item thought';
                var usernameBlock = document.createElement('div');
                usernameBlock.classList = 'usernameBlock';
                usernameBlock.setAttribute('blockMoment', (element.moment !== undefined && element.moment !== null && element.moment !== '') ? new Date(element.moment).toDateString() : '');
                usernameBlock.setAttribute('blockLocation', (element.location !== undefined && element.location !== null && element.location !== '') ? element.location : '');
                var thoughtContent = document.createElement('div');
                thoughtContent.classList = 'thoughtContent my-3';
                var blockquote = document.createElement('blockquote');
                blockquote.classList = 'blockquote';
                var quote = document.createElement('quote');
                quote.innerHTML = element.content;
                blockquote.append(quote);
                var thoughttagsBlock = document.createElement('div');
                thoughttagsBlock.classList = 'thoughttagsBlock d-flex align-items-start';
                var tagsIcon = document.createElement('i');
                tagsIcon.classList = 'bi bi-tags';
                var thoughtTags = document.createElement('div');
                thoughtTags.classList = 'thoughtTags ms-2';
                element['tags'].forEach(tag => {
                    var tagElement = document.createElement('a');
                    tagElement.classList = 'thoughtTag py-2 px-3 me-2 mb-2 badge rounded-pill bg-light text-secondary';
                    tagElement.href = 'https://blog.mohansaginala.com/?tag=' + tag;
                    tagElement.target = '_blank';
                    tagElement.innerHTML = tag;
                    thoughtTags.append(tagElement);
                });
                thoughttagsBlock.append(tagsIcon, thoughtTags);
                thoughtContent.append(blockquote, thoughttagsBlock);
                thoughtBlock.append(usernameBlock, thoughtContent);
                thoughtGallery.prepend(thoughtBlock);
            });
            thoughtGalleryBlock.append(thoughtGallery);
            thoughtsBlock.innerHTML = '';
            thoughtsBlock.append(thoughtGalleryBlock);
            usernameBlockFn();
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    })();
}