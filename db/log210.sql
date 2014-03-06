CREATE SCHEMA IF NOT EXISTS log210;
CREATE TYPE type_utilisateur AS ENUM ('administrateur', 'restaurateur', 'livreur', 'client');
CREATE TABLE IF NOT EXISTS utilisateur (
	utilisateur_id		serial		   PRIMARY KEY,
    identificateur		varchar(30),						--nom que l'utilisateur va choisir
    mot_de_passe		varchar(20)		 NOT NULL,
    nom			varchar(30) 	         NOT NULL,
    prenom		varchar(15)		         NOT NULL,
    type		type_utilisateur         NOT NULL				--les 4 types possibles sont: admin, restaurateur, client et livreur
    
);
CREATE UNIQUE INDEX utilisateur_id_key ON utilisateur(utilisateur_id);

CREATE TABLE IF NOT EXISTS compteClient (
	client_id		serial  PRIMARY KEY,	
    utilisateur_id  integer REFERENCES utilisateur (utilisateur_id)
    	ON UPDATE CASCADE ON DELETE CASCADE,
	date_de_naissance date,
    courriel	varchar(40)
);

CREATE TABLE IF NOT EXISTS restaurant (
	restaurant_id		serial		PRIMARY KEY,
	utilisateur_id integer	REFERENCES utilisateur (utilisateur_id)
		ON UPDATE CASCADE ON DELETE SET NULL,
    nom	varchar(25),
    menu varchar(15)
);
CREATE UNIQUE INDEX restaurant_id_key ON Restaurant(restaurant_id);

CREATE TABLE IF NOT EXISTS adresse (
	adresse_id		serial		PRIMARY KEY,
	restaurant_id 	integer	    REFERENCES restaurant (restaurant_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    compteClient_id	integer		REFERENCES compteClient (client_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    no_maison		varchar(10) 	NOT NULL,
    rue				varchar(20) 	NOT NULL,
    ville			varchar(20) 	NOT NULL,
    telephone		varchar(10) 	NOT NULL,
    code_postale	varchar(6) 		NOT NULL,
    principale		boolean			NOT NULL				--true = adresse de domicile, false = adresse de livraison 
);

CREATE TABLE IF NOT EXISTS plat (
	plat_id			serial		PRIMARY KEY,
	restaurant_id 	integer REFERENCES restaurant (restaurant_id)
		ON DELETE RESTRICT,
	nom 			varchar(25)		NOT NULL,
	prix			numeric(4,2)
					CHECK (prix BETWEEN 1 and 500)	NOT NULL,
	description 	varchar(255)	NULL
);
CREATE UNIQUE INDEX plat_id_key ON plat(plat_id);

CREATE TABLE IF NOT EXISTS commande (
	commande_id			serial			PRIMARY KEY,
	no_de_confirmation 	varchar(10)     NULL UNIQUE,
    client_id			integer			NOT NULL	
    REFERENCES compteClient (client_id)	ON DELETE CASCADE,			
    livreur_id			integer		 	NOT NULL
    REFERENCES utilisateur (utilisateur_id)	    ON DELETE RESTRICT,
    date_commande		date	 	    NOT NULL,
    heure_commande		time 		 	NOT NULL,
    statut_pret			boolean			NULL,		--1 vaut pret et 0 vaut en preparation
    prix_total			numeric(4,2)		
    					CHECK (prix_total BETWEEN 1 and 1000) NULL
);
CREATE UNIQUE INDEX commande_id_key ON commande(commande_id);

CREATE TABLE IF NOT EXISTS commande_plat (
	commande_id		integer	    REFERENCES commande(commande_id)
	ON UPDATE CASCADE ON DELETE SET NULL,
	plat_id			integer		REFERENCES plat(plat_id)
	ON UPDATE CASCADE ON DELETE SET NULL,
	quantitee		integer		
					CHECK (quantitee BETWEEN 1 and 100),
    CONSTRAINT commande_plat_pk PRIMARY KEY (commande_id,plat_id)
);

CREATE TABLE IF NOT EXISTS carnetDeLivraison (
	livraison_id		serial		PRIMARY KEY,
	commande_id			integer	   	REFERENCES commande (commande_id)
    	ON DELETE CASCADE ON UPDATE CASCADE	NOT NULL,
	date_livree			date 	    NOT NULL,
    heure_livree		time 		NOT NULL
);
CREATE UNIQUE INDEX livraison_id_key ON carnetDeLivraison(livraison_id);


