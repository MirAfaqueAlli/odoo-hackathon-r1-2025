// Authentication module

let currentUser = null;
let authStateChangeCallbacks = [];

// Initialize Google Auth
function initializeGoogleAuth() {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your actual Google Client ID
        callback: handleCredentialResponse
    });

    renderGoogleButton();
}

// Render Google Sign-In button
function renderGoogleButton() {
    google.accounts.id.renderButton(
        document.querySelector('.google-signin-wrapper'),
        { 
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            width: document.querySelector('.google-signin-wrapper').offsetWidth
        }
    );
}

// Handle Google Sign-In Response
function handleCredentialResponse(response) {
    const responsePayload = jwt_decode(response.credential);
    
    const user = {
        id: responsePayload.sub,
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture,
        bio: '',
        questions: [],
        answers: [],
        mentions: []
    };
    
    handleAuthSuccess(user);
}

// Handle successful authentication
function handleAuthSuccess(user) {
    currentUser = user;
    
    // Update UI elements
    updateUserInterface();
    
    // Notify all subscribers of auth state change
    notifyAuthStateChange();
    
    console.log('User signed in:', user);
}

// Update UI after authentication
function updateUserInterface() {
    // Update profile information
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileHeaderAvatar').src = currentUser.picture;
    document.getElementById('userAvatar').src = currentUser.picture;
    document.getElementById('profilePageName').textContent = currentUser.name;
    document.getElementById('profilePageEmail').textContent = currentUser.email;
    document.getElementById('profilePageAvatar').src = currentUser.picture;
    
    // Show/hide appropriate sections
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('userInfo').style.display = 'flex';
    document.getElementById('authRequired').style.display = 'none';
    
    // Enable form
    document.getElementById('questionForm').classList.remove('disabled-form');
}

// Sign out user
function signOut() {
    currentUser = null;
    
    // Update UI
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('authRequired').style.display = 'flex';
    document.getElementById('profilePage').style.display = 'none';
    document.querySelector('.ask-section').style.display = 'block';
    document.querySelector('.questions-section').style.display = 'block';
    
    // Disable form
    document.getElementById('questionForm').classList.add('disabled-form');
    
    // Notify all subscribers of auth state change
    notifyAuthStateChange();
    
    console.log('User signed out');
}

// Check if user is authenticated
function checkAuth() {
    if (!currentUser) {
        document.getElementById('authRequired').style.display = 'flex';
        document.getElementById('questionForm').classList.add('disabled-form');
        return false;
    }
    return true;
}

// Subscribe to auth state changes
function onAuthStateChanged(callback) {
    authStateChangeCallbacks.push(callback);
}

// Notify subscribers of auth state change
function notifyAuthStateChange() {
    authStateChangeCallbacks.forEach(callback => callback(currentUser));
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Update user profile
function updateUserProfile(updates) {
    if (!currentUser) return;
    
    currentUser = {
        ...currentUser,
        ...updates
    };
    
    updateUserInterface();
    notifyAuthStateChange();
}

export {
    initializeGoogleAuth,
    signOut,
    checkAuth,
    getCurrentUser,
    onAuthStateChanged,
    updateUserProfile
}; 