document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    

    // Add navigation handlers
    function handleBackClick() {
        window.location.href = 'index.html';
    }

    function handleHomeClick() {
        window.location.href = 'index.html';
    }

    function handleLaunchClick() {
        window.location.href = 'launch.html';
    }

    function handleMyClick() {
        window.location.href = 'my.html';
    }

    // Make navigation handlers global
    window.handleBackClick = handleBackClick;
    window.handleHomeClick = handleHomeClick;
    window.handleLaunchClick = handleLaunchClick;
    window.handleMyClick = handleMyClick;


    
    // Get DOM elements
    const withdrawalForm = document.getElementById('withdrawalForm');
    const withdrawalsList = document.getElementById('withdrawalsList');
    const bankDetailsModal = document.getElementById('bankDetailsModal');
    const bankDetailsForm = document.getElementById('bankDetailsForm');
    const bankDetailsBtn = document.getElementById('bankDetailsBtn');
    const closeBtn = document.querySelector('.close');
    const modalTitle = document.getElementById('modalTitle');
    const existingBankDetails = document.getElementById('existingBankDetails');
    const toast = document.getElementById('toast');

    // Load existing data
    let withdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]');
    const bankDetails = JSON.parse(localStorage.getItem('bankDetails'));

    // Initialize bank details display
    if (bankDetails) {
        displayBankDetails(bankDetails);
        bankDetailsBtn.textContent = 'Update Bank Details';
    }

    // Event Listeners
    bankDetailsBtn.addEventListener('click', () => {
        modalTitle.textContent = bankDetails ? 'Update Bank Details' : 'Add Bank Details';
        if (bankDetails) {
            document.getElementById('accountName').value = bankDetails.accountName;
            document.getElementById('accountNumber').value = bankDetails.accountNumber;
            document.getElementById('bankName').value = bankDetails.bankName;
        }
        bankDetailsModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        bankDetailsModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === bankDetailsModal) {
            bankDetailsModal.style.display = 'none';
        }
    });

    // Handle bank details form submission
    bankDetailsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newBankDetails = {
            accountName: document.getElementById('accountName').value,
            accountNumber: document.getElementById('accountNumber').value,
            bankName: document.getElementById('bankName').value
        };

        // Validate account number
        if (newBankDetails.accountNumber.length !== 10) {
            showToast('Account number must be 10 digits');
            return;
        }

        localStorage.setItem('bankDetails', JSON.stringify(newBankDetails));
        displayBankDetails(newBankDetails);
        bankDetailsModal.style.display = 'none';
        bankDetailsForm.reset();
        bankDetailsBtn.textContent = 'Update Bank Details';
        showToast('Bank details saved successfully');
    });

    // Handle withdrawal form submission
    withdrawalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const amount = document.getElementById('amount').value;
        const method = document.getElementById('method').value;
        
        if (!amount || !method) {
            showToast('Please fill in all fields');
            return;
        }

        if (method === 'bank' && !bankDetails) {
            showToast('Please add your bank details first');
            return;
        }

        const withdrawal = {
            id: Date.now(),
            amount: parseFloat(amount),
            method: method,
            date: new Date().toLocaleDateString(),
            status: 'Pending'
        };

        withdrawals.unshift(withdrawal);
        localStorage.setItem('withdrawals', JSON.stringify(withdrawals));
        
        renderWithdrawals();
        withdrawalForm.reset();
        showToast('Withdrawal request submitted successfully');
    });

    // Account number input validation
    const accountNumberInput = document.getElementById('accountNumber');
    accountNumberInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });

    // Helper Functions
    function displayBankDetails(details) {
        const bankName = document.querySelector(`#bankName option[value="${details.bankName}"]`)?.textContent || details.bankName;
        existingBankDetails.style.display = 'block';
        existingBankDetails.innerHTML = `
            <div class="bank-info-item"><strong>Account Name:</strong> ${details.accountName}</div>
            <div class="bank-info-item"><strong>Account Number:</strong> ${details.accountNumber}</div>
            <div class="bank-info-item"><strong>Bank Name:</strong> ${bankName}</div>
        `;
    }

    function renderWithdrawals() {
        withdrawalsList.innerHTML = withdrawals.length ? '' : '<p>No recent withdrawals</p>';
        
        withdrawals.forEach(withdrawal => {
            const div = document.createElement('div');
            div.className = 'withdrawal-item';
            div.innerHTML = `
                <div>
                    <strong>$${withdrawal.amount.toFixed(2)}</strong> via ${withdrawal.method}
                </div>
                <div>
                    ${withdrawal.date} - ${withdrawal.status}
                </div>
            `;
            withdrawalsList.appendChild(div);
        });
    }

    function showToast(message) {
        toast.textContent = message;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    // Initial render
    renderWithdrawals();
});

