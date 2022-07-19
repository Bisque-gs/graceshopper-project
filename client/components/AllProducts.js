// @flow
// import * as React from "react"
// import { useEffect, useState } from "react"
// import { connect } from "react-redux"
// import { fetchProducts, deleteProductThunk } from "../redux/products"
// import { fetchUsers } from "../redux/admin"
// import { useDispatch, useSelector } from "react-redux"
// import { setOrder, addProductThunk } from "../redux/singleProduct"
// import { Link, useParams } from "react-router-dom"
// import AddProduct from "./AddProduct"

// const AllProducts = (props) => {
//   const [isAddVisible, setIsAddVisible] = useState(false)
//   const [selectedType, setSelectedType] = useState("")
//   const auth = useSelector((state) => state.auth)
//   const products = useSelector((state) => state.products)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(fetchProducts())
//   }, [])

//   const isAddVisibleToggle = () => {
//     setIsAddVisible(false)
//   }

//   const handleClick = (e) => {
//     e.preventDefault()
//     const userId = auth.id
//     //Product id
//     const { id } = useParams()
//     // const productId = this.props.match.params.id
//     dispatch(addProductThunk(userId, id))
//   }

//   const handleChange = (evt) => {
//     setSelectedType(evt.target.value)
//   }

//   if (!localStorage.getItem("cart")) {
//     localStorage.setItem("cart", "[]")
//   }

//   let cart = JSON.parse(localStorage.getItem("cart"))
//   let type = selectedType

//   const addProduct = (product) => {
//     dispatch(addProductThunk(product))
//   }

//   return (
//     <div>
//       <br />
//       <div className="column">
//         Products:
//         {isAddVisible ? (
//           <AddProduct
//             addProduct={addProduct}
//             isAddVisible={isAddVisibleToggle}
//           />
//         ) : auth.isAdmin ? (
//           <button type="button" onClick={() => setIsAddVisible(true)}>
//             Add Product
//           </button>
//         ) : (
//           console.log("You're not admin")
//         )}
//       </div>
//       <select id="choose-type" name="selectList" onChange={handleChange}>
//         <option value="">Pick a Type!</option>
//         <option value="grass">grass</option>
//         <option value="fire">fire</option>
//         <option value="bug">bug</option>
//         <option value="flying">flying</option>
//         <option value="poison">poison</option>
//         <option value="normal">normal</option>
//         <option value="electric">electric</option>
//         <option value="water">water</option>
//         <option value="ground">ground</option>
//       </select>
//       <div className="unit">
//         {products.length === 0 ? (
//           <p>No products</p>
//         ) : (
//           products
//             .sort((a, b) => a.id - b.id)
//             .filter((product) => {
//               if (product.pokeType === type || type === "") {
//                 return product
//               }
//             })
//             .map((product) => {
//               return (
//                 <div key={product.id} className={product.pokeType + " profile"}>
//                   <h3>
//                     <Link to={`/products/${product.id}`}>{product.name}</Link>
//                   </h3>
//                   <a href={`/products/${product.id}`}>
//                     <img src={product.imageUrl} />
//                   </a>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       auth.id // logged in user
//                         ? dispatch(setOrder(auth.id, product.id, 1)) &&
//                           Toastify({
//                             text: `${product.name} was successfully added to cart`,
//                             duration: 3000,
//                             destination: `https://grace-pokebay.herokuapp.com/users/${auth.id}/cart`,
//                             newWindow: true,
//                             close: true,
//                             gravity: "top", // `top` or `bottom`
//                             position: "right", // `left`, `center` or `right`
//                             stopOnFocus: true, // Prevents dismissing of toast on hover
//                             style: {
//                               background:
//                                 "linear-gradient(to right, #00b09b, #96c93d)",
//                             },
//                             onClick: function () {}, // Callback after click
//                           }).showToast()
//                         : (function addItemToLS(prodId) {
//                             // guest
//                             const item = products.find(
//                               (item) => item.id === prodId
//                             )
//                             console.log(item)
//                             const res = cart.find(
//                               (element) => element.id === prodId
//                             )
//                             if (cart.length === 0 || !res) {
//                               item.quantity = 1
//                               cart.push(item)
//                             } else {
//                               res.quantity++
//                             }
//                             console.log(cart)
//                             localStorage.setItem("cart", JSON.stringify(cart))
//                           })(product.id)
//                     }}
//                   >
//                     Add to cart
//                   </button>
//                   {auth.isAdmin ? (
//                     <button
//                       className="cancel"
//                       type="button"
//                       onClick={() => {
//                         dispatch(deleteProductThunk(product.id))
//                         Toastify({
//                           text: `${product.name} was successfully removed`,
//                           duration: 3000,
//                           close: true,
//                           gravity: "top", // `top` or `bottom`
//                           position: "right", // `left`, `center` or `right`
//                           stopOnFocus: true, // Prevents dismissing of toast on hover
//                           style: {
//                             background:
//                               "linear-gradient(to right, #00b09b, #863939)",
//                           },
//                           onClick: function () {}, // Callback after click
//                         }).showToast()
//                       }}
//                     >
//                       Delete
//                     </button>
//                   ) : (
//                     console.log("You're not admin")
//                   )}
//                 </div>
//               )
//             })
//         )}
//       </div>
//     </div>
//   )
// }

// export default AllProducts

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import CameraIcon from "@mui/icons-material/PhotoCamera"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
// import Link from "@mui/material/Link"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { fetchProducts, deleteProductThunk } from "../redux/products"
import { fetchUsers } from "../redux/admin"
import { useDispatch, useSelector } from "react-redux"
import { setOrder, addProductThunk } from "../redux/singleProduct"
import { Link, useParams } from "react-router-dom"
import AddProduct from "./AddProduct"
import IconButton from "@mui/material/IconButton"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

