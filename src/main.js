// Main Logic for GroupLeader - Gothic Christian Edition

// Sacred Verses for Weekly Rotation
const sacredVerses = [
    {
        text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.",
        reference: "Jeremiah 29:11"
    },
    {
        text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
        reference: "Proverbs 3:5-6"
    },
    {
        text: "I can do all things through him who strengthens me.",
        reference: "Philippians 4:13"
    },
    {
        text: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
        reference: "Psalm 23:1-3"
    },
    {
        text: "Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go.",
        reference: "Joshua 1:9"
    },
    {
        text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
        reference: "Romans 8:28"
    },
    {
        text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
        reference: "Matthew 6:33"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    rotateVerse();
});

const state = {
    currentPage: 'dashboard',
    user: {
        name: 'David Kish',
        role: 'Shepherd of His Flock',
        church: 'Grace Community Church'
    },
    lessons: [
        { id: 1, title: 'Walking by Faith, Not by Sight', topic: 'Faith', date: 'January 24, 2026', status: 'Draft' },
        { id: 2, title: 'The Power of Persistent Prayer', topic: 'Prayer', date: 'January 17, 2026', status: 'Completed' },
        { id: 3, title: 'Love Thy Neighbor as Thyself', topic: 'Community', date: 'January 10, 2026', status: 'Completed' }
    ],
    members: [
        { id: 1, name: 'John Doe', role: 'Member' },
        { id: 2, name: 'Jane Smith', role: 'Member' },
        { id: 3, name: 'Mary Wilson', role: 'Leader Assistant' }
    ],
    currentVerseIndex: 0
};

function rotateVerse() {
    const weekNumber = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
    state.currentVerseIndex = weekNumber % sacredVerses.length;
    
    const verse = sacredVerses[state.currentVerseIndex];
    document.getElementById('verse-text').textContent = verse.text;
    document.getElementById('verse-reference').textContent = `— ${verse.reference}`;
}

function initApp() {
    setupNavigation();
    renderCurrentPage();
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const page = link.getAttribute('data-page');
            state.currentPage = page;
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            renderCurrentPage();
        });
    });
}

function renderCurrentPage() {
    const mainView = document.getElementById('main-view');
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    
    mainView.style.opacity = '0';
    
    setTimeout(() => {
        switch(state.currentPage) {
            case 'dashboard':
                pageTitle.textContent = `Welcome back, ${state.user.name.split(' ')[0]}`;
                pageSubtitle.textContent = '"Shepherd the flock of God that is among you" — 1 Peter 5:2';
                renderDashboard(mainView);
                break;
            case 'lessons':
                pageTitle.textContent = 'Sacred Lessons';
                pageSubtitle.textContent = '"All Scripture is breathed out by God" — 2 Timothy 3:16';
                renderLessons(mainView);
                break;
            case 'members':
                pageTitle.textContent = 'Your Flock';
                pageSubtitle.textContent = '"Bear one another\'s burdens" — Galatians 6:2';
                renderMembers(mainView);
                break;
            case 'notes':
                pageTitle.textContent = 'Personal Study Notes';
                pageSubtitle.textContent = '"Write the vision; make it plain" — Habakkuk 2:2';
                renderNotes(mainView);
                break;
            case 'prayer':
                pageTitle.textContent = 'Prayer Sanctuary';
                pageSubtitle.textContent = '"Pray without ceasing" — 1 Thessalonians 5:17';
                renderPrayer(mainView);
                break;
            case 'leader-connect':
                pageTitle.textContent = 'Church Leadership Connect';
                pageSubtitle.textContent = '"Iron sharpens iron" — Proverbs 27:17';
                renderLeaderConnect(mainView);
                break;
            default:
                mainView.innerHTML = '<p>Page coming soon...</p>';
        }
        mainView.style.opacity = '1';
        mainView.style.transition = 'opacity 0.4s ease';
    }, 150);
}

