import axios from 'axios'


const Token = localStorage.getItem("token");
console.log(Token)
export const publicMethod = axios.create({
    baseURL:"http://localhost:5000/api/"
})

export const userMethod = axios.create({
    baseURL:"http://localhost:5000/api/",
    headers:{
        token:`Bearer ${localStorage.getItem("token")}`
    }
})