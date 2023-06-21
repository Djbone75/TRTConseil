# TRTConseil
Une évaluation backend réalisé pour Studi en nodejs, rôles, authentifications et gestion emails...

Vous avez possibilité de tester le site online : https://trtconseil-q4ny.onrender.com/user/login

Le site étant basé sur des rôles il va falloir jongler entre ceux-ci pour tester toutes les fonctionnalitées. Les logins sont:
email : admin@admin.com -  pass : admin
email : consultant@conqultant.com -  pass : consultant
email : recruteur@recruteur.com -  pass : recruteur
email : candidat@candidat.com -  pass : candidat

Pour tester le site localement, il faut tout d'abord 

1: Créer une base de données postgres, puis utiliser le fichier migration.sql. Le fichier classSchema.png est un schéma de classe de la base de donnée. 

2 : créer un fichier .env avec ces variables :

COOKIE_SECRET=NimporteQuelleLonguePhrase

CONNECTION_STRING=postgres://YourUserName:YourPassword@YourHostname:5432/YourDatabaseName

MAIL_USERNAME=
MAIL_PASSWORD=
OAUTH_CLIENTID=
OAUTH_REFRESH_TOKEN=
OAUTH_CLIENT_SECRET=
OAUTH_TOKEN_ACCESS=

Ces dernières variables sont disponibles en créant un compte oauth qui est la méthode la plus sécurisante. Pour tester sans utiliser la fonctionnalité mail vous pouvez transformer en commentaire 
 dans le fichier controller/admin.js les lignes 88 à 101 (en rajoutant /* au début et */ à la fin).
 
 Ensuite dans un terminal taper 
 npm install
 
 pour tester le site
 npm start
