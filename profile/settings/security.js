document.getElementById('passwordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match!');
        return;
    }

    // Here you would typically make an API call to update the password
    console.log('Password update requested:', {
        currentPassword,
        newPassword
    });

    // Clear the form
    this.reset();
    alert('Password updated successfully!');
});

document.getElementById('twoFactorToggle').addEventListener('change', function(e) {
    const isEnabled = e.target.checked;
    console.log('Two-factor authentication:', isEnabled ? 'enabled' : 'disabled');
    // Here you would typically make an API call to update the 2FA status
});