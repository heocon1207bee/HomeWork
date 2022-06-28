// ---------------------------------------------- Bai tap ------------------------------------------------------

function Car(carName, make, speed) {
    this.carName = carName
    this.make = make
    this.speed = speed
}

Car.prototype.accelerate = function() {
    this.speed += 10
    console.log(`accelerate! ${this.carName} speed: `, this.speed)
}

Car.prototype.break = function() {
    this.speed -= 5
    console.log(`break! ${this.carName} speed: `,this.speed)
}

let Mercedes = new Car('Mecedes','14/02/2022', 220)
let BMW = new Car('BMW' ,'12/01/2021', 330)

//------------------------------------------------- Render ------------------------------------------------------
const carList = new Array()
carList.push(Mercedes, BMW)

let main = document.getElementById('main')

let homeworkName = document.createElement('h1')
homeworkName.innerText = 'Bai tap 1'
main.appendChild(homeworkName)

let listCar = document.createElement('ul')

function render() {
    carList.map((data, index) => {
        let list = document.createElement('li')
        list.id = 'car' + index
        list.key = list.id
        let listChild = `
            <h4>${data.carName}</h4>
            <p>make: ${data.make}</p>
            <p>speed: ${data.speed}km/h</p>
        `
        list.innerHTML = listChild

        let accelerate = document.createElement('button')
        accelerate.innerText = 'accelerate'
        accelerate.addEventListener('click', () => {
            data.accelerate()
            listCar.innerHTML = ''
            render()
        })
        list.appendChild(accelerate)

        let breaking = document.createElement('button')
        breaking.innerText = 'break'
        breaking.addEventListener('click', () => {
            data.break()
            listCar.innerHTML = ''
            render()
        })
        list.appendChild(breaking)

        listCar.appendChild(list)
    })
    main.appendChild(listCar)
}

render()
