import * as components from "./components.js";
import * as fetches from "./fetches.js";

const params = new URLSearchParams(location.search);
const id = params.get("id");

const idUrl = `https://striveschool-api.herokuapp.com/books/${id}`;

let showDetail = async () => {
  const bookDetails = await fetches.getBookDetails(idUrl);
  components.createBookDetail(
    bookDetails.img,
    bookDetails.title,
    bookDetails.category,
    bookDetails.price
  );
};

window.onload = showDetail;
