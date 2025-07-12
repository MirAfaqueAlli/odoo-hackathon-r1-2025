// Utility functions
function getQuestions() {
  return JSON.parse(localStorage.getItem('stackit-questions') || '[]');
}

function saveQuestions(questions) {
  localStorage.setItem('stackit-questions', JSON.stringify(questions));
}

function getNotifications() {
  return JSON.parse(localStorage.getItem('stackit-notifications') || '[]');
}

function saveNotifications(notifs) {
  localStorage.setItem('stackit-notifications', JSON.stringify(notifs));
}

function addNotification(text) {
  const notifs = getNotifications();
  notifs.unshift({ id: Date.now(), text, read: false });
  saveNotifications(notifs);
  updateNotificationUI();
}

function updateNotificationUI() {
  const notifs = getNotifications();
  const unread = notifs.filter(n => !n.read);
  const countElem = document.getElementById('notif-count');
  const dropdown = document.getElementById('notif-dropdown');

  if (countElem) countElem.textContent = unread.length;
  if (dropdown) {
    dropdown.innerHTML = '';
    if (notifs.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'notif-item';
      emptyDiv.innerText = 'No notifications yet.';
      dropdown.appendChild(emptyDiv);
    } else {
      notifs.slice(0, 5).forEach(n => {
        const div = document.createElement('div');
        div.className = 'notif-item';
        div.innerText = n.text;
        dropdown.appendChild(div);
      });
    }
  }
}

const bell = document.getElementById('notification-bell');
if (bell) {
  bell.style.position = 'relative';
  bell.style.display = 'inline-block';
  bell.style.marginLeft = '20px';
  bell.addEventListener('click', () => {
    const dropdown = document.getElementById('notif-dropdown');
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      const notifs = getNotifications().map(n => ({ ...n, read: true }));
      saveNotifications(notifs);
      updateNotificationUI();
    }
  });
  updateNotificationUI();
}

// === INDEX PAGE ===
if (window.location.pathname.includes('index.html')) {
  const container = document.getElementById('questions-container');
  const tagList = document.getElementById('tag-list');
  const clearFilterBtn = document.getElementById('clear-filter');

  let questions = getQuestions();
  let activeTag = null;

  renderTagFilters();
  renderQuestions(questions);

  function renderQuestions(list) {
    container.innerHTML = '';
    if (list.length === 0) {
      container.innerHTML = `<p>No questions found.</p>`;
      return;
    }
    list.slice().reverse().forEach(q => {
      const card = document.createElement('div');
      card.className = 'question-card';
      card.innerHTML = `
        <h2>${q.title}</h2>
        <p>${truncateText(q.description, 120)}</p>
        <div class="tags">
          ${q.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      `;
      card.addEventListener('click', () => {
        window.location.href = `question.html?id=${q.id}`;
      });
      container.appendChild(card);
    });
  }

  function renderTagFilters() {
    const uniqueTags = Array.from(new Set(questions.flatMap(q => q.tags)));
    tagList.innerHTML = '';
    uniqueTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'tag-filter';
      btn.innerText = tag;
      btn.addEventListener('click', () => {
        activeTag = tag;
        const filtered = questions.filter(q => q.tags.includes(tag));
        renderQuestions(filtered);
        clearFilterBtn.style.display = 'inline-block';
      });
      tagList.appendChild(btn);
    });

    clearFilterBtn.addEventListener('click', () => {
      activeTag = null;
      renderQuestions(questions);
      clearFilterBtn.style.display = 'none';
    });
  }

  function truncateText(html, limit) {
    const div = document.createElement('div');
    div.innerHTML = html;
    const text = div.textContent || div.innerText || '';
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}

// === ASK PAGE ===
if (window.location.pathname.includes('ask.html')) {
  let quill;
  window.addEventListener('DOMContentLoaded', () => {
    quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Write your question here...',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          [{ align: [] }]
        ]
      }
    });

    const tagsContainer = document.getElementById('tag-select');
    tagsContainer.querySelectorAll('.tag-option').forEach(tag => {
      tag.addEventListener('click', () => tag.classList.toggle('selected'));
    });

    document.getElementById('question-form').addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      const description = quill.root.innerHTML.trim();
      const selectedTags = Array.from(document.querySelectorAll('.tag-option.selected')).map(tag => tag.innerText);

      if (!title || !description || selectedTags.length === 0) {
        alert('Please fill all fields and select at least one tag.');
        return;
      }

      const newQuestion = {
        id: Date.now(),
        title,
        description,
        tags: selectedTags,
        answers: [],
        acceptedAnswerIndex: null
      };

      const questions = getQuestions();
      questions.push(newQuestion);
      saveQuestions(questions);

      alert('Question submitted successfully!');
      window.location.href = 'index.html';
    });
  });
}

// === QUESTION PAGE ===
if (window.location.pathname.includes('question.html')) {
  let answerEditor;
  window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    const questions = getQuestions();
    const question = questions.find(q => q.id === id);

    if (!question) {
      document.body.innerHTML = '<p>Question not found.</p>';
      return;
    }

    const answersContainer = document.getElementById('answers');
    document.getElementById('question-title').innerText = question.title;
    document.getElementById('question-description').innerHTML = question.description;
    document.getElementById('question-tags').innerHTML = question.tags
      .map(tag => `<span class="tag">${tag}</span>`)
      .join('');

    answersContainer.innerHTML = '';
    question.answers.forEach((answer, i) => {
      const div = document.createElement('div');
      div.className = 'answer';

      if (question.acceptedAnswerIndex === i) {
        div.classList.add('accepted');
        div.innerHTML += `<div class="accepted-badge">✅ Accepted Answer</div>`;
      }

      div.innerHTML += `
        <div>${answer.text}</div>
        <div class="vote-bar">
          <button class="vote-up" data-index="${i}" title="Upvote">⬆️</button>
          <span class="vote-count" id="vote-${i}">${answer.votes ?? 0}</span>
          <button class="vote-down" data-index="${i}" title="Downvote">⬇️</button>
        </div>
        <button class="mark-accepted" data-index="${i}">✅ Mark as Accepted</button>
      `;
      answersContainer.appendChild(div);
    });

    answerEditor = new Quill('#answer-editor', {
      theme: 'snow',
      placeholder: 'Write your answer...',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link']
        ]
      }
    });

    document.getElementById('answer-form').addEventListener('submit', e => {
      e.preventDefault();
      const answerHtml = answerEditor.root.innerHTML.trim();
      if (!answerHtml || answerHtml === '<p><br></p>') {
        alert('Answer cannot be empty.');
        return;
      }
      question.answers.push({ text: answerHtml, votes: 0 });
      addNotification(`💬 Someone answered your question: "${question.title}"`);
      saveQuestions(questions);
      alert('Answer submitted!');
      location.reload();
    });

    document.querySelectorAll('.vote-up').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.dataset.index;
        question.answers[i].votes = (question.answers[i].votes || 0) + 1;
        saveQuestions(questions);
        document.getElementById(`vote-${i}`).innerText = question.answers[i].votes;
      });
    });

    document.querySelectorAll('.vote-down').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.dataset.index;
        question.answers[i].votes = (question.answers[i].votes || 0) - 1;
        saveQuestions(questions);
        document.getElementById(`vote-${i}`).innerText = question.answers[i].votes;
      });
    });

    document.querySelectorAll('.mark-accepted').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.index);
        question.acceptedAnswerIndex = i;
        addNotification(`✅ An answer was accepted for: "${question.title}"`);
        saveQuestions(questions);
        alert('Marked as accepted!');
        location.reload();
      });
    });
  });
}