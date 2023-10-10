# Projet Final EPitech

## Description

Le projet XYZ est une application web innovante qui vise à résoudre [insérer la problématique résolue par le projet].

## Branches

### Branches principales

#### "develop" 📡

Cette branche est utilisée comme branche de développement principale. Toutes les fonctionnalités en cours de développement sont fusionnées dans cette branche. Il est recommandé de créer une branche séparée pour chaque nouvelle fonctionnalité ou tâche et de les fusionner dans la branche develop une fois qu'elles sont terminées et testées.

#### "deploy"

Cette branche est utilisée pour tester le déploiement de l'application dans un environnement de pré-production ou de staging. Une fois que toutes les fonctionnalités planifiées ont été fusionnées dans la branche develop et que les tests unitaires et d'intégration ont été réussis, elles sont fusionnées dans la branche deploy pour être déployées dans cet environnement de test.

#### "main"

Cette branche représente la base stable du code. Elle est utilisée pour les déploiements en production. Les fonctionnalités sont fusionnées dans cette branche depuis la branche develop lorsque le code est prêt à être publié.

# Backend

### Pre-requisites :

- Node.js
- npm
- Ajouter un fichier .env (en se basant sur le .env.example)
- Certificats SSL


### Steps to run :
1 : En se basant sur le fichier .env.example, ajouter un fichier .env à la racine du dossier backend en définissant les variables.

2 : Générer les certificats SSL pour le serveur https :
```bash
openssl req -newkey rsa:4096 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem -subj "/C=FR/ST=PACA/L=Marseille/O=Digitek/CN=example.com"
```

3 : Copier les certificats SSL .key et .cert dans le dossier backend/https-server/certifications

4 : Run the following commands in the terminal at the root of the backend folder :
```bash
npm install prisma --save-dev
cd src/express-web-api/prisma
npx prisma migrate dev
npx prisma generate
npm install
npm start
```
