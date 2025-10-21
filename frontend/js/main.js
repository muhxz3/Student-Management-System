document.addEventListener('DOMContentLoaded', function () {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const body = document.body;
    const mainContent = document.querySelector('.main-content');

    // Function to handle sidebar state based on screen size
    function handleSidebar() {
        if (window.innerWidth <= 992) {
            body.classList.add('sidebar-collapsed');
        } else {
            body.classList.remove('sidebar-collapsed');
        }
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            // This logic is for smaller screens where the sidebar overlays content
            if (window.innerWidth <= 992) {
                body.classList.toggle('sidebar-open');
            } else { // This is for larger screens to collapse/expand the sidebar
                body.classList.toggle('sidebar-collapsed');
            }
        });
    }

    // Set initial state on page load and on window resize
    handleSidebar();
    window.addEventListener('resize', handleSidebar);
});