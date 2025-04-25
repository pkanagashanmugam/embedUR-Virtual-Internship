# Uncomment the commented lines and add path to the COMPOSE_FILE to run the MAKEFILE if MAKEFILE and docker-compose.yaml are in different directories. The MAKEFILE I have written works for my project since MAKEFILE and docker-compose.yaml file are present in the root directory of the project.

# COMPOSE_FILE = docker-compose.yaml

all:
	docker compose build
	docker compose up

build:
#	docker compose -f $(COMPOSE_FILE) build
	docker compose build

run:
#	docker compose -f $(COMPOSE_FILE) up
	docker compose up

kill:
#	docker compose -f $(COMPOSE_FILE) down
	docker compose down

restart:
	make kill
	make build
	make run

status:
	docker compose ps
