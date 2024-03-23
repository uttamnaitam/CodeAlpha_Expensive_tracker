let button = document.getElementById('button');
let dateInput = document.getElementById('dateInput');
let amountInput = document.getElementById('amountInput');
let descriptionInput = document.getElementById('descriptionInput');
let type = document.getElementById('type');
let table = document.getElementById('table');
let class_name;
let expense_records = [];

if(localStorage.getItem('expense_records')) {
    expense_records = JSON.parse(localStorage.getItem('expense_records'));
    renderTable();
}

let inputs = [dateInput, amountInput, descriptionInput]; // Array of input fields

function add_expense() {
    let date = dateInput.value || 'N/A';
    let type_value = type.value || 'N/A';
    let amount = amountInput.value || 'N/A';
    let description = descriptionInput.value || 'N/A';

    // Color coding logic
    switch(type_value.toLowerCase()) {
        case 'food':
            class_name = 'food';
            break;
        case 'clothing':
            class_name = 'clothing';
            break;
        case 'transportation':
            class_name = 'transportation';
            break;
        case 'debt':
            class_name = 'debt';
            break;
        case 'education':
            class_name = 'education';
            break;
        case 'miscellaneous':
            class_name = 'miscellaneous';
            break;
        default:
            class_name = '';
    }

    expense_records.push({ date, type: type_value, amount, description, class_name });
    updateLocalStorage();
    renderTable();
}

function delete_expense(index) {
    expense_records.splice(index, 0);
    updateLocalStorage();
    renderTable();
}

function renderTable() {
    // Clear the table before rendering
    table.innerHTML = `<tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>`;

    // Render each expense record to the table
    expense_records.forEach((expense, index) => {
        let color_code = expense.class_name;
        table.innerHTML += `<tr>
                                <td class="${color_code}">${expense.date}</td>
                                <td class="${color_code}">${expense.type}</td>
                                <td class="${color_code}">${expense.amount}</td>
                                <td class="${color_code}">${expense.description}</td>
                                <td class="${color_code}"><button onclick="delete_expense(${index})" class="btn btn-primary btn-sm">Delete</button></td>
                            </tr>`;
    });
}

function updateLocalStorage() {
    localStorage.setItem('expense_records', JSON.stringify(expense_records));
}

button.addEventListener('click', add_expense);
