# Guide de configuration Google Sheets

Pour que les réponses de vos invités s'enregistrent automatiquement dans un Google Sheets, voici les étapes simples à suivre :

## Étape 1 : Créer le fichier Google Sheets
1. Allez sur Google Drive et créez un nouveau fichier Google Sheets.
2. Nommez-le par exemple : **RSVP Communion Yvannah**.
3. Assurez-vous que l'onglet en bas s'appelle bien **Feuille 1** (ou modifiez la variable `SHEET_NAME` dans le code).

## Étape 2 : Ajouter le code Apps Script
1. Dans le menu en haut du fichier Sheets, cliquez sur **Extensions** > **Apps Script**.
2. Un nouvel onglet s'ouvre. Effacez le code existant dans l'éditeur.
3. Copiez et collez le code suivant à la place :

```javascript
const SHEET_NAME = 'Feuille 1'; // Assurez-vous que le nom de l'onglet est correct

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    
    // Si la feuille est vide, on ajoute la première ligne d'en-tête
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Date de réponse', 'Nom et Prénom', 'Email', 'Téléphone', 'Nombre d\\'accompagnants', 'Choix des repas']);
      
      // Mettre en gras les en-têtes
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
    }
    
    // Ajouter les nouvelles données
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.guests,
      data.meals
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Cliquez sur l'icône de disquette 💾 (Enregistrer) pour sauvegarder.

## Étape 3 : Déployer le script
1. En haut à droite de l'éditeur Apps Script, cliquez sur le bouton bleu **Déployer** > **Nouveau déploiement**.
2. Cliquez sur l'icône de la roue crantée ⚙️ à côté de "Sélectionner le type", puis choisissez **Application Web**.
3. Remplissez comme suit :
   - Description : `v1` (ou ce que vous voulez)
   - Exécuter en tant que : **Moi (votre.email@gmail.com)**
   - Qui a accès : **Tout le monde** (Important pour que les invités puissent envoyer leurs infos sans se connecter)
4. Cliquez sur **Déployer**.
5. *Remarque : Google vous demandera d'autoriser l'accès. Cliquez sur "Autoriser l'accès", choisissez votre compte, allez dans "Paramètres avancés" et cliquez sur "Aller à Projet sans titre (non sécurisé)" puis "Autoriser".*

## Étape 4 : Lier le site web
1. Après le déploiement, vous obtiendrez une **URL de l'application Web** (qui commence par `https://script.google.com/macros/...`). **Copiez cette URL**.
2. Retournez dans les fichiers de votre site web, et ouvrez le fichier `main.js`.
3. À la ligne 8, remplacez `"URL_DE_VOTRE_GOOGLE_SCRIPT_A_REMPLACER"` par l'URL que vous venez de copier.
   - Exemple : `const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfyc.../exec";`
4. Sauvegardez le fichier `main.js`.

C'est tout ! Votre formulaire de réservation est maintenant prêt et fonctionnel. Vous pouvez le tester.
