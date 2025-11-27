// Variable globale pour stocker le mot de passe
var motDePasseGenere = '';

function genererMotDePasse() {
    var longueur = parseInt(document.getElementById('longueur').value);

    if (!longueur || longueur < 4 || longueur > 50) {
        alert('Veuillez saisir une longueur entre 4 et 50 caractères');
        return;
    }

    var typesSelectionnes = document.querySelectorAll('input[name="type"]:checked');

    if (typesSelectionnes.length === 0) {
        alert('Veuillez sélectionner au moins un type de caractères');
        return;
    }

    var caracteres = '';
    
    for (var i = 0; i < typesSelectionnes.length; i++) {
        var checkbox = typesSelectionnes[i];
        if (checkbox.value === 'minuscules') {
            caracteres += 'abcdefghijklmnopqrstuvwxyz';
        } else if (checkbox.value === 'majuscules') {
            caracteres += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (checkbox.value === 'chiffres') {
            caracteres += '0123456789';
        } else if (checkbox.value === 'speciaux') {
            caracteres += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        }
    }

    var motDePasse = '';
    
    for (var i = 0; i < longueur; i++) {
        var index = Math.floor(Math.random() * caracteres.length);
        motDePasse += caracteres.charAt(index);
    }

    motDePasseGenere = motDePasse;

    var resultatDiv = document.getElementById('resultat');
    resultatDiv.classList.remove('empty');
    resultatDiv.innerHTML = '<p>' + motDePasse + '</p>';

    document.getElementById('copierBtn').style.display = 'block';
}

function copierMotDePasse() {
    navigator.clipboard.writeText(motDePasseGenere).then(function() {
        var btn = document.getElementById('copierBtn');
        var texteOriginal = btn.textContent;
        btn.textContent = '✅ Copié !';
        
        setTimeout(function() {
            btn.textContent = texteOriginal;
        }, 2000);
    }).catch(function(err) {
        alert('Erreur lors de la copie : ' + err);
    });
}
