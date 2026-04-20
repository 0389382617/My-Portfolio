// hire me button click event

educations = document.querySelectorAll('#education .education-content');
educations.forEach(education => {
    education.addEventListener('click', () => {
        description = education.querySelector('.description');
        if (description.style.display === 'block') {
            description.style.display = 'none';
        } else {
            description.style.display = 'block';
        }   
    });
});

// Get all navigation links
const navLinks = document.querySelectorAll('nav a');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Update active class based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Project box click functionality (similar to education)
const projectBoxes = document.querySelectorAll('.project .project-content');

projectBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const projectId = box.getAttribute('data-id');
        if (projectId) {
            // Mở liên kết trang dự án mới ở cùng một tab
            window.location.href = `project.html?id=${projectId}`;
        }
    });
});