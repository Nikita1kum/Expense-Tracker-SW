document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    
    const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, description, amount })
    });
    
    if (response.ok) {
        addExpenseToList(category, description, amount);
        document.getElementById('expense-form').reset();
    }
});

function addExpenseToList(category, description, amount) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `<span class="category-output">${category}</span> - ${description}: $${amount}`;
    expenseList.appendChild(li);
}
