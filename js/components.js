const container = document.querySelector(".main");
const modalBody = document.querySelector(".modal-body");

export const cardAppendChild = (src, title, desc, price, id) => {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card", "col-3");

  const cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.setAttribute("src", src);

  cardWrapper.appendChild(cardImg);

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.setAttribute("id", id);

  cardWrapper.appendChild(cardBody);

  const TitleLink = document.createElement("a")
  TitleLink.classList.add("card-title_link")
  TitleLink.setAttribute("href", `detail.html?id=${id}`)
  TitleLink.setAttribute("target", "_blank")

  cardBody.appendChild(TitleLink)

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "text-truncate");
  cardTitle.textContent = title;

  TitleLink.appendChild(cardTitle);

  const cardDesc = document.createElement("p");
  cardDesc.classList.add("card-text", "text-truncate");
  cardDesc.textContent = desc;

  cardBody.appendChild(cardDesc);

  const cardBtn = document.createElement("a");
  cardBtn.classList.add("btn", "btn-primary", "text-truncate", "card_btn");
  cardBtn.setAttribute("href", "#");
  cardBtn.textContent = `$${price}`;

  cardBtn.innerHTML += "<ion-icon name='cart-sharp'></ion-icon>";

  cardBody.appendChild(cardBtn);

  container.appendChild(cardWrapper);
};

export const createCartItem = (src, title, price, id) => {
  const cartItem = document.createElement("div");
  cartItem.classList.add("cartItem", "d-flex", "gap-3");
  cartItem.setAttribute("id", id);

  const cartImg = document.createElement("img");
  cartImg.classList.add("cartItem_img");
  cartImg.setAttribute("src", src);

  cartItem.appendChild(cartImg);

  const cartTitle = document.createElement("h5");
  cartTitle.classList.add("text-truncate", "cartItem_title");
  cartTitle.textContent = title;

  cartItem.appendChild(cartTitle);

  const cartPrice = document.createElement("p");
  cartPrice.classList.add("cartItem_price");
  cartPrice.textContent = `$${price}`;

  cartItem.appendChild(cartPrice);

  const cartRemove = document.createElement("div");
  cartRemove.classList.add("cartItem_remove");
  cartRemove.innerHTML = "<ion-icon name='close-sharp'></ion-icon>";

  cartItem.appendChild(cartRemove);

  modalBody.appendChild(cartItem);
};

export const createBookDetail = (src, title, desc, price) => {
  const detailWrapper = document.createElement("div")
  detailWrapper.classList.add("detail_wrapper")
  detailWrapper.style.backgroundImage = `url(${src})`

  const detailContainer = document.createElement("div")
  detailContainer.classList.add("detail", "row")

  const detailImg = document.createElement("img")
  detailImg.classList.add("detail_img", "col-6")
  detailImg.setAttribute("src", src)

  detailContainer.appendChild(detailImg)

  const detailTextContainer = document.createElement("div")
  detailTextContainer.classList.add("detail_textContainer", "col-6")

  detailContainer.appendChild(detailTextContainer)

  const detailTitle = document.createElement("h1")
  detailTitle.classList.add("detail_title", "col-12")
  detailTitle.textContent = title

  detailTextContainer.appendChild(detailTitle)

  const detailDesc = document.createElement("h2")
  detailDesc.classList.add("detail_desc")
  detailDesc.textContent = `- ${desc} -`

  detailTextContainer.appendChild(detailDesc)

  const detailPrice = document.createElement("h4")
  detailPrice.classList.add("detail_price")
  detailPrice.textContent = `$${price}`

  detailTextContainer.appendChild(detailPrice)

  const body = document.querySelector("body")
  detailWrapper.appendChild(detailContainer)
  body.appendChild(detailWrapper)
}