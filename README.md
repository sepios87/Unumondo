# Unumondo

## Presentation
Refonte graphique du site internet de [Unumondo Expéditions](https://unumondo.org).

## Rendu
![Logo de Unumondo](https://i.imgur.com/bUvGIrW.png)
![Capture d'écran de la page d'accueil du site Unumondo](https://i.imgur.com/akwbfJw.png)

## Projet
### Technologies
![](https://skillicons.dev/icons?i=angular,nodejs,typescript)

### Outils
#### Outil de suivi des tickets
- Trello

#### Outil de gestion des versions
- Git

#### Outil de stockage du code source
- GitLab, hébergé sur les serveurs de l'[Université de La Rochelle](https://univ-lr.fr)

### Méthodologie de travail
#### *Workflow* TRELLO
1. Créer d'un ticket sur Trello
2. Déplacer la tâche suivant son état d'avancement
    - Si la tâche est en cours : *EN COURS*
    - Si la tâche est en test : *EN TEST*
    - Si la tâche est terminée et une merge request est en attente : *MERGE REQUEST*
    - Si la tâche est terminée et la merge request a été acceptée : *FINI*.

#### *Workflow* GIT
1. Créer une branche **depuis dev** portant le nom de la tâche à réaliser
2. Faire un commit **une fois la tâche réalisée**
    - Si besoin est, un `squash` pourra être effectué
    - Le message du commit doit être passé en **Français**
3. Pousser le commit sur **votre branche**    
4. Faire une demande de Merge Request
    - Le nom de la Merge Request doit décrire l'intitulé de la tâche (modifier les messages du type 'Merge dev/ to xxx/')
    - Pour être validée, une Merge Request devra etre approuvée par au moins un membre de l'équipe (autre que vous)
5. Si la Merge Request est validée, supprimer la branche.   

### Commandes utiles
#### Démarrer le serveur
`ng serve` ou `npm run start` démarre un serveur en localhost, sur le port 4200 par défault. [Lien vers le Serveur](http://localhost:4200)

#### *Build*
`ng build` ou `npm run build` permet de préparer le projet pour la mise en production.

#### Installation d'un package NodeJS via NPM (Node Package Manager)
`npm install [package]` ou `npm i [package]` permet l'installation d'une dépendance NodeJS dans le projet.
*Note :* Cette dépendance est installé dans le fichier `package.json`. Pour installer une dépendance utile uniquement pour le développement, merci d'utiliser le flag `--save-dev` ou `-D`.

#### Suppression d'un package NodeJS via NPM
`npm remove [package]` permet de retirer une dépendance précédemment installée dans le fichier `package.json`.

#### Git et versionnage
`git add .` permet d'indexer tous les changements apportés au projet.
`git status` permet de vérifier quels ont été les fichiers indexés par la commande `git add`.
`git commit -m '[message]'` permet de créer commit avec le message passé en argument.
`git push` permet de pousser les modifications sur le serveur distant.

## Procédure de mise en place pour le développement
Cette procédure vous permettra de paramétrer un environnement de travail optimal pour travailler sur ce projet.

1. Récupérer le code source de l'application
   1. Via `SSH` : `git@gitlab.univ-lr.fr:agence-trixys/unumondo-expeditions/unumondo.git`
   2. Via `HTTPS` : `https://gitlab.univ-lr.fr/agence-trixys/unumondo-expeditions/unumondo.git`
   
⚠️ *Un accès via SSH requiert le paramétrage d'une clé SSH*

2. Installer les dépendances utilisées dans le projet
   1. Via `NPM` : `npm install` ou `npm i`
   2. Via `Yarn` : `yarn install`

## Procédure de mise en place pour la production
Cette procédure vous permettra de paramétrer votre application pour une mise en production

1. Récupérer le code source de l'application
  1. Via `SSH` : `git@gitlab.univ-lr.fr:agence-trixys/unumondo-expeditions/unumondo.git`
  2. Via `HTTPS` : `https://gitlab.univ-lr.fr/agence-trixys/unumondo-expeditions/unumondo.git`.

⚠️ *Un accès via SSH requiert le paramétrage d'une clé SSH*

2. Installer les dépendances utilisées dans le projet
   1. Via `NPM` : `npm install` ou `npm i`
   2. Via `Yarn` : `yarn install`

3. Lancer le *build* de l'application
   `ng build`

ℹ️ La commande de *build* crée un dossier `dist/` que vous pouvez retrouver dans votre arborescence.

4. Téléverser le fichier `dist/` sur votre serveur d'hébergement.

## Glossaire
### Build
Minification et optimisation du projet en vue d'une mise en production

### Production
Désigne la version destinée à être consultée par le grand public.

### Workflow
Procédure de travail décrite par des étapes.


## Droits et propriété intellectuelle
Ce projet a été réalisé par l'agence Trixys dans le cadre d'un projet tuteuré.

© Océane GUILLOIZEAU, Rémi HAY--RIMBAULT, Benjamin PELAUDEIX, Florian TORIBIO
