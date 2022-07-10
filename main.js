// ============================================== Live Code =======================================================

// const arr = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 10]
// const newArr = []
// arr.map((a) => {
//     if (!newArr.includes(a) && a % 2 === 0) {
//         newArr.push(a)
//     }
// })
// console.log(newArr)


// const queryString = require('querystring')
// const newJson = {
//     name: 'khanh',
//     children: [
//         'diem',
//         'dung',
//     ],
//     age: '22',
// }
// const query = queryString.stringify(newJson)
// console.log(query)

// const getBirthday = require('./getBirthday.js').getBirthday()
// console.log(`${getBirthday.getDate()}/${getBirthday.getMonth() + 1}/${getBirthday.getFullYear()}`)

// ================================================= Bai 1 =========================================================

// const newJson = {
//     name: 'khanh',
//     age: '22',
//     work: 'student',
//     gender: 'men'
// }

// for(let i in newJson) {
//     console.log(`${i}: ${newJson[i]}`)
// }

// ================================================= Bai 2 =========================================================

const http = require('http')

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.end('<b>Day la trang chu</b>')
    } else if(req.url === '/about') {
        res.end('<b>Day la thong tin ca nhan cua ban than</b>')
    } else {
        res.end('<b>Duong dan nay khong ton tai</b>')
    }
})

server.listen(5000)