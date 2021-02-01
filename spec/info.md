# Fonctionnalités

## Enseignant

- Authentification
- Création d'une unité pédagogique
  - Possibilité de recherche des chaine descriptive déjà existante
- Création de module de formation
  - Suite logique d'unités pédagogiques
  - Associé à un plusieur niveau de formation
- Messagerie
  - Taille des message inférieures ou égale à 1000 caractères
  - Possibilté d'envoyer à 1 ou plusieur enseignant
  - Nombre de message non lus (par exemple lors de sa connexion)
- Partage des ressources pédagogiques
- Ordonnancement des unités de formation (ou module de formation) (UF, MF)
- Ordonnancement des unités pédagogiques (Obligatoirement dans un sens) (UP)
- Contraintes :
  - Un module de formation ainsi qu'une unité pédagogique ne sont pas commune à plusieurs enseignants

## Administrateur

- Authentification
- Comptes administrateurs
  - Gestion CRUD
- Comptes enseignants
  - Gestion CRUD
- Module statistique :
  - nombre d’administrateurs
  - nombre d’enseignants et un histogramme indiquant combien d’enseignants ont produit n UP.
  - pour chaque enseignant, nous voulons avoir accès au nombre de messages reçus et envoyés.
  - à partir d’un mot nous voulons le nombre de messages échangés entre enseignants contenant au moins 1 fois ce mot
  - nous recherchons les enseignants proches entre eux, 2 enseignants sont proches s’ils ont beaucoup de chaînes descriptives (CD)
- Contraintes :
  - Au moins un administrateur lors de l'installation (à donne dans la notice d'installation)
  - Le compte administrateur présent lors de l'installation ne peut pas être supprimer.
  - Lors de la suppression d'un compte enseignant, tout les messages qu'il a envoyé sont supprimer et les message qui lui on été envoyé
  - Possibilité d'avoir des messages sans destinataire
  - Impossible d'avoir des messages sans expéditeur

# Model

- Compte
  - Enseignant
    - nom
    - prenom
    - identifiant
    - mot de passe (chiffrement)
    - nom de l'etablissement auquel il est rattaché
  - Administrateur
    - nom
    - prenom
    - identifiant
    - mot de passe (chiffrement)
- Module de Formation
  - Suite d'unité pédagogique
- Nivéau de formation
- Unité Pédagogique
  - nom
  - Url de la résource
  - Des chaînes descriptives (Max 30 caractère)

# Incompréhension

- La phrase "Un module de formation ainsi qu’une unité pédagogique ne sont pas communs à plusieurs enseignants"
- Niveau de formation

# Contraintes Techniques

- MariaDB
  - Les Données des comptes
  - Niveau de formation
- MongoDB
  - Les messages des enseignant (identifiant de la base de donnée rélationnelle)
- Neo4j
  - Ordonnancement des unités pédagogiques (identifiant de l'enseigant)
  - La rélation indiquant qu'une UP suit une autre UP aura le nom du MF
  - Chaîne Descriptive
