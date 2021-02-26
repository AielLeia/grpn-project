# Projet GRPN

Les programmes scolaires des élèves des collèges et lycées sont nationaux, les enseignants peuvent donc partager entre eux les
ressources qu’ils construisent ou tout autre ressource numérique utilisées pour leurs enseignements. Le logiciel GRPN permettra aux
enseignants d’échanger entre eux les références des ressources qu’ils utilisent. Le logiciel permettra également aux enseignants de
communiquer entre eux pour échanger sur leurs pratiques. Le logiciel permet aux administrateurs d’étudier le comportement des
enseignants. Les enseignants peuvent échanger entre eux via le logiciel.

# Installation

Différent étapes doivent être respecter pour le remplissage des bases de données et lancement des APIs.

## Étape 1

Mise en place des variables d'environnement. Ainsi avec la commande

```bash
make gen:env
```

Il y'a une génération des varibles d'environnement nécessaire au bon fonctionnement de l'application.

Un fois les fichiers d'environnements générer, il est obligatoire de les changers avec les bonnes valeurs.

Fichier d'environnement pour neo4j

```bash
NEO4J_PROTOCOL=bolt # Protocole de communication avec le serveur de base de données de neo4j (A ne pas changer)
NEO4J_HOST=localhost # Nom d'hôte (A ne pas changer)
NEO4J_USERNAME=neo4j # Nom d'utilisateur (A ne pas changer)
NEO4J_PASSWORD=test12345 # Mot de passe (Correspond lors de la création d'un base de donnée avec le client neo4j)
NEO4J_PORT=7687 # Port (A ne pas changer)
NEO4J_DATABASE=projetsi # Le nom de la base de données (A voir: https://neo4j.com/developer/manage-multiple-databases/)
NEO4J_ENCRYPTION=ENCRYPTION_OFF # (A ne pas changer)
APP_PORT=5000 # Port d'ecoute de l'api neo4j
NODE_ENV=development # Environnement d'execution du serveur.
```

Fichier d'environnement pour mariadb

```bash
HOST=localhost # Nom d'hôte (A ne pas changer)
DB_USERNAME=springstudent # Nom d'utilisateur de la base de données
PASSWORD=Springstudent_98 # Mot de passe de la base de données
DATABASE=FormationBD # Nom de la base de données
PORT=3306 # Port d'écouter du serveur de base de donnée
APP_PORT=3000 # Port d'écoute de l'APIs de mariadb
```

**Toujour en attende des informations de l'API mongoDB**

## Étape 2

Installation des dépendances des différents APIs. Ainsi grâce à la commande

```bash
make install
```

toutes les dépandances nécessaires seront installer.

## Étape 3

Remplissage des bases de données. Ainsi grâce à la commande

```bash
make db
```

des données de tests seront insérers.

## Étape 4

Lancement des serveurs. Sur un prémiers terminal éxécuter

```bash
make run:neo4j
```

Sur un second terminale éxécuter aussi

```bash
make run:mariadb
```

**IMPORTANT, IL EST OBLIGATOIRE DE LANCER LES DEUX DERNIERS COMMANDE SUR DEUX TERMINALES DIFFÉRENT**

**Toujour en attende des données de l'api mongo**
