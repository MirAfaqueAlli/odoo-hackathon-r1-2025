import { displayQuestions } from './modules/questions.js';
import { 
    initializeGoogleAuth, 
    signOut, 
    checkAuth, 
    getCurrentUser, 
    onAuthStateChanged 
} from './modules/auth.js';
import { 
    initializeNotifications, 
    addNotification 
} from './modules/notifications.js';
import {
    initializeRichTextEditors,
    getEditorContent,
    clearEditorContent
} from './modules/editor.js';

// Global state
let questions = [];
let questionIdCounter = 1;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeGoogleAuth();
    initializeNotifications();
    initializeRichTextEditors();
    initializeSampleData();
    
    // Initially show auth required and disable form
    document.getElementById('authRequired').style.display = 'flex';
    document.getElementById('questionForm').classList.add('disabled-form');

    // Listen for auth state changes
    onAuthStateChanged((user) => {
        if (user) {
            loadUserQuestions();
            updateStats();
        }
    });

    // Set up form submission
    setupQuestionForm();
});

// Set up question form
function setupQuestionForm() {
    const questionForm = document.getElementById('questionForm');
    questionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!checkAuth()) {
            return;
        }
        
        const title = document.getElementById('questionTitle').value;
        const content = getEditorContent('questionContent');
        const category = document.getElementById('questionCategory').value;
        const currentUser = getCurrentUser();
        
        if (title && content && category) {
            const question = {
                id: questionIdCounter++,
                title: title,
                content: content,
                category: category,
                author: currentUser.name,
                authorAvatar: currentUser.picture,
                answers: [],
                timestamp: new Date().toLocaleString()
            };
            
            questions.unshift(question);
            showAllQuestions();
            updateStats();
            questionForm.reset();
            clearEditorContent('questionContent');

            // Show success message
            showSuccessMessage(questionForm);
        }
    });
}

// Show success message
function showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="background-color: #e6f4ea; color: #28a745; padding: 12px; border-radius: 6px; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            <svg viewBox="0 0 24 24" width="24" height="24" style="fill: currentColor;">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span>Your question has been posted successfully!</span>
        </div>
    `;
    form.insertBefore(successMessage, form.firstChild);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Show all questions
function showAllQuestions() {
    updateFilterButtons('All Questions');
    displayQuestions(questions, getCurrentUser());
}

// Show user's questions
function showMyQuestions() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    updateFilterButtons('My Questions');
    const userQuestions = questions.filter(q => q.author === currentUser.name);
    displayQuestions(userQuestions, currentUser);
}

// Load user's questions
function loadUserQuestions() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    const userQuestions = questions.filter(q => q.author === currentUser.name);
    displayQuestions(userQuestions, currentUser);
}

// Update statistics
function updateStats() {
    const totalAnswers = questions.reduce((sum, q) => sum + q.answers.length, 0);
    document.getElementById('totalQuestions').textContent = questions.length;
    document.getElementById('totalAnswers').textContent = totalAnswers;
}

// Update filter buttons
function updateFilterButtons(activeFilter) {
    const buttons = document.querySelectorAll('.filter-button');
    buttons.forEach(button => {
        button.classList.toggle('active', button.textContent === activeFilter);
    });
}

// Helper functions
function focusQuestionForm() {
    document.getElementById('questionTitle').focus();
    window.scrollTo({
        top: document.querySelector('.ask-section').offsetTop - 80,
        behavior: 'smooth'
    });
}

function showLoginPrompt() {
    const googleSignInButton = document.querySelector('.google-signin-wrapper div');
    if (googleSignInButton) {
        googleSignInButton.click();
    }
}

// Export functions that need to be globally available
window.showAllQuestions = showAllQuestions;
window.showMyQuestions = showMyQuestions;
window.focusQuestionForm = focusQuestionForm;
window.showLoginPrompt = showLoginPrompt;
window.signOut = signOut; 