// or



function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      https://grace-pokebay.herokuapp.com/home
      {/* </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}


const theme = createTheme()

export default function AllProducts(props) {
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [selectedType, setSelectedType] = useState("")
  const auth = useSelector((state) => state.auth)
  const products = useSelector((state) => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const isAddVisibleToggle = () => {
    setIsAddVisible(false)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const userId = auth.id
    //Product id
    const { id } = useParams()
    // const productId = this.props.match.params.id
    dispatch(addProductThunk(userId, id))
  }

  const handleChange = (evt) => {
    setSelectedType(evt.target.value)
  }

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", "[]")
  }

  let cart = JSON.parse(localStorage.getItem("cart"))
  let type = selectedType

  const addProduct = (product) => {
    dispatch(addProductThunk(product))
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <br />
      {/* Maybe Put a Search Bar on this AppBar? */}
      <AppBar position="relative" sx={{ bgcolor: "#fff"}} className="column">
        <Box>
          {isAddVisible ? (
            <AddProduct
              addProduct={addProduct}
              isAddVisible={isAddVisibleToggle}
            />
          ) : auth.isAdmin ? (
            <button
              type="button"
              onClick={() => setIsAddVisible(true)}
              color="#ffffff"
            >
              Add Product
            </button>
          ) : (
            console.log("You're not admin")
          )}
        </Box>
        <Box>
          <select id="choose-type" name="selectList" onChange={handleChange}>
            <option value="">Pick a Type!</option>
            <option value="grass">grass</option>
            <option value="fire">fire</option>
            <option value="bug">bug</option>
            <option value="flying">flying</option>
            <option value="poison">poison</option>
            <option value="normal">normal</option>
            <option value="electric">electric</option>
            <option value="water">water</option>
            <option value="ground">ground</option>
          </select>
        </Box>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap></Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        {/* <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Album layout
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box> */}
        <Container sx={{ py: 8 }} maxWidth="xl">
          {/* End hero unit */}
          {products.length === 0 ? (
            <p>No products</p>
          ) : (
            <Grid container spacing={4}>
              {products
                .sort((a, b) => a.id - b.id)
                .filter((product) => {
                  if (product.pokeType === type || type === "") {
                    return product
                  }
                })
                .map((product) => (
                  <Grid
                    item
                    key={product.id}
                    xs={12}
                    sm={5}
                    md={3}
                    alignItems="center"
                    justify="center"
                  >
                    <Box xs={{ justifyContent: "center" }}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          flexBasis: "20%",
                          justifyContent: "center",
                        }}
                      >
                        <Link to={`/products/${product.id}`}>
                          <CardMedia
                            component="img"
                            sx={
                              {
                                // 16:9
                                // pt: "56.25%",
                                // pt: "20%",
                              }
                            }
                            image={product.imageUrl}
                            alt="random"
                          />
                        </Link>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <CardContent
                            sx={{ flexGrow: 1, justifyContent: "center" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                                fontFamily="monospace"
                              >
                                <Link to={`/products/${product.id}`}>
                                  {capitalizeFirstLetter(product.name)}
                                </Link>
                              </Typography>
                            </div>
                            <Typography align="center">
                              This is a media card. You can use this section to
                              describe the content.
                            </Typography>
                          </CardContent>
                        </div>
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => {
                              auth.id // logged in user
                                ? dispatch(setOrder(auth.id, product.id, 1)) &&
                                  Toastify({
                                    text: `${capitalizeFirstLetter(
                                      product.name
                                    )} was successfully added to cart`,
                                    duration: 3000,
                                    destination: `https://grace-pokebay.herokuapp.com/users/${auth.id}/cart`,
                                    newWindow: true,
                                    close: true,
                                    gravity: "top", // `top` or `bottom`
                                    position: "right", // `left`, `center` or `right`
                                    stopOnFocus: true, // Prevents dismissing of toast on hover
                                    style: {
                                      background:
                                        "linear-gradient(to right, #00b09b, #96c93d)",
                                    },
                                    onClick: function () {}, // Callback after click
                                  }).showToast()
                                : (function addItemToLS(prodId) {
                                    // guest
                                    const item = products.find(
                                      (item) => item.id === prodId
                                    )
                                    console.log(item)
                                    const res = cart.find(
                                      (element) => element.id === prodId
                                    )
                                    if (cart.length === 0 || !res) {
                                      item.quantity = 1
                                      cart.push(item)
                                    } else {
                                      res.quantity++
                                    }
                                    console.log(cart)
                                    localStorage.setItem(
                                      "cart",
                                      JSON.stringify(cart)
                                    )
                                  })(product.id)
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {" "}
                            </div>

                            <IconButton
                              color="primary"
                              aria-label="add to shopping cart"
                            >
                              <AddShoppingCartIcon />
                            </IconButton>
                          </Button>

                          {auth.isAdmin && (
                            <Button
                              size="small"
                              onClick={() => {
                                dispatch(deleteProductThunk(product.id))
                                Toastify({
                                  text: `${capitalizeFirstLetter(
                                    product.name
                                  )} was successfully removed`,
                                  duration: 3000,
                                  close: true,
                                  gravity: "top", // `top` or `bottom`
                                  position: "right", // `left`, `center` or `right`
                                  stopOnFocus: true, // Prevents dismissing of toast on hover
                                  style: {
                                    background:
                                      "linear-gradient(to right, #00b09b, #863939)",
                                  },
                                  onClick: function () {}, // Callback after click
                                }).showToast()
                              }}
                            >
                              <IconButton
                                color="primary"
                                aria-label="delete the product"
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          )}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Pokebay
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Made with love from the Developers operating out of the pseudonym
          Bisque
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}
