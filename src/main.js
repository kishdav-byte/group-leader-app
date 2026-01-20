// Main Logic for Group Leader App

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

const state = {
    currentPage: 'dashboard',
    user: {
        name: 'David Kish',
        role: 'Small Group Leader',
        church: 'Grace Community Church'
    },
    lessons: [
        { id: 1, title: 'Walking by Faith', topic: 'Faith', date: 'Oct 24, 2026', status: 'Draft' },
        { id: 2, title: 'The Power of Prayer', topic: 'Prayer', date: 'Oct 17, 2026', status: 'Completed' },
        { id: 3, title: 'Love Thy Neighbor', topic: 'Community', date: 'Oct 10, 2026', status: 'Completed' }
    ],
    members: [
        { id: 1, name: 'John Doe', role: 'Member' },
        { id: 2, name: 'Jane Smith', role: 'Member' },
        { id: 3, name: 'Mary Wilson', role: 'Leader Assistant' }
    ]
};

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

            // Update UI
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            renderCurrentPage();
        });
    });

    document.getElementById('new-lesson-btn').addEventListener('click', () => {
        showModal('create-lesson');
    });
}

function renderCurrentPage() {
    const mainView = document.getElementById('main-view');
    const pageTitle = document.getElementById('page-title');

    // Smooth transition
    mainView.style.opacity = '0';

    setTimeout(() => {
        switch (state.currentPage) {
            case 'dashboard':
                pageTitle.textContent = `Welcome back, ${state.user.name.split(' ')[0]}`;
                renderDashboard(mainView);
                break;
            case 'lessons':
                pageTitle.textContent = 'Bible Lessons';
                renderLessons(mainView);
                break;
            case 'members':
                pageTitle.textContent = 'Group Members';
                renderMembers(mainView);
                break;
            case 'notes':
                pageTitle.textContent = 'Personal Study Notes';
                renderNotes(mainView);
                break;
            case 'prayer':
                pageTitle.textContent = 'Prayer Booth';
                renderPrayer(mainView);
                break;
            case 'leader-connect':
                pageTitle.textContent = 'Church Leadership Connect';
                renderLeaderConnect(mainView);
                break;
            default:
                mainView.innerHTML = '<p>Page coming soon...</p>';
        }
        mainView.style.opacity = '1';
        mainView.style.transition = 'opacity 0.3s ease';
    }, 100);
}

function renderDashboard(container) {
    container.innerHTML = `
        <div class="dashboard-grid">
            <div class="stat-card">
                <h3>Group Members</h3>
                <p class="value">${state.members.length}</p>
            </div>
            <div class="stat-card">
                <h3>Lessons Created</h3>
                <p class="value">${state.lessons.length}</p>
            </div>
            <div class="stat-card">
                <h3>Prayer Requests</h3>
                <p class="value">12</p>
            </div>
        </div>

        <div style="margin: 3rem 0;">
            <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1.5rem; color: var(--text-primary);">Upcoming Lessons</h3>
            <div class="lesson-grid">
                ${state.lessons.map(lesson => `
                    <div class="lesson-card">
                        <span class="topic">${lesson.topic}</span>
                        <h4>${lesson.title}</h4>
                        <div class="lesson-meta">
                            <span>📅 ${lesson.date}</span>
                            <span>${lesson.status}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="ai-suggestion-box">
            <h4>
                <span>✨</span> Bible AI Assistant
            </h4>
            <p>
                "Consider focusing your next lesson on <strong>Patience in Times of Trials</strong> based on James 1:2-4. Your group has expressed several challenges this week."
            </p>
            <button class="btn-primary">Generate Lesson Plan</button>
        </div>
    `;
}

function renderLessons(container) {
    container.innerHTML = `
        <div class="lessons-container">
            <div class="lesson-controls" style="margin-bottom: 2rem; display: flex; gap: 1rem;">
                <input type="text" placeholder="Search lessons or topics..." style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(0,0,0,0.1);">
                <select style="padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(0,0,0,0.1);">
                    <option>All Topics</option>
                    <option>Faith</option>
                    <option>Prayer</option>
                </select>
            </div>
            <div class="lesson-list">
                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: var(--shadow);">
                    <thead style="background: rgba(0,0,0,0.02);">
                        <tr>
                            <th style="padding: 1rem; text-align: left;">Lesson Title</th>
                            <th style="padding: 1rem; text-align: left;">Topic</th>
                            <th style="padding: 1rem; text-align: left;">Date</th>
                            <th style="padding: 1rem; text-align: left;">Status</th>
                            <th style="padding: 1rem; text-align: left;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.lessons.map(l => `
                            <tr style="border-top: 1px solid rgba(0,0,0,0.05);">
                                <td style="padding: 1rem; font-weight: 600;">${l.title}</td>
                                <td style="padding: 1rem;">${l.topic}</td>
                                <td style="padding: 1rem;">${l.date}</td>
                                <td style="padding: 1rem;"><span style="color: ${l.status === 'Draft' ? '#f59e0b' : '#10b981'}">${l.status}</span></td>
                                <td style="padding: 1rem;">
                                    <button class="btn-action">Edit</button>
                                    <button class="btn-action" onclick="printLesson(${l.id})">Print</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

window.printLesson = function (id) {
    const lesson = state.lessons.find(l => l.id === id);
    if (!lesson) return;

    document.getElementById('print-title').textContent = lesson.title;
    document.getElementById('print-scripture').textContent = `Focusing on ${lesson.topic}... "Faith is the substance of things hoped for, the evidence of things not seen." — Hebrews 11:1`;

    window.print();
}

// Placeholder functions for other views
function renderMembers(c) { c.innerHTML = '<p>Members management view...</p>'; }
function renderNotes(c) { c.innerHTML = '<p>Personal notes and study space...</p>'; }
function renderPrayer(c) { c.innerHTML = '<p>Prayer requests and study tools...</p>'; }
function renderLeaderConnect(c) { c.innerHTML = '<p>Connecting with church leadership...</p>'; }

// Modal Logic
function showModal(type) {
    const modal = document.getElementById('modal-container');
    const content = modal.querySelector('.modal-content');

    modal.classList.remove('hidden');

    if (type === 'create-lesson') {
        content.innerHTML = `
            <h3 style="margin-bottom: 1.5rem;">Create New Lesson</h3>
            <form id="new-lesson-form">
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Lesson Title</label>
                    <input type="text" placeholder="e.g., Understanding the Beatitudes" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(0,0,0,0.1);">
                </div>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Scripture Reference</label>
                    <input type="text" placeholder="e.g., Matthew 5:1-12" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(0,0,0,0.1);">
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Study Duration</label>
                    <select style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(0,0,0,0.1);">
                        <option>1 Week</option>
                        <option>4 Weeks (1 Month)</option>
                        <option>8 Weeks (2 Months)</option>
                    </select>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
                    <button type="submit" class="btn-primary">Generate Lesson Structure</button>
                </div>
            </form>
        `;
    }
}

window.closeModal = function () {
    document.getElementById('modal-container').classList.add('hidden');
}
