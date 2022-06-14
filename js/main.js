document.querySelector('#letsGo').addEventListener('click', makeReq)

async function makeReq(){
    const userChoice = document.querySelector('#choice').value
    const res = await fetch(`api?RPSLS=${userChoice}`)
    const data = await res.json()
    console.log(data)
    document.querySelector('#userChoice').textContent = data.choice
    document.querySelector('#compThrow').textContent = data.comp
    document.querySelector('#winner').textContent = data.winner
}