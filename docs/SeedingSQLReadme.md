
ETAPE PAR ETAPE (respecter la chronologie):


1.Faire le import des tables pour reset:
DANS LE TERMINAL:
psql -U (USER POSTGRES) -d (DATABASE) -f app/data/import_tables.sql

2 Creer les roles necessaires avant le seeding.
DANS INSOMNIA:
- creer le parent
- creer la nanny
- login avec la nanny
  
3.Se connecter a postgreSQL pour recuperer la clef de liaison du parent (uniqueId en BDD) et la donnée a la nanny
DANS LE TERMINAL:
- sudo -i -u postgres
DANS POSTGRESQL:
- psql -U "USER POSTGRES" -d "DATABASE" (rentrer mdp)
- faire la requete SQL : SELECT * FROM "parent";
- copier la clef de liaison (uniqueId en BDD)
  
4.Copier/Coller la clef de liaison (uniqueId) du parent dans le compte de la nanny
DANS INSOMNIA:
-coller la clef de liaison (uniqueId) dans la route tout en haut: LinkAccount

5.Lancer le seeding
DANS LE TERMINAL:
- psql -U (USER POSTGRES) -d (DATABASE) -f app/data/seeding.sql
