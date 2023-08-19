import axios from "axios";
import { fetchBreeds } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_cN2Up0hKvgIvqXtVFaUckvXElZKneik9YRcwu3Wa02xOF1zg0ESvEO80ojcDz33U";

const selectCats = document.querySelector(".breed-select");
const BASE_URL = `https://api.thecatapi.com/v1/breeds`;
const BREEDS_VOID = `https://api.thecatapi.com/v1/images/`;
const catInfoDiv = document.querySelector(".cat-info");

console.log(fetchBreeds(BASE_URL)
    .then((data) => selectCats.insertAdjacentHTML('beforeend', createMarkup(data)))
    .catch((err) => console.log(err)));

function createMarkup(arr) {
    return arr.map(({ reference_image_id, name }) => `
<option value="${reference_image_id}">${name}</option>`).join();
}

selectCats.addEventListener("change", onSelectorChange);

function onSelectorChange(e) {
    const id = e.currentTarget.value;
    console.log(id);
    const currentUrl = `${BREEDS_VOID}${id}`;
    fetchBreeds(currentUrl)
        .then((data) =>
catInfoDiv.insertAdjacentHTML("beforeend", `<img src="${data.url}" alt="${data.id}">
<h1>${data.breeds[0].name}</h1>
<p>${data.breeds[0].description}</p>
<p>${data.breeds[0].temperament}</p>`))     
        .catch((err) => console.log(err));
}


