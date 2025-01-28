const $lblFirstTicket = document.querySelector('#lbl-ticket-01');
const $lblFirstDesk = document.querySelector('#lbl-desk-01');

async function getWorkingOnTickets() {
    const workingOnTickets = await fetch(`/api/tickets/working-on`).then(res => res.json());
    if (workingOnTickets.length <= 0) {
        $lblFirstTicket.innerHTML = 'No hay ticket';
        $lblFirstDesk.innerHTML = ''
        return;
    }
    console.log(workingOnTickets)
    renderTickets(workingOnTickets);
}

function renderTickets(tickets = []) {
    for (let i = 0; i < tickets.length; i++) {
        if (i >= 4) break;
        const ticket = tickets[i];
        const $lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
        const $lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`);

        if (ticket) {
            $lblTicket.innerHTML = `Ticket ${ticket.number}`;
            $lblDesk.innerHTML = `Escritorio ${ticket.handleAtDesk}`;
        }
    }
}

function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
        console.log(event.data); // on-ticket-count-changed
        const { type, payload } = JSON.parse(event.data);
        if (type === 'on-working-changed') {
            renderTickets(payload);
        }
    };

    socket.onclose = (event) => {
        console.log('Connection closed');
        setTimeout(() => {
            console.log('retrying to connect');
            connectToWebSockets();
        }, 1500);

    };

    socket.onopen = (event) => {
        console.log('Connected');
    };

}

getWorkingOnTickets();
connectToWebSockets();