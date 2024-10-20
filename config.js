
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}

Promise.all([
    loadScript('Js/main.js'),
    loadScript('Js/script.js')
]).then(() => {
    console.log('All scripts loaded successfully.');
}).catch(error => {
    console.error(error);
});
