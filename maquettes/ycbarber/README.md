# YCBarber - Site Web

Site web brutaliste pour YCBarber, coiffeur barbier à Cannes.

## Configuration WhatsApp

Pour modifier le numéro WhatsApp et le message automatique :

1. Ouvrez le fichier `index.html`
2. Cherchez la ligne avec `href="https://wa.me/33612345678`
3. Remplacez `33612345678` par le numéro de téléphone de Maxime au format international :
   - Format : Code pays + numéro sans le 0
   - Exemple pour 06 12 34 56 78 : `33612345678`
   - Exemple pour 07 89 01 23 45 : `33789012345`

4. Pour personnaliser le message automatique, modifiez le texte après `?text=` :
   ```
   ?text=Bonjour%20Maxime,%20je%20souhaite%20prendre%20rendez-vous%20chez%20YCBarber
   ```
   - Les espaces doivent être remplacés par `%20`
   - Les virgules, accents et caractères spéciaux doivent être encodés en URL

## Configuration Instagram

Le site affiche les posts Instagram de @ycbarber06.

Pour afficher les vrais posts Instagram, vous devez :

### Option 1 : SnapWidget (Recommandé)
1. Allez sur https://snapwidget.com/
2. Créez un widget pour @ycbarber06
3. Configurez : 6 photos, grille 3x2
4. Copiez le code généré
5. Remplacez le contenu de `<div id="instagram-feed">` dans `index.html`

### Option 2 : Instagram Basic Display API
1. Créez une app sur https://developers.facebook.com/
2. Obtenez un Access Token
3. Utilisez l'API pour récupérer les posts

## Fichiers importants

- `index.html` - Structure du site
- `styles.css` - Styles brutalistes
- `script.js` - Fonctionnalités JavaScript
- `homebackground.mp4` - Vidéo de fond de la page d'accueil
- `Maxime.png` - Photo de portrait de Maxime

## Contact

- Numéro à configurer dans WhatsApp
- Email : contact@ycbarber.fr
- Instagram : @ycbarber06
- Localisation : Cannes et alentours
