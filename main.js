document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('rsvp-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const formMessage = document.getElementById('form-message');
    const formError = document.getElementById('form-error');

    // Mettez l'URL de votre Web App Google Apps Script ici plus tard
    // FORMAT ATTENDU: "https://script.google.com/macros/s/VOTRE_ID/exec"
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx91wpg-6TvsP-hE-J7kocOB0Gh606N0L-k8-ewGErUKk9Zlgdf0i790D44QAfNXGoq/exec";

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Récupération des données du formulaire
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Afficher le loader
        setLoading(true);

        try {
            // Requête vers Google Apps Script
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: formData // Envoi direct du FormData pour éviter les problèmes de CORS avec Google
            });

            // Même si no-cors est parfois capricieux, on check si la réponse s'est bien passée
            formMessage.classList.remove('hidden');
            formError.classList.add('hidden');
            form.reset();

        } catch (error) {
            console.error('Erreur lors de la soumission :', error);
            formError.classList.remove('hidden');
            formMessage.classList.add('hidden');
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.textContent = 'Envoi en cours...';
            loader.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            btnText.textContent = 'Envoyer ma réponse';
            loader.classList.add('hidden');
        }
    }

    // Simulation pour pouvoir tester visuellement si l'URL n'est pas configurée
    function simulateSubmission() {
        setLoading(true);
        formMessage.classList.add('hidden');
        formError.classList.add('hidden');

        setTimeout(() => {
            setLoading(false);
            formMessage.classList.remove('hidden');
            form.reset();
        }, 1500); // simulation de 1.5 secondes
    }
});
