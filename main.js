// ---------------------------------------------- Data Processing ------------------------------------------------------

const url = 'https://api.github.com/users/'
let mainData = {}

const fetchData = async (url) => {
    const response = await fetch(url).catch(error => {
        console.log(error); alert('An error occurred!!! Please check your network connection.')
    })
    mainData = await response.json()
}

//------------------------------------------------- HTML Render ------------------------------------------------------

let main = document.getElementById('main')

const mainFormHTML = `
    <div id='header'>
        <h2>GITHUB USERS INFORMATIONS</h2>    
    </div>
    <div id='content'>
        <form id='mainForm'>
            <input id='usernameInput' value='' placeholder='input username'/>
            <button type='submit'>SEARCH</button>
        </form>
        <div id='usersInfo'></div>
    </div>
`
main.innerHTML = mainFormHTML

let mainForm = document.getElementById('mainForm')
let usernameInput = document.getElementById('usernameInput')
let usersInfo = document.getElementById('usersInfo')

const usersRender = () => {
    const userInfoHTML = mainData.message === 'Not Found' ? `<p>Can not find this user!!!</p>` : `
        <div class='_image'>
            <img src=${mainData.avatar_url} alt='avatar image'/>
        </div>
        <div class='_info'>
            <h3>${mainData.login}</h3>
            <p>Name: ${mainData.name ? mainData.name : 'no name information'}</p>
            <p>Email: ${mainData.email ? mainData.email : 'no email information'}</p>
            <p>Company: ${mainData.company ? mainData.company : 'no company information'}</p>
            <p>${mainData.followers} folower${mainData.followers === 1 ? '' : 's'}</p>
        </div>
        
    `
    usersInfo.innerHTML = userInfoHTML
}

//---------------------------------------------- Set Event Listener -----------------------------------------------

mainForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    await fetchData(url + usernameInput.value)
    usersRender()
})

