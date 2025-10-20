const ENTITY_URL = `${API_URL}/instructors`;

async function renderInstructors(isSearch = false) {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const list = document.getElementById('data-list');
    list.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';

    try {
        const response = await fetch(ENTITY_URL);
        const instructors = await response.json();

        let filtered = instructors;
        if (isSearch) {
            filtered = instructors.filter(i =>
                i.instructor_name.toLowerCase().includes(searchTerm) ||
                i.email.toLowerCase().includes(searchTerm) ||
                (i.specialization && i.specialization.toLowerCase().includes(searchTerm))
            );
        }

        list.innerHTML = '';
        if (filtered.length === 0) {
            list.innerHTML = `<tr><td colspan="5">${isSearch ? 'No results found.' : 'No instructors found. Add one!'}</td></tr>`;
            return;
        }

        filtered.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.instructor_id}</td>
                <td>${item.instructor_name}</td>
                <td>${item.email}</td>
                <td>${item.specialization || 'N/A'}</td>
                <td class="actions">
                    <button class="btn btn-edit" onclick='openFormForEdit(${JSON.stringify(item)})'><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-danger" onclick="deleteItem(${item.instructor_id})"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            list.appendChild(tr);
        });
    } catch (error) {
        console.error('Failed to fetch instructors:', error);
        list.innerHTML = '<tr><td colspan="5">Error loading data. Is the backend running?</td></tr>';
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('instructor-id').value;
    const data = {
        instructor_name: document.getElementById('instructor-name').value,
        phone: document.getElementById('instructor-phone').value,
        email: document.getElementById('instructor-email').value,
        specialization: document.getElementById('instructor-specialization').value,
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${ENTITY_URL}/${id}` : ENTITY_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to save instructor');
        
        closeModal();
        renderInstructors();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function openFormForAdd() {
    document.getElementById('data-form').reset();
    document.getElementById('instructor-id').value = '';
    document.getElementById('modal-title').textContent = 'Add New Instructor';
    openModal();
}

function openFormForEdit(item) {
    document.getElementById('data-form').reset();
    document.getElementById('instructor-id').value = item.instructor_id;
    document.getElementById('instructor-name').value = item.instructor_name;
    document.getElementById('instructor-phone').value = item.phone;
    document.getElementById('instructor-email').value = item.email;
    document.getElementById('instructor-specialization').value = item.specialization;
    document.getElementById('modal-title').textContent = 'Edit Instructor';
    openModal();
}

async function deleteItem(id) {
    if (confirm('Are you sure you want to delete this instructor? This could affect courses and hostels.')) {
        try {
            const response = await fetch(`${ENTITY_URL}/${id}`, { method: 'DELETE' });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Failed to delete instructor');
            
            renderInstructors();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
}