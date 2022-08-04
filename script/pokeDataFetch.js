// import axios from "axios"
// require("dotenv").config()
// import axios from "axios"


// process.env.REACT_APP_POKE_TCG_API_KEY
const axios = require("axios").default
const process = require("process")
// const fetchUsers = (id) => {
//       console.log("AAAAAAA")
//      return async () => {
    
//     try {

//       const { data } = await axios.get(
//         `https://api.pokemontcg.io/v2/cards/${id}`,
//         {
//           headers: { authorization: process.env.REACT_APP_POKE_TCG_API_KEY },
//         }
//       )
//         console.log('yeooooooooo', data)
//         return data;
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

// async function getPoke(id) {
// const { data } = await axios.get(`https://api.pokemontcg.io/v2/cards?name=charizard`)
//     console.log("yeooooooooo", data)
//     return data; 
// }

///http://localhost:8080/api/posts?authorIds=1,2,3&sortBy=reads&direction=desc


// console.log(process.env)
async function getPoke(id) {
  
  const { data } = await axios.get(
    `https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:[1 TO 151]`
    // ,
    // {
    //   headers: { authorization: process.env.REACT_APP_POKE_TCG_API_KEY },
    // }
  )
  console.log("yeooooooooo", data)
    const FileSystem = require("fs")
    FileSystem.writeFile("file.json", JSON.stringify(data), (error) => {
      if (error) throw error
    })
  return data
}



//WRITE THIS DATA TO A FILE, WRITE A DOCUMENT FILE 



// async function getPoke(id) {
//   const { data } = await axios.get(`https://api.pokemontcg.io/v2/cards/${id}`, {
//     headers: { authorization: process.env.REACT_APP_POKE_TCG_API_KEY },
//   })
//   console.log("yeooooooooo", data)
//   return data
// }




// fetchUsers(1);
getPoke(2);

// const poke = fetchUsers(2);
//  console.log(poke)
