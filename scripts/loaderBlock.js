export default function () {
    (() => {
        var loaderBlock = document.getElementById('defaultLoader');
        if (loaderBlock) {
            var spinner = document.createElement('div');
            spinner.classList = 'spinner-grow';
            spinner.setAttribute('role', 'status');
            var spinnerText = document.createElement('span');
            spinnerText.classList = 'visually-hidden';
            spinnerText.innerHTML = 'Loading...';
            spinner.append(spinnerText);
            loaderBlock.append(spinner);
        }
    })();
}