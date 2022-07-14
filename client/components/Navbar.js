// import React from "react"
// import { connect, useDispatch, useSelector } from "react-redux"
// import { Link } from "react-router-dom"
// import { logout } from "../store"
// // import { SkipNavLink, SkipNavContent } from "@chakra-ui/skip-nav"

// const Navbar = ({ handleClick, isLoggedIn, user, auth }) => (
//   <div>
//     <nav>
//       <a href={`/home`}>
//         <img
//           src="https://gamingymas.files.wordpress.com/2016/05/logo-pokemon.png"
//           alt="logo"
//         />
//       </a>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <Link to={`/users/${auth.id}/cart`}>
//             {/* Cart ({user.updatedPrices.length}) */}
//             Cart ({user.updatedPrices ? user.updatedPrices.length : 0})
//           </Link>
//           <Link to="/products">Products</Link>
//           <Link to={`/users/${auth.id}`}>My Profile</Link>
//           {auth.isAdmin ? (
//             <Link to={`/users`}>All Users</Link>
//           ) : (
//             console.log("NOT ADMIN ALL USERS NOT RENDERING ")
//           )}
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/products">Products</Link>
//           <Link to="/users/guest/cart">Cart</Link>
//         </div>
//       )}
//     </nav>
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     auth: state.auth,
//     isLoggedIn: !!state.auth.id,
//     user: state.user,
//   }
// }

// const Navbar = (props) => {
//   const dispatch = useDispatch()
//   const user = useSelector((state) => state.user)
//     const auth = useSelector((state) => state.auth)
//     const isLoggedIn = !!auth.id

//     const handleClick = () =>  {
//       dispatch(logout())
//     }

//     return (
//         <div>
//             <nav>
//                 <img
//                     src="https://gamingymas.files.wordpress.com/2016/05/logo-pokemon.png"
//                     alt="logo"
//                 />
//                 {isLoggedIn ? (
//                     <div>
//                         {/* The navbar will show these links after you log in */}
//                         <Link to="/home">Home</Link>
//                         <Link to={`/users/${auth.id}/cart`}>
//                             {/* Cart ({user.updatedPrices.length}) */}
//                             Cart ({user.updatedPrices ? user.updatedPrices.length : 0})
//                         </Link>
//                         <Link to="/products">Products</Link>
//                         <Link to={`/users/${auth.id}`}>My Profile</Link>
//                         {auth.isAdmin ? (
//                             <Link to={`/users`}>All Users</Link>
//                         ) : (
//                             console.log("NOT ADMIN ALL USERS NOT RENDERING ")
//                         )}
//                         <a href="#" onClick={handleClick}>
//                             Logout
//                         </a>
//                     </div>
//                 ) : (
//                     <div>
//                         {/* The navbar will show these links before you log in */}
//                         <Link to="/login">Login</Link>
//                         <Link to="/signup">Sign Up</Link>
//                         <Link to="/products">Products</Link>
//                     </div>
//                 )}
//             </nav>
//         </div>
//     )
// }

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     auth: state.auth,
//     isLoggedIn: !!state.auth.id,
//     user: state.user,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     },
//   }
// }

// export default Navbar

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import AdbIcon from "@mui/icons-material/Adb"
import LinkMUI from "@mui/material/Link"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../store"
import SplitButton from "./Splitbutton"

const pages = ["Cart", "Products"]
const settings = ["Profile", "Account", "Dashboard", "Logout"]

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const isLoggedIn = !!auth.id
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleClick = () => {
    dispatch(logout())
    handleCloseNavMenu()
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  // To Color AppBar, add sx={{ background: "teal" }}
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Link to="/home">
            <img
              src="https://gamingymas.files.wordpress.com/2016/05/logo-pokemon.png"
              width="60"
              height="60"
              alt="logo"
            />
          </Link>
          <Link to="/home" textDecoration="none">
            <Button
              key={"Products"}
              onClick={handleCloseNavMenu}
              sx={{
               display: { xs: "none", md: "flex" }, mr: 1,
                my: 2,
                color: "white",
                fontWeight: 800,
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: "rem",
                  color: "white",
                  textDecoration: "none",
                  textTransform: "capitalize",
                }}
              >
                Pokebay
              </Typography>
            </Button>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "left",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ ml: 4,  boxShadow: 3 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isLoggedIn ? (
                <Link to={`/users/${auth.id}/cart`}>
                  <MenuItem key={"Cart"} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {"Cart"}
                    </Typography>
                  </MenuItem>
                </Link>
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <Link to={`/signup`}>
                    <MenuItem key={"Signup"} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {"Signup"}
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to={`/login`}>
                    <MenuItem key={"Login"} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {"Login"}
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Link to={`/users/guest/cart`}>
                    <MenuItem key={"Guest Cart"} onClick={handleCloseNavMenu}>
                      <Typography
                        textAlign="center"
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        {"Cart"}
                      </Typography>
                    </MenuItem>
                  </Link>
                </div>
              )}
              {/* 
              <Link to={`/users/${auth.id}/cart`}>
                <MenuItem key={"Cart"} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {"Cart"}
                  </Typography>
                </MenuItem>
              </Link> */}
              <Link to={`/products`}>
                <MenuItem key={"Products"} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {"Products"}
                  </Typography>
                </MenuItem>
              </Link>
              {isLoggedIn && auth.isAdmin && (
                <Link to={`/users`}>
                  <MenuItem key={"All Users"} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      sx={{
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      {"All Users"}
                    </Typography>
                  </MenuItem>
                </Link>
              )}
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".5rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PokeBay
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isLoggedIn ? (
              <Link to={`/users/${auth.id}/cart`}>
                <Button
                  key={"Cart"}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: 800,
                    textDecoration: "none",
                    boxShadow: 3,
                  }}
                >
                  {"Cart"}
                </Button>
              </Link>
            ) : (
              <React.Fragment>
                {/* The navbar will show these links before you log in */}
                <SplitButton />
                <Link to={`/users/guest/cart`}>
                  <Button
                    key={"Guest Cart"}
                    onClick={handleCloseNavMenu}
                    sx={{
                      m: 2,
                      color: "white",
                      display: "block",
                      fontWeight: 800,
                      boxShadow: 3,
                    }}
                  >
                    {"Cart"}
                  </Button>
                </Link>
              </React.Fragment>
            )}
            <Link to={`/products`}>
              <Button
                key={"Products"}
                onClick={handleCloseNavMenu}
                sx={{
                  m: 2,
                  color: "white",
                  display: "block",
                  fontWeight: 800,
                  boxShadow: 3,
                }}
              >
                {"Products"}
              </Button>
            </Link>

            {isLoggedIn && auth.isAdmin && (
              <Link to={`/users`}>
                <Button
                  key={"All Users"}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: 800,
                    boxShadow: 3,
                  }}
                >
                  {"All Users"}
                </Button>
              </Link>
            )}

            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: 800,
                }}
              >
                {page}
              </Button>
            ))} */}
          </Box>
          {isLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={auth.username}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link to={`/users/${auth.id}`}>
                  <MenuItem key={"Profile"} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "black",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                      }}
                    >
                      {"Profile"}
                    </Typography>
                  </MenuItem>
                </Link>
                <MenuItem key={"Logout"} onClick={handleClick}>
                  <Typography
                    textAlign="center"
                    sx={{
                      color: "black",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                    }}
                  >
                    {"Logout"}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navbar
