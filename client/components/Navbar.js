// import React from "react"
// import { useHistory } from "react-router-dom"
// import {
//   Box,
//   Flex,
//   Text,
//   IconButton,
//   Button,
//   Stack,
//   Collapse,
//   Icon,
//   Link,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   useColorModeValue,
//   useBreakpointValue,
//   useDisclosure,
// } from "@chakra-ui/react"
// import {
//   HamburgerIcon,
//   CloseIcon,
//   ChevronDownIcon,
//   ChevronRightIcon,
// } from "@chakra-ui/icons"

// export default function WithSubnavigation() {
//   const { isOpen, onToggle } = useDisclosure()
//   const history = useHistory()
//   return (
//     <Box>
//       <Flex
//         bg={useColorModeValue("white", "gray.800")}
//         color={useColorModeValue("gray.600", "white")}
//         minH={"60px"}
//         py={{ base: 2 }}
//         px={{ base: 4 }}
//         borderBottom={1}
//         borderStyle={"solid"}
//         borderColor={useColorModeValue("gray.200", "gray.900")}
//         align={"center"}
//       >
//         <Flex
//           flex={{ base: 1, md: "auto" }}
//           ml={{ base: -2 }}
//           display={{ base: "flex", md: "none" }}
//         >
//           <IconButton
//             onClick={onToggle}
//             icon={
//               isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
//             }
//             variant={"ghost"}
//             aria-label={"Toggle Navigation"}
//           />
//         </Flex>
//         <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
//           <Text
//             textAlign={useBreakpointValue({ base: "center", md: "left" })}
//             fontFamily={"heading"}
//             color={useColorModeValue("gray.800", "white")}
//           >
//             Pokebay
//           </Text>

//           <Flex display={{ base: "none", md: "flex" }} ml={10}>
//             <DesktopNav />
//           </Flex>
//         </Flex>

//         <Stack
//           flex={{ base: 1, md: 0 }}
//           justify={"flex-end"}
//           direction={"row"}
//           spacing={6}
//         >
//           <Button
//             as={"a"}
//             fontSize={"sm"}
//             fontWeight={400}
//             variant={"link"}
//             onClick={(e) => {
//               e.preventDefault()
//               history.push("/login")
//             }}
//           >
//             Sign In
//           </Button>
//           <Button
//             display={{ base: "none", md: "inline-flex" }}
//             fontSize={"sm"}
//             fontWeight={600}
//             color={"white"}
//             bg={"pink.400"}
//             _hover={{
//               bg: "pink.300",
//             }}
//             onClick={(e) => {
//               e.preventDefault()
//               history.push("/signup")
//             }}
//           >
//             Sign Up
//           </Button>
//         </Stack>
//       </Flex>

//       <Collapse in={isOpen} animateOpacity>
//         <MobileNav />
//       </Collapse>
//     </Box>
//   )
// }

// const DesktopNav = () => {
//   const linkColor = useColorModeValue("gray.600", "gray.200")
//   const linkHoverColor = useColorModeValue("gray.800", "white")
//   const popoverContentBgColor = useColorModeValue("white", "gray.800")

//   return (
//     <Stack direction={"row"} spacing={4}>
//       {NAV_ITEMS.map((navItem) => (
//         <Box key={navItem.label}>
//           <Popover trigger={"hover"} placement={"bottom-start"}>
//             <PopoverTrigger>
//               <Link
//                 p={2}
//                 href={navItem.href ?? "#"}
//                 fontSize={"sm"}
//                 fontWeight={500}
//                 color={linkColor}
//                 _hover={{
//                   textDecoration: "none",
//                   color: linkHoverColor,
//                 }}
//               >
//                 {navItem.label}
//               </Link>
//             </PopoverTrigger>

//             {navItem.children && (
//               <PopoverContent
//                 border={0}
//                 boxShadow={"xl"}
//                 bg={popoverContentBgColor}
//                 p={4}
//                 rounded={"xl"}
//                 minW={"sm"}
//               >
//                 <Stack>
//                   {navItem.children.map((child) => (
//                     <DesktopSubNav key={child.label} {...child} />
//                   ))}
//                 </Stack>
//               </PopoverContent>
//             )}
//           </Popover>
//         </Box>
//       ))}
//     </Stack>
//   )
// }

// const DesktopSubNav = ({ label, href, subLabel }) => {
//   return (
//     <Link
//       href={href}
//       role={"group"}
//       display={"block"}
//       p={2}
//       rounded={"md"}
//       _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
//     >
//       <Stack direction={"row"} align={"center"}>
//         <Box>
//           <Text
//             transition={"all .3s ease"}
//             _groupHover={{ color: "pink.400" }}
//             fontWeight={500}
//           >
//             {label}
//           </Text>
//           <Text fontSize={"sm"}>{subLabel}</Text>
//         </Box>
//         <Flex
//           transition={"all .3s ease"}
//           transform={"translateX(-10px)"}
//           opacity={0}
//           _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
//           justify={"flex-end"}
//           align={"center"}
//           flex={1}
//         >
//           <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   )
// }

// const MobileNav = () => {
//   return (
//     <Stack
//       bg={useColorModeValue("white", "gray.800")}
//       p={4}
//       display={{ md: "none" }}
//     >
//       {NAV_ITEMS.map((navItem) => (
//         <MobileNavItem key={navItem.label} {...navItem} />
//       ))}
//     </Stack>
//   )
// }

// const MobileNavItem = ({ label, children, href }) => {
//   const { isOpen, onToggle } = useDisclosure()

