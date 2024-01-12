import * as components from "./components.js"

const url = "https://striveschool-api.herokuapp.com/books"
const container = document.querySelector(".main")
const searchInput = document.querySelector(".searchInput")
const cartCounter = document.querySelector(".nav-item_counter")
const cartPrice = document.querySelector(".cartPrice")
let cartArr = []

const fetchData = () => {
    fetch(url)
    .then(raw => raw.json())
    .then(data => {
        data.forEach(book => {
            components.cardAppendChild(book.img, book.title, book.category, book.price)
        });

        const searchBooks = () => {
            data.filter(book => {
                if (book.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
                    container.innerHTML = ""
                    components.cardAppendChild(book.img, book.title, book.category, book.price)
                }
            })
        }

        searchInput.onkeyup = () => {
            if (searchInput.value.length > 3) {
                searchBooks()
            } else if (searchInput.value === "") {
                container.innerHTML = ""
                data.forEach(book => {
                    components.cardAppendChild(book.img, book.title, book.category, book.price)
                })
            }
        }

        const cardBtns = document.querySelectorAll(".card_btn")

        const calcTotalPrice = () => {
            cartPrice.innerText = ""
            cartPrice.innerText = cartArr.reduce((accumulator, obj) => {return accumulator + obj.price}, 0).toFixed(2)
        }

        const addToCart = (ev) => {
            data.find(book => {
                if (book.title.toLowerCase() === ev.target.closest(".card-body").firstChild.innerText.toLowerCase()) {
                    cartArr.push(book)
                    components.createCartItem(book.img, book.title, book.price)
                    cartCounter.classList.replace("d-none", "d-block")
                    calcTotalPrice()
                    ev.target.classList.add("disabled")
                }
            })
        }

        for (const btn of cardBtns) {
            btn.onclick = addToCart
        }
    })
    .catch(error => alert(`${error}`))
}

window.onload = fetchData()