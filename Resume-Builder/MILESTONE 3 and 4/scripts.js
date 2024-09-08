document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var resumeDisplay = document.getElementById('resumeDisplay');
    var downloadBtn = document.getElementById('downloadPdf');
    if (form && resumeDisplay) {
        form.addEventListener('submit', function (event) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            event.preventDefault();
            var name = ((_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.value) || '';
            var email = ((_b = document.getElementById('email')) === null || _b === void 0 ? void 0 : _b.value) || '';
            var contact = ((_c = document.getElementById('contact')) === null || _c === void 0 ? void 0 : _c.value) || '';
            var education = ((_d = document.getElementById('education')) === null || _d === void 0 ? void 0 : _d.value) || '';
            var company = ((_e = document.getElementById('company')) === null || _e === void 0 ? void 0 : _e.value) || '';
            var role = ((_f = document.getElementById('role')) === null || _f === void 0 ? void 0 : _f.value) || '';
            var skills = ((_g = document.getElementById('skills')) === null || _g === void 0 ? void 0 : _g.value) || '';
            var about = ((_h = document.getElementById('about')) === null || _h === void 0 ? void 0 : _h.value) || '';
            var formData = {
                name: name,
                email: email,
                contact: contact,
                education: education,
                company: company,
                role: role,
                skills: skills,
                about: about,
            };
            generateResume(formData);
            makeEditable();
        });
    }
    function generateResume(data) {
        resumeDisplay.innerHTML = "\n      <h2>".concat(data.name, "</h2>\n      <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(data.email, "</span></p>\n      <p><strong>Contact No:</strong> <span id=\"edit-contact\" class=\"editable\">").concat(data.contact, "</span></p>\n      <h3>Education</h3>\n      <p><strong>Degree:</strong> <span id=\"edit-education\" class=\"editable\">").concat(data.education, "</span></p>\n      <h3>Company</h3>\n      <p><strong>Company:</strong> ").concat(data.company, "</p>\n      <p><strong>Role:</strong> ").concat(data.role, "</p>\n      <h3>Skills</h3>\n      <p><strong>Skills:</strong> ").concat(data.skills, "</p>\n      <h3>About Me</h3>\n      <p><strong>About Myself:</strong> ").concat(data.about, "</p>\n    ");
    }
    // Download PDF functionality using window.print()
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {
            window.print(); // This will prompt the print dialog, allowing users to save as PDF
        });
    }
    function makeEditable() {
        var editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(function (element) {
            element.addEventListener('click', function () {
                var _a;
                var currentElement = element;
                var currentValue = currentElement.textContent || '';
                // Replace content with input for editing
                if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
                    var input_1 = document.createElement('input');
                    input_1.type = 'text';
                    input_1.value = currentValue;
                    input_1.classList.add('editing-input');
                    currentElement.style.display = 'none';
                    (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                    input_1.focus();
                    // When input loses focus, revert back to the text
                    input_1.addEventListener('blur', function () {
                        currentElement.textContent = input_1.value;
                        currentElement.style.display = '';
                        input_1.remove();
                    });
                }
            });
        });
    }
});
