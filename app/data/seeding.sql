BEGIN;
INSERT INTO "children" (name, first_name, sexe, birthday, description, parent_id, nanny_id)
VALUES ('Dupont', 'Lucas', 'male', '2018-06-12', 'Lucas aime les legos et les animaux', 1, 1);
INSERT INTO "diary" (date, description, parent_id, nanny_id, created_by, created_for)
VALUES ('2023-04-19', 'Les enfants ont eu une journée calme et agréable', 1, 1, 'Nanny', 'Parent');
INSERT INTO "suggest" ("title", "parent_id", "nanny_id", "created_by", "created_for")
VALUES ('Activités pour enfants de 3 ans', 1, 1, 'parent', 'nanny');
INSERT INTO "activity" ("title", "description", "date", "begin", "end", "color", "category", "nanny_id", "created_by")
VALUES ('Cours de musique', 'Cours de piano pour enfant', '2023-04-21', '14:00', '15:00', 'FFA500', 'Musique', 1, 'Nanny');

COMMIT;
