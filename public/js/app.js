// const { response } = require("express")

console.log("Client side javascript is loaded")

fetch("http://puzzle.mead.io/puzzle").then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


const searchWeather = (address) => {
    
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                messageOne.textContent = ""
                messageTwo.textContent = data.error
            }else{
                console.log(data)
                
            messageOne.textContent = data.location
            messageTwo.textContent = data.data
            }
        })
    })

}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageTwo.textContent = ""
    messageOne.textContent = "Loading......"
    searchWeather(search.value)

})