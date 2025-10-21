document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const body = document.body;

    // Function to handle sidebar state based on screen size
    function handleSidebar() {
        if (window.innerWidth <= 992) {
            body.classList.add('sidebar-collapsed');
        } else {
            body.classList.remove('sidebar-collapsed');
        }
    }

    sidebarToggle.addEventListener('click', () => {
        body.classList.toggle('sidebar-open');
        body.classList.toggle('sidebar-collapsed');
    });
});