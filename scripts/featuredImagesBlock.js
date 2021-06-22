import { getAllFeaturedImages } from "./constants.js";
export default () => {
    (() => {
        fetch(getAllFeaturedImages, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            data = data.filter(x => x.status === 'active');
            data = data.sort(function (a, b) {
                return b.order - a.order;
            });
            var featuredImagesBlock = document.getElementById('featuredImagesBlock');
            var featuredImagesHeading = document.createElement('h5');
            featuredImagesHeading.innerHTML = 'Featured Images';
            var featuredImages = document.createElement('div');
            featuredImages.classList = 'w-100 position-relative featuredImages';
            var featuredImagesLeftIcon = document.createElement('i');
            featuredImagesLeftIcon.classList = 'bi bi-chevron-left featuredImagesArrows featuredImagesLeft';
            var featuredImagesRightIcon = document.createElement('i');
            featuredImagesRightIcon.classList = 'bi bi-chevron-right featuredImagesArrows featuredImagesRight';
            var featuredImagesSection = document.createElement('div');
            featuredImagesSection.classList = 'featuredImagesSection w-100 py-4';
            data.forEach(element => {
                var featuredImageBlock = document.createElement("div");
                var featuredImageLink = document.createElement("a");
                featuredImageLink.href = "/featured/image/?id=" + element._id;
                featuredImageBlock.classList = "featuredImageBlock";
                var featuredImage = document.createElement("img");
                featuredImage.classList = "featuredImage";
                featuredImage.src = element["media"][0].thumbnail;
                featuredImageLink.append(featuredImage);
                featuredImageBlock.append(featuredImageLink);
                featuredImagesSection.append(featuredImageBlock);
            });
            featuredImages.append(featuredImagesLeftIcon, featuredImagesSection, featuredImagesRightIcon);
            featuredImagesBlock.append(featuredImagesHeading, featuredImages);
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    })();
    $(document).on('click', '#featuredImagesBlock .featuredImagesLeft', function () {
        $('#featuredImagesBlock .featuredImagesSection').stop();
        $('#featuredImagesBlock .featuredImagesSection').animate({ scrollLeft: '-=300px' }, 500);
    });
    $(document).on('click', '#featuredImagesBlock .featuredImagesRight', function () {
        $('#featuredImagesBlock .featuredImagesSection').stop();
        $('#featuredImagesBlock .featuredImagesSection').animate({ scrollLeft: '+=300px' }, 500);
    });
}