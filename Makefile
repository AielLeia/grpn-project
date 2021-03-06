.PHONY: go install install\:neo4j install\:mariadb gen\:env gen\:env\:neo4j gen\:env\:mariadb run\:neo4j run\:mariadb


## ===============================================================================
## Commande de génération des fichiers d'environnements pour le lancement
## des APIs.
## ===============================================================================
gen\:env\:neo4j: 
	@echo ===== Generation des variables d'environnement pour l'API Neo4J =====
	@echo NEO4J_PROTOCOL=bolt > api_GRAPH/.env
	@echo NEO4J_HOST=localhost >> api_GRAPH/.env
	@echo NEO4J_USERNAME=neo4j >> api_GRAPH/.env
	@echo NEO4J_PASSWORD=test12345 >> api_GRAPH/.env
	@echo NEO4J_PORT=7687 >> api_GRAPH/.env
	@echo NEO4J_DATABASE=projetsi >> api_GRAPH/.env
	@echo NEO4J_ENCRYPTION=ENCRYPTION_OFF >> api_GRAPH/.env
	@echo APP_PORT=5000 >> api_GRAPH/.env
	@echo NODE_ENV=development >> api_GRAPH/.env

gen\:env\:mariadb:
	@echo ===== Generation des variables d'environnement pour l'API MariaDB =====
	@echo HOST=localhost > api_BDR/.env
	@echo DB_USERNAME=root >> api_BDR/.env
	@echo PASSWORD=root >> api_BDR/.env
	@echo DATABASE=FormationBD >> api_BDR/.env
	@echo PORT=8889 >> api_BDR/.env
	@echo APP_PORT=3000 >> api_BDR/.env

gen\:env: gen\:env\:neo4j gen\:env\:mariadb

## ===============================================================================
## Commande permettant de lancé l'installation des dépendances des APIs.
## ===============================================================================
install\:neo4j:
	@npm install -C api_GRAPH/

install\:mariadb:
	@npm install -C api_BDR/

install: install\:mariadb install\:neo4j 

## ===============================================================================
## Commande pour le remplissages des données dans la base de données
## ===============================================================================
db\:neo4j: install\:neo4j
	@npm run seeder -C api_GRAPH/

db\:mariadb: install\:mariadb
	@npm run seeder -C api_BDR/

db: db\:neo4j db\:mariadb

## ===============================================================================
## Commande pour les lancements des apis
## ===============================================================================
run\:neo4j: install\:neo4j
	@npm start -C api_GRAPH/

run\:mariadb: install\:mariadb
	@npm start -C api_BDR/ 

## ===============================================================================
## Commande regroupant tout les autres commandes.
## ===============================================================================
go: gen\:env install