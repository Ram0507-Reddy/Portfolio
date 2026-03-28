document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const addBtn = document.getElementById('addBtn');
    const futureBtn = document.getElementById('futureBtn');
    const taskList = document.getElementById('taskList');
    const progressBar = document.getElementById('progressBar');

    const SVGS = {
        GRIP: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="grab-handle"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>',
        TRASH: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>',
        CAL: '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>'
    };

    // Toggle Future Date Input
    futureBtn.onclick = () => {
        dateInput.classList.toggle('hidden');
        if (!dateInput.classList.contains('hidden')) {
            dateInput.focus();
        }
    };

    // Progress Logic
    function updateProgress() {
        const tasks = taskList.querySelectorAll('li');
        const total = tasks.length;
        const done = taskList.querySelectorAll('li.completed').length;
        const percent = total === 0 ? 0 : (done / total) * 100;
        progressBar.style.width = `${percent}%`;

        // Toggle Clear button
        if (done > 0) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }
    }

    clearBtn.onclick = () => {
        taskList.querySelectorAll('li.completed').forEach(li => li.remove());
        saveTasks();
    };

    // Load from LocalStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks2026') || '[]');
    savedTasks.forEach(task => renderTask(task.text, task.completed, task.date, task.priority, true));
    updateProgress();

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').innerText,
                completed: li.classList.contains('completed'),
                date: li.dataset.date || null,
                priority: li.dataset.priority || 'low'
            });
        });
        localStorage.setItem('tasks2026', JSON.stringify(tasks));
        updateProgress();
    }

    function renderTask(text, isCompleted = false, date = null, priority = 'low', isInitialLoad = false) {
        const li = document.createElement('li');
        li.draggable = true;
        li.dataset.date = date && date !== "" ? date : null;
        li.dataset.priority = priority;
        if (isCompleted) li.classList.add('completed');

        li.innerHTML = SVGS.GRIP;

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('task-content');

        const span = document.createElement('span');
        span.classList.add('task-text');
        span.innerText = text;
        contentDiv.appendChild(span);

        if (li.dataset.date && li.dataset.date !== "null") {
            const badge = document.createElement('span');
            badge.classList.add('scheduled-badge');
            const dateObj = new Date(li.dataset.date);
            badge.innerHTML = `${SVGS.CAL} ${dateObj.toLocaleDateString()}`;
            contentDiv.appendChild(badge);
        }

        const delBtn = document.createElement('button');
        delBtn.innerHTML = SVGS.TRASH;
        delBtn.classList.add('delete-btn');
        delBtn.onclick = (e) => {
            e.stopPropagation();
            li.style.transform = 'scale(0.8) opacity(0)';
            setTimeout(() => {
                li.remove();
                saveTasks();
            }, 300);
        };

        li.onclick = () => {
            li.classList.toggle('completed');
            saveTasks();
        };

        // Priority Cycle toggle (on double click)
        li.ondblclick = (e) => {
            e.stopPropagation();
            const p = li.dataset.priority;
            li.dataset.priority = p === 'low' ? 'medium' : (p === 'medium' ? 'high' : 'low');
            saveTasks();
        };

        // Drag and Drop Logic
        li.addEventListener('dragstart', () => li.classList.add('dragging'));
        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
            saveTasks();
        });

        li.appendChild(contentDiv);
        li.appendChild(delBtn);

        li.style.opacity = '0';
        li.style.transform = 'translateY(-20px)';

        if (isInitialLoad) {
            taskList.appendChild(li);
        } else {
            taskList.prepend(li);
        }

        setTimeout(() => {
            li.style.opacity = '1';
            li.style.transform = 'translateY(0)';
        }, 10);
    }

    // Dragover logic
    taskList.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(taskList, e.clientY);
        const dragging = document.querySelector('.dragging');
        if (dragging) {
            if (afterElement == null) {
                taskList.appendChild(dragging);
            } else {
                taskList.insertBefore(dragging, afterElement);
            }
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    addBtn.onclick = () => {
        const text = input.value.trim();
        let date = dateInput.value;

        // If Future button was clicked but no date given, default to Today
        if (!dateInput.classList.contains('hidden') && !date) {
            date = new Date().toISOString().split('T')[0];
        }

        if (text) {
            renderTask(text, false, date || null, 'low');
            input.value = '';
            dateInput.value = '';
            dateInput.classList.add('hidden');
            saveTasks();
        }
    };

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addBtn.click();
    });
});
