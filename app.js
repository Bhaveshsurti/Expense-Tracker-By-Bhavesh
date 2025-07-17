let transactions = [];

function updateUI() {
  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);

  document.getElementById('balance').innerText = `₹${balance}`;
  document.getElementById('income').innerText = `₹${income}`;
  document.getElementById('expense').innerText = `₹${Math.abs(expense)}`;

  const list = document.getElementById('transaction-list');
  list.innerHTML = '';

  transactions.forEach((t, i) => {
    const item = document.createElement('li');
    item.innerText = `${t.desc}: ₹${t.amount}`;
    item.className = t.amount < 0 ? 'red' : 'green';
    item.onclick = () => {
      transactions.splice(i, 1);
      updateUI();
    };
    list.appendChild(item);
  });
}

function addTransaction() {
  const desc = document.getElementById('desc').value.trim();
  const amount = Number(document.getElementById('amount').value);

  if (desc === '' || isNaN(amount)) {
    alert('Please enter valid description and amount');
    return;
  }

  transactions.push({ desc, amount });
  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';
  updateUI();
}
