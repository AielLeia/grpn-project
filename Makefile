.PHONY: gen\:env\:neo4j gen\:env\:mariadb


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
	@echo NEO4J_PROTOCOL=bolt >> api_GRAPH/.env
	@echo NODE_ENV=development >> api_GRAPH/.env

gen\:env\:mariadb:
	@echo ===== Generation des variables d'environnement pour l'API MariaDB =====
	@echo HOST=localhost > api_BDR/.env
	@echo USER=root >> api_BDR/.env
	@echo PASSWORD=root >> api_BDR/.env
	@echo DATABASE=FormationBD >> api_BDR/.env
	@echo PORT=8889 >> api_BDR/.env
	