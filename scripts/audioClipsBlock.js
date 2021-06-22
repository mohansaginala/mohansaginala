import { getAllAudioClips } from "./constants.js";
export default () => {
    (() => {
        var audioClipsBlock = document.getElementById('audioClipsBlock');
        audioClipsBlock.innerHTML = '';
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
        audioClipsBlock.append(loaderBlock);
        fetch(getAllAudioClips, {
            method: "get",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (response) {
            var audioClipsGalleryBlock = document.createElement('div');
            audioClipsGalleryBlock.classList = 'col-12 audioClipsGalleryBlock';
            var audioClipsGallery = document.createElement('div');
            audioClipsGallery.classList = 'row row-cols-2 row-cols-md-3 row-cols-lg-4 audioClipsGallery';
            var audioClipsData = response.filter(x => x.status === 'active');
            audioClipsData = audioClipsData.sort(function (a, b) {
                return a.order - b.order;
            });
            audioClipsData.forEach(audio => {
                var audioBackground = document.createElement("div");
                audioBackground.classList = "audioBackground position-relative bg-white mb-4";
                var audioClipBlock = document.createElement("div");
                audioClipBlock.classList = "audioClipBlock w-100 h-100 position-relative";
                var audioBackgroundImage = document.createElement("img");
                audioBackgroundImage.classList = "audioBackgroundImage";
                audioBackgroundImage.src = audio.poster;
                var audioInfo = document.createElement("a");
                audioInfo.tabIndex = 0;
                audioInfo.classList = "audioInfo d-flex align-items-center justify-content-center";
                audioInfo.setAttribute("data-bs-toggle", "popover");
                audioInfo.setAttribute("data-bs-trigger", "focus");
                audioInfo.setAttribute("title", audio.title);
                audioInfo.setAttribute("data-bs-placement", "bottom");
                audioInfo.setAttribute("data-bs-content", audio.description);
                var audioInfoIcon = document.createElement("i");
                audioInfoIcon.classList = "bi bi-info-circle";
                audioInfo.append(audioInfoIcon);
                var audioElement = document.createElement("audio");
                audioElement.classList = "audioClip position-absolute w-100";
                audioElement.controls = true;
                var audioSourceElement = document.createElement("source");
                audioSourceElement.src = audio.src;
                audioSourceElement.type = "audio/mpeg";
                audioElement.append(audioSourceElement);
                audioClipBlock.append(audioBackgroundImage, audioInfo, audioElement);
                audioBackground.append(audioClipBlock);
                audioClipsGallery.prepend(audioBackground);
            });
            audioClipsGalleryBlock.append(audioClipsGallery);
            audioClipsBlock.innerHTML = '';
            audioClipsBlock.append(audioClipsGalleryBlock);
            var audioPopoverList = document.getElementsByClassName('audioInfo');
            Array.from(audioPopoverList).forEach(audioPopover => {
                return new bootstrap.Popover(audioPopover, { "trigger": "focus" });
            });
        }).catch(function (error) {
            console.log("Error: " + error);
        });
    })();
}