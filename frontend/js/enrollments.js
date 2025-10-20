const ENTITY_URL = `${API_URL}/enrollments`;

async function renderEnrollments(isSearch = false) {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const list = document.getElementById('data-list');
    list.innerHTML = '<tr><td colspan="3">Loading...</td></tr>';

    try {
        const response = await fetch(ENTITY_URL);
        const enrollments = await response.json();

        let filtered = enrollments;
        if (isSearch) {
            filtered = enrollments.filter(item =>
                (item.student_name && item.student_name.toLowerCase().includes(searchTerm)) ||
                (item.course_name && item.course_name.toLowerCase().includes(searchTerm))
            );
        }

        list.innerHTML = '';
        if (filtered.length === 0) {
            list.innerHTML = `<tr><td colspan="3">${isSearch ? 'No results found.' : 'No enrollments found.'}</td></tr>`;
            return;
        }

        filtered.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.student_name}</td>
                <td>${item.course_name}</td>
                <td>${item.enrollment_date}</td>
            `;
            list.appendChild(tr);
        });
    } catch (error) {
        console.error('Failed to fetch enrollments:', error);
        list.innerHTML = '<tr><td colspan="3">Error loading data. Is the backend running?</td></tr>';
    }
}