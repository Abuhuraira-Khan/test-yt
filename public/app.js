const urlInp = document.getElementById('url');
const getBtn = document.getElementById('get');
const video = document.getElementById('video');
const download = document.getElementById('download');

getBtn.addEventListener('click', () => {
    fetchVideo(urlInp.value);
});

const fetchVideo = async (url) => {
    try {
        const response = await fetch(`http://localhost:3000/getVideo?url=${url}`);
        const data = await response.json();
        console.log(data.info);
        // video.src = data.url;
    } catch (error) {
        console.error(error);
    }
}