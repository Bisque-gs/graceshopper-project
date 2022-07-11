import axios from "axios"

async function fetchProducts() {
  const { data } = await axios.get("/api/products")
  const products = [...data]
  return products
}

export function addItemToLS(prodId) {
  const products = fetchProducts()
  let item = products.find(function (item) {
    return item.id === prodId
  })
  if (cart.length === 0) {
    cart.push(item)
  } else {
    let res = cart.find((element) => element.id === prodId)
    if (res === undefined) {
      cart.push(item)
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart))
}
