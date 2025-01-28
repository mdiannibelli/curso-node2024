const $span = document.querySelector('span');
const $btn = document.querySelector('button');

const getLastTicket = async () => {
    try {
        const lastTicket = await fetch('/api/tickets/last').then(res => res.json());
        $span.innerText = lastTicket;
    } catch (error) {
        throw new Error("Error at fetch to last ticket")
    }
}

const createNewTicket = async () => {
    try {
        const ticket = await fetch('/api/tickets', {
            method: 'POST'
        }).then(res => res.json());
        $span.innerText = ticket.number;
    } catch (error) {
        throw new Error("Error at fetch to create new ticket");
    }
}

getLastTicket();

$btn.addEventListener('click', createNewTicket);