const count = 10;
const apiKey = 'client_id=7l3H3TyOX2xyaK-CAx0-PQRj0lhWPxDdwgtXGMtQFUc';
const apiUrl = `https://api.unsplash.com/photos/random/?${apiKey}&count=${count}`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = true;

let photos = [];

function createContainerElement(elementType, attributes) {
    const newElement = document.createElement(elementType);
    for (const key in attributes) {
        newElement.setAttribute(key, attributes[key]);
    }
    return newElement;
}

function displayPhotos() {
    photos.forEach((photo) => {
        // Create an <a> (anchor) element for picture links to add to the image container
        let anchor = createContainerElement('a', { href: photo.links.html, target: '_blank' });
        // // Create the image to show
        let image = createContainerElement('img', { src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description });
        imageContainer.appendChild(anchor).appendChild(image);
        ready = true;
        loader.hidden = true;
    });
}
async function getPhotosViaAPI() {
    try {
        const response = await fetch(apiUrl);
        photos = await response.json();
       // console.log(photos[0]);
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    //console.log(window.innerHeight + "/" + window.scrollY + '/' + document.body.offsetHeight);
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotosViaAPI();
    }
})

getPhotosViaAPI();