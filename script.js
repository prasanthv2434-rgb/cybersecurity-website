document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent the default instant jump
            event.preventDefault();

            // Get the target section's ID from the link's href
            const targetId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Scroll smoothly to the target section
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission logic (if you want to keep it)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async(event) =>
{
            event.preventDefault();
            const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    company: document.getElementById("company").value,
    inquiryType: document.getElementById("inquiry-type").value,
    message: document.getElementById("message").value
};

try {
    const res = await fetch("https://cyberguard-cybersecurity-solutions.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message || "Message sent successfully!");
    contactForm.reset();
} catch (error) {
    alert("Something went wrong. Please try again later.");
}

        });
    }
});