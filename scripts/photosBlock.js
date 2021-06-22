import { getAllPhotos } from "./constants.js";
let postID = (new URLSearchParams(window.location.search)).get('id');
export default function () {
    (() => {
        var photosBlock = document.getElementById('photosBlock');
        photosBlock.innerHTML = '';
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
        photosBlock.append(loaderBlock);
        fetch(getAllPhotos, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            var photoGalleryBlock = document.createElement('div');
            photoGalleryBlock.classList = 'col-12 photoGalleryBlock';
            var photoGallery = document.createElement('div');
            photoGallery.classList = 'row photoGallery';
            var photosData = response.filter(x => x.status === 'active');
            photosData = photosData.sort(function (a, b) {
                return a.order - b.order;
            });
            photosData.forEach((element, index) => {
                if (postID !== element._id) {
                    var imageElement = document.createElement('img');
                    imageElement.classList = 'photoGalleryImage w-100';
                    imageElement.src = element['media'][0].thumbnail;
                    var blockElement = document.createElement('a');
                    blockElement.href = '/single/post/?id=' + element._id;
                    blockElement.classList = 'photoGalleryBlock p-0';
                    blockElement.append(imageElement);
                    photoGallery.prepend(blockElement);
                }
            });
            photoGalleryBlock.append(photoGallery);
            photosBlock.innerHTML = '';
            photosBlock.append(photoGalleryBlock);
            $('.photoGallery').masonry({
                itemSelector: '.photoGalleryBlock',
                percentPosition: true,
                initLayout: false
            });
        }).then(function () {
            $('.photoGallery').imagesLoaded().progress(function () {
                $('.photoGallery').masonry('layout');
            });
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    })();
}