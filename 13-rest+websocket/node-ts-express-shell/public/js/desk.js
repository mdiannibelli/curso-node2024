const $pendingTicketsCounter = document.querySelector('#lbl-pending');
const $deskHeader = document.querySelector('#desk-header');
const $thereIsNoMoreTickets = document.querySelector('#no-more-tickets');
const $attendNextTicketBtn = document.querySelector('#attend-next-ticket');
const $finishTicketBtn = document.querySelector('#finish-ticket');
const $currentTicket = document.querySelector('#current-ticket');

const searchParams = new URLSearchParams(window.location.search);
const deskNumber = searchParams.get('escritorio');
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error("Escritorio es requerido");
} else {
    $deskHeader.innerHTML = deskNumber;
}

let workingTicket = null;

function checkTicketCount(currentCount = 0) {
    if (currentCount === 0) {
        $thereIsNoMoreTickets.classList.remove('d-none');
    } else {
        $thereIsNoMoreTickets.classList.add('d-none');
    }
    $pendingTicketsCounter.innerHTML = currentCount;
}

async function getTicket() {
    const { status, message } = await fetch(`/api/tickets/draw/${deskNumber.toString()}`, {
        method: 'POST'
    }).then(res => res.json());

    if (status === 'error') {
        console.log("Error at get ticket");
        $currentTicket.innerHTML = message;
        return;
    }
    workingTicket = message;
    $currentTicket.innerHTML = message.number;
}

async function endTicket() {
    if (!workingTicket) return;
    const { status, message } = await fetch(`/api/tickets/done/${workingTicket.id}`, {
        method: 'PUT'
    }).then(res => res.json());

    if (status === 'error') {
        console.log(message)
        console.log("Error at get ticket");
        return;
    }

    $currentTicket.innerHTML = 'Nadie';
}


const loadInitialCountOfPendingTickets = async () => {
    try {
        const pendingTickets = await fetch('/api/tickets/pending').then(res => res.json());
        checkTicketCount(pendingTickets.length);
    } catch (error) {
        console.log(error);
    }
}


function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
        console.log(event.data); // on-ticket-count-changed
        const { type, payload } = JSON.parse(event.data);
        if (type === 'on-ticket-count-changed') {
            checkTicketCount(payload);
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

$attendNextTicketBtn.addEventListener('click', getTicket);
$finishTicketBtn.addEventListener('click', endTicket);


// Init
loadInitialCountOfPendingTickets();
connectToWebSockets();