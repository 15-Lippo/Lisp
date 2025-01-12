document.getElementById('airdropForm').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    const addressInput = document.getElementById('address');
    const messageElement = document.getElementById('message');
    const address = addressInput.value.trim();

    // Resetta i messaggi precedenti
    messageElement.innerHTML = '';

    // Validazione indirizzo
    if (!address) {
        displayMessage('Please enter an address.', 'red', messageElement);
        return;
    }

    if (!isValidAddress(address)) {
        displayMessage('Invalid BEP20 Address. Make sure it starts with 0x and is 40 characters long.', 'red', messageElement);
        return;
    }

    // Mostra il messaggio di caricamento
    displayMessage('Submitting your request, please wait...', 'blue', messageElement);

    // Effettua la richiesta al server
    fetch('/api/airdrop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            displayMessage(data.message, 'green', messageElement);
        } else {
            displayMessage(data.message || 'Airdrop request failed.', 'red', messageElement);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('An error occurred while processing your request. Please try again later.', 'red', messageElement);
    });
}

// Funzione per validare l'indirizzo BEP20
function isValidAddress(address) {
    const addressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
    return addressRegex.test(address);
}

// Funzione per mostrare messaggi
function displayMessage(text, color, element) {
    element.innerHTML = `<p style="color:${color};">${text
                                                    }</p>`;
}
