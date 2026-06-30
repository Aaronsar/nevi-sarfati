# Pidyon Haben — Névi Baroukh Sarfati

Site d'invitation pour le Pidyon Haben de Névi Baroukh Sarfati.

**Date :** Mercredi 8 juillet · À partir de 20h  
**Lieu :** 10 rue de Groslay, Montmorency, 95160

## Développement local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

Sans Google Sheets configuré, les réponses sont enregistrées localement dans `data/rsvps/`.

## Formulaire RSVP → Google Sheets

Les réponses sont ajoutées dans [ce Google Sheet](https://docs.google.com/spreadsheets/d/13JQsuYOSTT62DN6xl5U_yx8cKBKkVeWIE360Ujj4Hwc).

### Configuration (5 min)

1. Ouvrir le Google Sheet → **Extensions** → **Apps Script**
2. Coller le contenu de `scripts/google-sheets-apps-script.gs`
3. **Déployer** → **Nouveau déploiement** → **Application web**
   - Exécuter en tant que : **Moi**
   - Accès : **Tout le monde**
4. Copier l'URL du déploiement
5. Dans Vercel → **Settings** → **Environment Variables** :
   - `GOOGLE_SHEETS_WEBHOOK_URL` = l'URL copiée
6. Redéployer le site

Colonnes enregistrées : **Date · Famille · Présent · Nombre de personnes**

## Domaine

Configurer `nevi-sarfati.fr` dans Vercel → Settings → Domains.
