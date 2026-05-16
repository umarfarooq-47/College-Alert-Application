// Mock Database Array for Alerts & Notices
const campusAlerts = [
    {
        id: 1,
        title: "Summer Vacation Notification",
        category: "holidays",
        categoryLabel: "Holidays",
        date: "July 01, 2026",
        time: "N/A",
        venue: "All Campuses",
        tagColor: "bg-emerald-100 text-emerald-800",
        shortDesc: "Hazara University will remain closed for summer vacations from July 1st to August 15th, 2026. Offices will resume...",
        longDesc: "As approved by the Competent Authority, Hazara University Mansehra will remain closed for summer vacations starting from July 1st, 2026, until August 15th, 2026. Online query portals will remain partially functional for admissions."
    },
    {
        id: 2,
        title: "Mid-Term Examination Datesheet",
        category: "exams",
        categoryLabel: "Exams",
        date: "May 22, 2026",
        time: "09:00 AM",
        venue: "Main Exam Halls",
        tagColor: "bg-amber-100 text-amber-800",
        shortDesc: "The official datesheet for Software Engineering & CS Departments mid-terms has been published. Exams begin next week.",
        longDesc: "All students are advised to collect their Roll Number Slips from their respective department coordinators. Clear all pending outstanding tuition dues before May 20th to avoid registration holding blocks."
    },
    {
        id: 3,
        title: "Annual Tech-Fest & Hackathon",
        category: "events",
        categoryLabel: "Events",
        date: "June 05, 2026",
        time: "10:30 AM",
        venue: "Jinnah Auditorium",
        tagColor: "bg-purple-100 text-purple-800",
        shortDesc: "Registration is now open for Hazara University's biggest Annual Coding Challenge and UI/UX Design Hackathon.",
        longDesc: "Showcase your tech prowess at the HU Tech-Fest 2026. Winners will get exciting cash prizes, dynamic shields, and guaranteed interview entry certificates for fast-tracked corporate tech internships."
    }
];

// Display Cards Dynamically
function renderAlerts(alertsList) {
    const feed = document.getElementById('alerts-feed');
    feed.innerHTML = "";

    if(alertsList.length === 0) {
        feed.innerHTML = `<p class="text-center text-sm text-gray-400 my-8">No alerts found in this category.</p>`;
        return;
    }

    alertsList.forEach(alert => {
        const card = document.createElement('div');
        card.className = "bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all";
        card.onclick = () => openModal(alert.id);
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-3">
                <span class="px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider ${alert.tagColor}">${alert.categoryLabel}</span>
                <span class="text-xs text-gray-400 flex items-center">🗓️ ${alert.date}</span>
            </div>
            <h3 class="text-base font-bold text-gray-900 leading-snug mb-2">${alert.title}</h3>
            <p class="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">${alert.shortDesc}</p>
            <div class="flex space-x-4 text-[11px] text-gray-400 pt-3 border-t border-gray-50">
                <span>🕒 ${alert.time}</span>
                <span>📍 ${alert.venue}</span>
            </div>
        `;
        feed.appendChild(card);
    });
}

// Interactive Category Filtering Logic
function filterAlerts(category) {
    // Update active tab styles
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('bg-slate-900', 'text-white', 'border-slate-900');
        btn.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
    });

    event.target.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
    event.target.classList.add('bg-slate-900', 'text-white', 'border-slate-900');

    if(category === 'all') {
        renderAlerts(campusAlerts);
    } else {
        const filtered = campusAlerts.filter(item => item.category === category);
        renderAlerts(filtered);
    }
}

// Modal View Controls
function openModal(id) {
    const alertItem = campusAlerts.find(item => item.id === id);
    if(!alertItem) return;

    document.getElementById('modal-title').innerText = alertItem.title;
    document.getElementById('modal-date').innerText = alertItem.date;
    document.getElementById('modal-desc').innerText = alertItem.longDesc;
    document.getElementById('modal-time').innerText = `🕒 ${alertItem.time}`;
    document.getElementById('modal-venue').innerText = `📍 ${alertItem.venue}`;
    
    const tag = document.getElementById('modal-tag');
    tag.innerText = alertItem.categoryLabel;
    tag.className = `px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider ${alertItem.tagColor}`;

    document.getElementById('detail-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('detail-modal').add('hidden');
}

// Drawer Notification Menu Controls
function toggleNotifications() {
    const drawer = document.getElementById('notification-drawer');
    drawer.classList.toggle('hidden');
}

// Run Initialization automatically
window.onload = () => {
    renderAlerts(campusAlerts);
};
