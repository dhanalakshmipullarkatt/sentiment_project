// analyzer/static/analyzer/app.js

document.addEventListener('DOMContentLoaded', () => {
    renderHistoryLogTable();
    setupEventListeners();
});

function setupEventListeners() {
    const actionBtn = document.getElementById('submit-action-btn');
    const clearBtn = document.getElementById('clear-history-btn');

    if (actionBtn) {
        actionBtn.addEventListener('click', processSentimentAnalysis);
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', clearTrackingHistory);
    }
}

function processSentimentAnalysis() {
    const inputTextArea = document.getElementById('sentence-input');
    const displayDiv = document.getElementById('output-display');
    const csrfTokenElement = document.querySelector('[name=csrfmiddlewaretoken]');

    if (!inputTextArea || !displayDiv || !csrfTokenElement) return;

    const rawText = inputTextArea.value.trim();
    const tokenString = csrfTokenElement.value;

    if (!rawText) {
        alert('Validation Check: Text entry area cannot be empty.');
        return;
    }

    const payloadData = new FormData();
    payloadData.append('text', rawText);
    displayDiv.style.display = 'none';

    fetch('/analyze-endpoint/', {
        method: 'POST',
        headers: { 'X-CSRFToken': tokenString },
        body: payloadData
    })
    .then(response => {
        if (!response.ok) throw new Error('Network resource routing failure.');
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            // Strictly showing only the sentiment text, no numbers
            displayDiv.innerText = `Result: ${data.sentiment}`;
            displayDiv.className = `output-card status-${data.sentiment}`;
            displayDiv.style.display = 'block';

            saveQueryToMemory(rawText, data.sentiment);
        }
    })
    .catch(err => {
        console.error('System Exception Details: ', err);
        alert('An analytical exception occurred processing string.');
    });
}

function clearTrackingHistory() {
    localStorage.removeItem('sentiment_logs');
    renderHistoryLogTable();
}

function saveQueryToMemory(text, label) {
    let activeLogs = JSON.parse(localStorage.getItem('sentiment_logs')) || [];
    activeLogs.unshift({ text: text, label: label });
    if (activeLogs.length > 5) activeLogs.pop();
    localStorage.setItem('sentiment_logs', JSON.stringify(activeLogs));
    renderHistoryLogTable();
}

function renderHistoryLogTable() {
    const tableBody = document.getElementById('history-table-body');
    if (!tableBody) return;
    
    const activeLogs = JSON.parse(localStorage.getItem('sentiment_logs')) || [];

    if (activeLogs.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="2" class="no-data">No history records found.</td></tr>`;
        return;
    }

    // Rendered with two columns now: statement phrase and label status
    tableBody.innerHTML = activeLogs.map(item => `
        <tr>
            <td title="${item.text}">${item.text}</td>
            <td><span class="badge bg-${item.label}">${item.label}</span></td>
        </tr>
    `).join('');
}