//   return (
//     <Stack spacing={4} onClick={children && onToggle}>
//       <Flex
//         py={2}
//         as={Link}
//         href={href ?? "#"}
//         justify={"space-between"}
//         align={"center"}
//         _hover={{
//           textDecoration: "none",
//         }}
//       >
//         <Text
//           fontWeight={600}
//           color={useColorModeValue("gray.600", "gray.200")}
//         >
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition={"all .25s ease-in-out"}
//             transform={isOpen ? "rotate(180deg)" : ""}
//             w={6}
//             h={6}
//           />
//         )}
//       </Flex>

//       <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
//         <Stack
//           mt={2}
//           pl={4}
//           borderLeft={1}
//           borderStyle={"solid"}
//           borderColor={useColorModeValue("gray.200", "gray.700")}
//           align={"start"}
//         >
//           {children &&
//             children.map((child) => (
//               <Link key={child.label} py={2} href={child.href}>
//                 {child.label}
//               </Link>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   )
// }

// const NAV_ITEMS = []

import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../store"
// import { SkipNavLink, SkipNavContent } from "@chakra-ui/skip-nav"

const Navbar = ({ handleClick, isLoggedIn, user, auth }) => (
  <div>
    <nav>
      <img
        src="https://gamingymas.files.wordpress.com/2016/05/logo-pokemon.png"
        alt="logo"
      />
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <Link to={`/users/${auth.id}/cart`}>
            {/* Cart ({user.updatedPrices.length}) */}
            Cart ({user.updatedPrices ? user.updatedPrices.length : 0})
          </Link>
          <Link to="/products">Products</Link>
          <Link to={`/users/${auth.id}`}>My Profile</Link>
          {auth.isAdmin ? (
            <Link to={`/users`}>All Users</Link>
          ) : (
            console.log("NOT ADMIN ALL USERS NOT RENDERING ")
          )}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/products">Products</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

// // TRYING TO GET NAVBAR CART(X) TO POPULATE DYNAMICALLY UPON LOGIN
// // REFACTORED NAVBAR STATELESS FUNCTIONAL COMPONENT INTO A CLASS COMPONENT
// // LIMITED SUCCESS SEE BELOW COMMENTS

// //Try having the local state be the number of the orders
// //then use setState to update the value dynamically
// class Navbar extends React.Component {
//   // const Navbar = ({ handleClick, isLoggedIn, user, auth }) => (

//   componentDidMount() {
//     if (this.props.isLoggedIn) {
//       this.getOrdersUponLogin()
//       // this.props.getUser(Number(this.props.auth.id))
//       // let yo = this.props.getOrders(Number(this.props.auth.id))
//       // console.log(yo)
//     }
//   }

//   getOrdersUponLogin = () => {
//     if (this.props.isLoggedIn) {
//       this.props.getUser(this.props.auth.id)
//       this.props.getOrders(Number(this.props.auth.id))
//       return
//     }
//   }

//   componentDidUpdate(prevProps) {
//     console.log('componentDidUpdate')
//     //  this.getOrdersUponLogin()
//     // if (
//     //   prevProps.getUser(Number(this.props.auth.id)) !==
//     //   this.props.getUser(Number(this.props.auth.id))
//     // ) {
//     if (prevProps.auth.id !== this.props.auth.id) {
//       this.getOrdersUponLogin()
//     }

//      if (
//        prevProps.user.updatedPrices.length !==
//        this.props.user.updatedPrices.length
//      ) {
//        console.log('ONE')
//      this.getOrdersUponLogin()
//   }
// }

//   //Im able to get it populate under ComponentDidUpdate Lifecylce but it infinitley loops because
//   //i am changing props/state. dont know why its infinitley looping if i am just fetching something one time tho
//   // componentDidUpdate() {
//   //   this.getOrdersUponLogin()
//   // }

//   //It renders the cart quantity upon login..... but is not dynamically updating whenever i add or remove an item from the cart
//   //which is strange because im mapping state to props from the user from the store
//   //user in the store refers to the single user Redux file & whenever i add or remove something it changes the: this.props.user.updatedPrices
//   //thus my props are changing so why isnt react triggering a re render ?
//   //its because my component did update only re renders upon login and not when the cart changes
//   //change the if statement in the Component did update to trigger a re render

//   //Maybe check out thunks/routes? connect some buttons with eachother?
//   //

//   render() {
//     console.log("THIS.PROPS", this.props.user.updatedPrices)
//     // ({ handleClick, isLoggedIn, user, auth } = this.props)
//     const handleClick = this.props.handleClick
//     const isLoggedIn = this.props.isLoggedIn
//     const user = this.props.user
//     const auth = this.props.auth
//     return (
//       <div>
//         <nav>
//           <img
//             src="https://gamingymas.files.wordpress.com/2016/05/logo-pokemon.png"
//             alt="logo"
//           />
//           {isLoggedIn ? (
//             <div>
//               {/* The navbar will show these links after you log in */}
//               <Link to="/home">Home</Link>
//               <Link to={`/users/${auth.id}/cart`}>
//                 Cart ({user.updatedPrices.length})
//               </Link>
//               <Link to="/products">Products</Link>
//               <a href="#" onClick={handleClick}>
//                 Logout
//               </a>
//             </div>
//           ) : (
//             <div>
//               {/* The navbar will show these links before you log in */}
//               <Link to="/login">Login</Link>
//               <Link to="/signup">Sign Up</Link>
//               <Link to="/products">Products</Link>
//             </div>
//           )}
//         </nav>
//       </div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// function mapState(state) {
//   return {
//     auth: state.auth,
//     isLoggedIn: !!state.auth.id,
//     user: state.user,
//   }
// }

// function mapDispatch(dispatch) {
//   return {
//     handleClick() {
//       dispatch(logout())
//     },
//     getOrders: (id) => dispatch(fetchUserCart(id)),
//     getUser: (id) => dispatch(fetchUser(id)),
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)
