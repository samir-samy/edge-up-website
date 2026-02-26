/**
 * Project: Edge Up Consulting - Portfolio Loader
 * Logic: Fetch JSON data and inject it into the DOM using Template Literals
 */

async function loadProjectData() {
    try {
        // 1. جلب البيانات من ملف الـ JSON
        const response = await fetch('data/data.json');

        // التأكد من أن الملف موجود ويعمل
        if (!response.ok) throw new Error("لم يتم العثور على ملف البيانات (JSON)");

        const data = await response.json();

        // 2. عرض قسم "من نحن" (Who We Are Section)
        const whoWeAreSection = document.getElementById('who-we-are-content');
        if (whoWeAreSection && data.aboutCompany) {
            // تصحيح الجملة الإنجليزية
            const correctedDescription = "In an era of constant change, the ultimate competitive advantage is to control behavior through our cognitive functions.";

            whoWeAreSection.innerHTML = `
                <div class="col-lg-10 text-center mx-auto animate__animated animate__fadeIn">
                    <h2 class="fw-bold text-primary mb-4 display-5">${data.aboutCompany.title}</h2>
                    <p class="lead text-dark mb-4 fs-4" style="line-height: 1.8;">
                        ${data.aboutCompany.description}
                    </p>
                    <div class="p-4 border-start border-primary border-4 bg-white shadow-sm mx-auto rounded-start" style="max-width: 800px;">
                        <p class="fst-italic mb-0 text-secondary fs-5">
                            <i class="bi bi-quote text-primary fs-3"></i>
                            ${data.aboutCompany.highlight} 
                            <i class="bi bi-quote text-primary fs-3" style="display: inline-block; transform: scaleX(-1);"></i>
                        </p>
                    </div>
                </div>
            `;
        }

        // 3. عرض بيانات المؤسس والخبرات (Founder Section)
        const founderSection = document.getElementById('founder-detail');
        if (founderSection && data.founder) {
            founderSection.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-lg-8 order-2 order-lg-1">
                        <h2 class="fw-bold text-primary animate__animated animate__fadeInDown">${data.founder.name}</h2>
                        <p class="lead text-secondary">${data.founder.title}</p>
                        
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <h5 class="border-bottom pb-2 mb-3">
                                    <i class="bi bi-mortarboard-fill me-2 text-dark"></i>Academic Credentials
                                </h5>
                                <ul class="list-unstyled mb-4">
                                    ${data.founder.academic_credentials ? data.founder.academic_credentials.map(item => `
                                        <li class="mb-2 fw-bold text-dark small">
                                            <i class="bi bi-patch-check-fill text-primary me-2"></i> ${item}
                                        </li>
                                    `).join('') : ''}
                                </ul>

                                <h5 class="border-bottom pb-2 mb-3">
                                    <i class="bi bi-briefcase-fill me-2 text-primary"></i>Professional Experience
                                </h5>
                                <ul class="list-unstyled">
                                    ${data.founder.experience_summary.map(item => `
                                        <li class="mb-2 small">
                                            <i class="bi bi-caret-right-fill text-primary"></i> ${item}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>

                            <div class="col-md-6">
                                <h5 class="border-bottom pb-2 mb-3">
                                    <i class="bi bi-award-fill me-2 text-success"></i>Core Competences
                                </h5>
                                <ul class="list-unstyled">
                                    ${data.founder.competences.map(item => `
                                        <li class="mb-2 small">
                                            <i class="bi bi-check-lg text-success"></i> ${item}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 order-1 order-lg-2 text-center mb-4 mb-lg-0 animate__animated animate__fadeInRight">
                        <div class="position-relative d-inline-block">
                            <img src="assets/images/founder.png" alt="${data.founder.name}" 
                                 class="img-fluid rounded-4 shadow-lg border border-5 border-white" 
                                 style="max-height: 400px; object-fit: cover;">
                            <div class="position-absolute bottom-0 end-0 bg-primary rounded-3" 
                                 style="width: 100px; height: 100px; z-index: -1; margin-bottom: -15px; margin-right: -15px;"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        // 4. عرض مميزات الـ CBT (CBT Edges)
        const cbtSection = document.getElementById('cbt-features');
        if (cbtSection && data.cbt_advantages) {
            document.getElementById('cbt-title').innerText = data.cbt_advantages.title;
            document.getElementById('cbt-desc').innerText = data.cbt_advantages.description;

            cbtSection.innerHTML = data.cbt_advantages.points.map(point => `
                <div class="col-md-4 mb-4">
                    <div class="p-4 border-0 rounded-4 bg-white h-100 shadow-sm transition-hover border-top border-4 border-success">
                        <h5 class="text-success fw-bold mb-3"><i class="bi bi-lightning-charge-fill"></i> ${point.category}</h5>
                        <ul class="small list-unstyled">
                            ${point.benefits.map(b => `<li class="mb-2"><i class="bi bi-check2-circle text-success me-1"></i> ${b}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('');
        }

        // 5. عرض البرامج التدريبية
        const programsContainer = document.getElementById('programs-container');
        if (programsContainer && data.training_modules) {
            const defaultImages = [
                'assets/images/sales.jpg', 'assets/images/communication.jpg', 
                'assets/images/leadership.jpg', 'assets/images/problem.jpg',
                'assets/images/social.jpg', 'assets/images/time.jpg', 
                'assets/images/emotional.jpg', 'assets/images/cbt.jpg', 
                'assets/images/behavioral.jpg', 'assets/images/skills.jpg'
            ];

            programsContainer.innerHTML = data.training_modules.map((mod, index) => `
                <div class="col-md-6 col-lg-3 mb-4">
                    <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden animate__animated animate__fadeInUp">
                        <div class="position-relative" style="height: 180px; overflow: hidden;">
                            <img src="${mod.image || defaultImages[index]}" class="w-100 h-100" style="object-fit: cover;" alt="${mod.title}">
                        </div>
                        <div class="card-body p-4 text-center">
                            <h6 class="card-title fw-bold text-dark">${mod.title}</h6>
                            ${mod.time ? `<span class="badge bg-primary-subtle text-primary mb-3">${mod.time}</span>` : ''}
                            <ul class="text-start small list-group list-group-flush mt-2">
                                ${mod.objectives ? mod.objectives.map(obj => `
                                    <li class="list-group-item border-0 px-0 py-1 bg-transparent">
                                        <i class="bi bi-dot text-primary fs-5"></i> ${obj}
                                    </li>
                                `).join('') : ''}
                            </ul>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // 6. عرض القيمة المضافة
        const valueSection = document.getElementById('value-proposition');
        if (valueSection && data.value_proposition) {
            valueSection.innerHTML = data.value_proposition.map(val => `
                <div class="col-md-3 col-6 mb-3 text-center">
                    <div class="p-3 bg-primary text-white rounded-pill shadow-sm border border-info">
                        <span class="small fw-bold"><i class="bi bi-star-fill me-1"></i> ${val}</span>
                    </div>
                </div>
            `).join('');
        }

        // 7. عرض قطاعات العملاء
        const industriesContainer = document.getElementById('industries-container');
        if (industriesContainer && data.target_customers) {
            const icons = ['bi-capsule', 'bi-bank', 'bi-house', 'bi-shield-check', 'bi-cart', 'bi-hospital', 'bi-fuel-pump', 'bi-building', 'bi-mortarboard'];
            industriesContainer.innerHTML = data.target_customers.map((customer, index) => `
                <div class="col-md-4 col-lg-2 col-6 mb-4 text-center animate__animated animate__zoomIn">
                    <div class="p-3 bg-light rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style="width: 70px; height: 70px;">
                        <i class="bi ${icons[index] || 'bi-check-circle'} h3 text-primary mb-0"></i>
                    </div>
                    <p class="small fw-bold text-secondary">${customer}</p>
                </div>
            `).join('');
        }

        // 8. عرض بيانات التواصل
        const contactDiv = document.getElementById('contact-info');
        if (contactDiv && data.contact) {
            contactDiv.innerHTML = `
                <div class="d-flex flex-column gap-2">
                  
<a href="https://mail.google.com/mail/?view=cm&fs=1&to=${data.contact.email}" 
    target="_blank" 
    class="text-decoration-none text-white opacity-75">
    <i class="bi bi-envelope-at-fill me-2"></i>${data.contact.email}
</a>
                    <a href="https://wa.me/${data.contact.whatsapp.replace('+', '')}" target="_blank" class="text-decoration-none text-white opacity-75">
                        <i class="bi bi-whatsapp me-2"></i>${data.contact.whatsapp}
                    </a>
                </div>
            `;
        }

    } catch (error) {
        console.error("Critical Error Loading Edge Up Data:", error);
    }
}

window.addEventListener('DOMContentLoaded', loadProjectData);





