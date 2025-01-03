// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// Profile Actions
function handleEditPhoto() {
    // Implement photo upload functionality
    console.log('Edit photo clicked');
}

function handlePersonalInfo() {
    // Navigate to personal info page
    console.log('Personal info clicked');
}

function handleSecurity() {
    // Navigate to security settings
    console.log('Security clicked');
}

function handleNotifications() {
    // Navigate to notification settings
    console.log('Notifications clicked');
}

function handleLanguage() {
    // Open language selection
    console.log('Language clicked');
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Implement logout functionality
        console.log('Logging out...');
    }
}

// Navigation handlers
function handleHomeClick() {
    window.location.href = '../dashboard/index.html';
}

function handleLaunchClick() {
    window.location.href = '../task/index.html';
}

function handleMyClick() {
    window.location.href = '../profile/index.html';
}