function renderDashboard(container) {
    container.innerHTML = `
        <div class="dashboard-grid">
            <div class="stat-card">
                <h3>Flock Members</h3>
                <p class="value">${state.members.length}</p>
            </div>
            <div class="stat-card">
                <h3>Lessons Prepared</h3>
                <p class="value">${state.lessons.length}</p>
            </div>
            <div class="stat-card">
                <h3>Prayer Requests</h3>
                <p class="value">12</p>
            </div>
        </div>

        <div class="divider-sacred"></div>

        <div style="margin-bottom: 3rem;">
            <h3 style="font-family: var(--font-sacred); font-size: 1.3rem; color: var(--sacred-gold); margin-bottom: 2rem; letter-spacing: 0.1em;">Upcoming Lessons</h3>
            <div class="lesson-grid">
                ${state.lessons.map(lesson => `
                    <div class="lesson-card">
                        <span class="topic">${lesson.topic}</span>
                        <h4>${lesson.title}</h4>
                        <div class="lesson-meta">
                            <span>${lesson.date}</span>
                            <span>${lesson.status}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="ai-suggestion-box">
            <h4>✞ Divine Guidance from Scripture</h4>
            <p>
                "Consider a lesson on <strong>Steadfast Faith in Trials</strong>, drawing from James 1:2-4. Your flock has faced many tribulations this week, and this message would bring them comfort and strength."
            </p>
            <button class="btn-primary" onclick="showModal('create-lesson')">Prepare Lesson</button>
        </div>
    `;
}

function renderLessons(container) {
    container.innerHTML = `
        <div class="lessons-container">
            <div style="margin-bottom: 2rem; display: flex; gap: 1rem; justify-content: flex-end;">
                <button class="btn-primary" onclick="showModal('create-lesson')">+ New Lesson</button>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Lesson Title</th>
                        <th>Topic</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.lessons.map(l => `
                        <tr>
                            <td style="font-weight: 600;">${l.title}</td>
                            <td>${l.topic}</td>
                            <td>${l.date}</td>
                            <td style="color: ${l.status === 'Draft' ? 'var(--aged-bronze)' : 'var(--sacred-gold)'}">${l.status}</td>
                            <td>
                                <button class="btn-action">Edit</button>
                                <button class="btn-action" onclick="printLesson(${l.id})">Print</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderMembers(c) { 
    c.innerHTML = `
        <div class="dashboard-grid">
            ${state.members.map(m => `
                <div class="stat-card">
                    <h3>${m.role}</h3>
                    <p style="font-family: var(--font-body); font-size: 1.2rem; color: var(--holy-cream); margin-top: 1rem;">${m.name}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderNotes(c) { 
    c.innerHTML = '<p style="font-family: var(--font-scripture); font-style: italic; color: var(--ash);">Your personal study notes will appear here...</p>'; 
}

function renderPrayer(c) { 
    c.innerHTML = '<p style="font-family: var(--font-scripture); font-style: italic; color: var(--ash);">Prayer requests and intercession tools coming soon...</p>'; 
}

function renderLeaderConnect(c) { 
    c.innerHTML = '<p style="font-family: var(--font-scripture); font-style: italic; color: var(--ash);">Connect with church leadership...</p>'; 
}

// Print Lesson
window.printLesson = function(id) {
    const lesson = state.lessons.find(l => l.id === id);
    if (!lesson) return;

    document.getElementById('print-title').textContent = lesson.title;
    document.getElementById('print-scripture').textContent = `Study on ${lesson.topic}... "Faith is the substance of things hoped for, the evidence of things not seen." — Hebrews 11:1`;
    
    window.print();
}

// Modal Logic
function showModal(type) {
    const modal = document.getElementById('modal-container');
    const content = modal.querySelector('.modal-content');
    
    modal.classList.remove('hidden');
    
    if (type === 'create-lesson') {
        content.innerHTML = `
            <h3>Create New Lesson</h3>
            <form id="new-lesson-form">
                <div>
                    <label>Lesson Title</label>
                    <input type="text" placeholder="e.g., The Beatitudes Explained">
                </div>
                <div>
                    <label>Scripture Reference</label>
                    <input type="text" placeholder="e.g., Matthew 5:1-12">
                </div>
                <div>
                    <label>Study Duration</label>
                    <select>
                        <option>1 Week</option>
                        <option>4 Weeks (1 Month)</option>
                        <option>8 Weeks (2 Months)</option>
                        <option>12 Weeks (3 Months)</option>
                    </select>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn-primary">Generate Lesson</button>
                </div>
            </form>
        `;
    }
}

window.closeModal = function() {
    document.getElementById('modal-container').classList.add('hidden');
}

window.showModal = showModal;
