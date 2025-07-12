// Questions display module

function createQuestionCard(question, currentUser) {
    const isMyQuestion = question.author === currentUser?.name;
    const myQuestionClass = isMyQuestion ? 'my-question' : '';
    const myQuestionBadge = isMyQuestion ? 
        '<span class="my-question-badge">My Question</span>' : 
        '';

    return `
        <div class="question-card ${myQuestionClass}" data-id="${question.id}">
            <div class="question-title">${question.title}</div>
            <div class="question-content">${question.content}</div>
            <div class="question-tags">
                ${question.tags.map(tag => `
                    <a href="#" class="question-tag" onclick="filterByTag('${tag}')">${tag}</a>
                `).join('')}
            </div>
            <div class="question-meta">
                <span class="category-tag">${question.category}</span>
                <span>Asked by ${question.author} on ${question.timestamp}</span>
                ${myQuestionBadge}
            </div>
            ${createAnswersSection(question, currentUser)}
        </div>
    `;
}

function createAnswersSection(question, currentUser) {
    return `
        <div class="answers-section">
            <div class="answers-header">
                ${question.answers.length} ${question.answers.length === 1 ? 'Answer' : 'Answers'}
            </div>
            <div class="answers-list">
                ${question.answers.map(answer => createAnswerCard(answer, question, currentUser)).join('')}
            </div>
            ${createAnswerForm(question, currentUser)}
        </div>
    `;
}

function createAnswerCard(answer, question, currentUser) {
    const acceptButton = question.author === currentUser?.name ? `
        <button class="accept-btn ${answer.accepted ? 'accepted' : ''}" 
                onclick="acceptAnswer(${question.id}, ${answer.id})">
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
        </button>
    ` : '';

    return `
        <div class="answer-wrapper ${answer.accepted ? 'accepted' : ''}" data-id="${answer.id}">
            <div class="vote-buttons">
                <button class="vote-btn ${answer.userVote === 1 ? 'voted' : ''}" 
                        onclick="voteAnswer(${question.id}, ${answer.id}, 1)">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 4l-8 8h6v8h4v-8h6z"/>
                    </svg>
                </button>
                <span class="vote-count">${answer.votes || 0}</span>
                <button class="vote-btn ${answer.userVote === -1 ? 'voted' : ''}" 
                        onclick="voteAnswer(${question.id}, ${answer.id}, -1)">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 20l-8-8h6V4h4v8h6z"/>
                    </svg>
                </button>
            </div>
            ${acceptButton}
            <div class="answer-content">
                <div>${answer.content}</div>
                <div class="answer-meta">
                    Answered by ${answer.author} on ${answer.timestamp}
                </div>
            </div>
        </div>
    `;
}

function createAnswerForm(question, currentUser) {
    if (!currentUser) {
        return '<div class="auth-required"><span>⚠️</span><span>Please sign in to answer questions.</span></div>';
    }

    return `
        <div class="answer-form">
            <div class="answer-editor">
                <textarea class="answer-input" placeholder="Write your answer..." 
                          data-question-id="${question.id}"></textarea>
            </div>
            <button class="answer-btn" onclick="addAnswer(${question.id})">
                Submit Answer
            </button>
        </div>
    `;
}

function displayQuestions(questionsToDisplay = null, currentUser = null) {
    const questionsList = document.getElementById('questionsList');
    const displayedQuestions = questionsToDisplay || questions;

    if (displayedQuestions.length === 0) {
        displayEmptyState(questionsList, currentUser);
        return;
    }

    questionsList.innerHTML = displayedQuestions
        .map(question => createQuestionCard(question, currentUser))
        .join('');

    // Initialize answer editors after displaying questions
    initializeAnswerEditors();
}

function displayEmptyState(container, currentUser) {
    const emptyStateMessage = currentUser ? {
        title: "Start the Conversation",
        message: "Ask your first question to get started!",
        icon: `<svg viewBox="0 0 24 24" width="48" height="48" style="fill: #0066cc; margin-bottom: 16px;">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
              </svg>`
    } : {
        title: "Join the Community",
        message: "Sign in to ask questions and share your knowledge!",
        icon: `<svg viewBox="0 0 24 24" width="48" height="48" style="fill: #6a737c; margin-bottom: 16px;">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>`
    };

    container.innerHTML = `
        <div class="empty-state">
            ${emptyStateMessage.icon}
            <h3>${emptyStateMessage.title}</h3>
            <p>${emptyStateMessage.message}</p>
            ${currentUser ? 
                '<button onclick="focusQuestionForm()" class="btn">Ask a Question</button>' : 
                '<button onclick="showLoginPrompt()" class="btn">Sign In Now</button>'
            }
        </div>
    `;
}

export {
    displayQuestions,
    createQuestionCard,
    createAnswersSection,
    createAnswerCard,
    createAnswerForm
}; 