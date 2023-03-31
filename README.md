# Révisions Git

## Suppression des commits en local

- Pour supprimer le dernier commit : 
  `git reset --hard HEAD~1`

- Pour supprimer un commit spécifique : `git reset + N° ref commit + --hard`
- - Récupération du N° ref commit : `git log`

## Suppression des commits dans Git & Github

- Récupération du N° ref commit : `git log`
- Suppression du commit ciblé : `git revert + N° ref commit`
- Vérification des modifs : `git status`
- On commit si c'est bon --> ex: `git commit -m "revert"`
- Forcer le pull : `git pull -f`
- Pousser sur main : `git push --force-with-lease origin main`
