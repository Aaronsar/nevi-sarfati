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

## Déploiement Vercel

1. Connecter le dépôt GitHub à Vercel
2. Activer **Vercel Blob** dans le dashboard du projet (Storage → Blob)
3. La variable `BLOB_READ_WRITE_TOKEN` sera ajoutée automatiquement

## Formulaire RSVP

Les réponses sont enregistrées dans Vercel Blob (fichiers JSON privés).

Champs :
- **Famille** — nom de famille
- **Présent** — Oui / Non
- **Nombre de personnes** — affiché si présent = Oui

## Domaine

Configurer `nevi-sarfati.fr` dans Vercel → Settings → Domains après l'achat du nom de domaine.
