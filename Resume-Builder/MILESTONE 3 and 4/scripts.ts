interface ResumeData {
  name: string;
  email: string;
  contact: string;
  education: string;
  company: string;
  role: string;
  skills: string;
  about: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resumeForm') as HTMLFormElement;
  const resumeDisplay = document.getElementById('resumeDisplay') as HTMLDivElement;
  const downloadBtn = document.getElementById('downloadPdf') as HTMLButtonElement;

  if (form && resumeDisplay) {
    form.addEventListener('submit', (event: Event) => {
      event.preventDefault();

      const name = (document.getElementById('name') as HTMLInputElement)?.value || '';
      const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
      const contact = (document.getElementById('contact') as HTMLInputElement)?.value || '';
      const education = (document.getElementById('education') as HTMLInputElement)?.value || '';
      const company = (document.getElementById('company') as HTMLInputElement)?.value || '';
      const role = (document.getElementById('role') as HTMLInputElement)?.value || '';
      const skills = (document.getElementById('skills') as HTMLInputElement)?.value || '';
      const about = (document.getElementById('about') as HTMLInputElement)?.value || '';

      const formData: ResumeData = {
        name,
        email,
        contact,
        education,
        company,
        role,
        skills,
        about,
      };

      generateResume(formData);
      makeEditable();
    });
  }

  function generateResume(data: ResumeData) {
    resumeDisplay.innerHTML = `
      <h2>${data.name}</h2>
      <p><strong>Email:</strong> <span id="edit-email" class="editable">${data.email}</span></p>
      <p><strong>Contact No:</strong> <span id="edit-contact" class="editable">${data.contact}</span></p>
      <h3>Education</h3>
      <p><strong>Degree:</strong> <span id="edit-education" class="editable">${data.education}</span></p>
      <h3>Company</h3>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Role:</strong> ${data.role}</p>
      <h3>Skills</h3>
      <p><strong>Skills:</strong> ${data.skills}</p>
      <h3>About Me</h3>
      <p><strong>About Myself:</strong> ${data.about}</p>
    `;
  }

  // Download PDF functionality using window.print()
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      window.print();  // This will prompt the print dialog, allowing users to save as PDF
    });
  }

  function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
      element.addEventListener('click', function () {
        const currentElement = element as HTMLElement;
        const currentValue = currentElement.textContent || '';

        // Replace content with input for editing
        if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = currentValue;
          input.classList.add('editing-input');

          currentElement.style.display = 'none';
          currentElement.parentNode?.insertBefore(input, currentElement);
          input.focus();

          // When input loses focus, revert back to the text
          input.addEventListener('blur', () => {
            currentElement.textContent = input.value;
            currentElement.style.display = '';
            input.remove();
          });
        }
      });
    });
  }
});
