import * as components from "./components.js"

const url = "https://striveschool-api.herokuapp.com/books"
const container = document.querySelector(".main")
const searchInput = document.querySelector(".searchInput")
const cartCounter = document.querySelector(".nav-item_counter")
const cartPrice = document.querySelector(".cartPrice")
const modalBody = document.querySelector(".modal-body");
const emptyCartBtn = document.querySelector(".emptyCart")
let cartArr = []

const fetchData = () => {
    fetch(url)
    .then(raw => raw.json())
    .then(data => {
        const populateCards = () => {data.forEach(book => {
            components.cardAppendChild(book.img, book.title, book.category, book.price, book.asin)
        })
    }

        populateCards()

        const cardBtns = document.querySelectorAll(".card_btn")

        const searchBooks = () => {
            data.filter(book => {
                if (book.title.toLowerCase().includes(searchInput.value.toLowerCase())) {
                    container.innerHTML = ""
                    components.cardAppendChild(book.img, book.title, book.category, book.price, book.asin)
                    const filteredCardBtns = document.querySelectorAll(".card_btn")
                    for (const btn of filteredCardBtns) {
                        btn.onclick = addToCart
                    }
                }
            })
        }

        searchInput.onkeyup = () => {
            if (searchInput.value.length > 3) {
                searchBooks()
            } else if (searchInput.value === "") {
                container.innerHTML = ""
                populateCards()
                const cardBtns2 = document.querySelectorAll(".card_btn")
                for (const btn of cardBtns2) {
                    btn.onclick = addToCart
                }
            }
        }

        const removeCartItem = (ev) => {
            ev.target.closest(".cartItem").classList.add("d-none")
            const cartItemIndex = cartArr.findIndex(item => item.asin === ev.target.closest(".cartItem").id)
            cartArr.splice(cartItemIndex, 1)
            cartCounter.innerText = `${cartArr.length}`
            calcTotalPrice()
            const filteredCardBtns = document.querySelectorAll(".card_btn")
            for (const btn of filteredCardBtns) {
                if (btn.closest(".card-body").id === ev.target.closest(".cartItem").id) {
                    btn.classList.remove("disabled")
                }
            }
        }

        const emptyCart = () => {
            modalBody.innerHTML = ""
            cartArr = []
            cardBtns.forEach(btn => btn.classList.remove("disabled"))
            calcTotalPrice()
            cartCounter.innerText = ""
            cartCounter.classList.replace("d-block", "d-none")
            const filteredCardBtns = document.querySelectorAll(".card_btn")
            for (const btn of filteredCardBtns) {
                    btn.classList.remove("disabled")
            }
        }

        emptyCartBtn.onclick = emptyCart

        const calcTotalPrice = () => {
            cartPrice.innerText = ""
            cartPrice.innerText = `$${cartArr.reduce((accumulator, obj) => {return accumulator + obj.price}, 0).toFixed(2)}`
        }

        const addToCart = (ev) => {
            data.find(book => {
                if (book.asin === ev.target.closest(".card-body").id) {
                    cartArr.push(book)
                    components.createCartItem(book.img, book.title, book.price, book.asin)
                    cartCounter.classList.replace("d-none", "d-block")
                    cartCounter.innerText = `${cartArr.length}`
                    calcTotalPrice()
                    ev.target.classList.add("disabled")
                    const cartItemRemove = document.querySelectorAll(".cartItem_remove")
                    for (const item of cartItemRemove) {
                        item.onclick = removeCartItem
                    }
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