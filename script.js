
document.addEventListener("DOMContentLoaded", function () {
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const categorySelect = document.getElementById("category");
  const addBtn = document.getElementById("addBtn");
  const filterSelect = document.getElementById("filter");
  const expensesList = document.getElementById("expensesList");
  const emptyState = document.getElementById("emptyState");
  const totalSpan = document.getElementById("total");

  let expenses = [];

  function formatCurrency(amount) {
    return `KES ${amount.toFixed(2)}`;
  }

  function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalSpan.textContent = formatCurrency(total);
  }

  function renderExpenses() {
    const filter = filterSelect.value;
    const filteredExpenses =
      filter === "all"
        ? expenses
        : expenses.filter((exp) => exp.category === filter);

    expensesList.innerHTML = "";

    if (filteredExpenses.length === 0) {
      emptyState.classList.remove("hidden");
    } else {
      emptyState.classList.add("hidden");
      filteredExpenses.forEach((expense, index) => {
        const li = document.createElement("li");
        li.className = "p-4 flex justify-between items-center";
        li.innerHTML = `
                    <div>
                        <div class="font-medium">${expense.description}</div>
                        <div class="text-sm text-gray-500">${expense.category} - ${expense.date}</div>
                    </div>
                    <div class="text-lg font-semibold text-red-500">${formatCurrency(expense.amount)}</div>
                `;
        expensesList.appendChild(li);
      });
    }
  }

  addBtn.addEventListener("click", function () {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if (!description || isNaN(amount) || amount <= 0 || !category) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const expense = {
      description,
      amount,
      category,
      date: new Date().toLocaleDateString(),
    };

    expenses.push(expense);
    updateTotal();
    renderExpenses();

    descriptionInput.value = "";
    amountInput.value = "";
    categorySelect.value = "";
  });

  filterSelect.addEventListener("change", renderExpenses);

  renderExpenses();

  module.exports = { Expense, ExpenseTracker };
});
