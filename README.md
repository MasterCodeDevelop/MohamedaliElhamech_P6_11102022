# Fisheye [P6] : Créez un site accessible pour une plateforme de photographes


Voici mon 6e projet du parcours "Développeur Front-End" d'OpenClassrooms. L'objectif de ce projet est de faire une platforme de photographes freelance.
Cette platforme Fisheye permet d'afficher les protfolio des photographes qui peut être consulter et aimer(liker) par les utilisateur.

![Maquette de GameOn](https://raw.githubusercontent.com/MasterCodeDevelop/MohamedaliElhamech_P6_11102022/main/project/capture.png)

## Cahier des charges
- Le design pattern Factory
- Le site doit être fait seulement en JavaScript.
- Rendre le site accessible (balises sémantiques, attributs aria,   navigation au clavier, tabindex), passer les tests AChecker sans “known issue”.
- Structure du projet (HTML, CSS, JS ...).
- Le code doit être sémantiquement correct et ne doit contenir aucune erreur au validateur W3C.
- Le code doit être forké depuis le repo GitHub.
- Le code doit être commenté (décrire chaque fonction, ainsi que les parties du code qui nécessitent plus de détails).


## Éléments fournis pour le projet
- La [maquette](https://www.figma.com/file/Q3yNeD7WTK9QHDldg9vaRl/UI-Design-FishEye-FR?node-id=0%3A1) qui est déjà intégrée.
- Le [repo](https://github.com/OpenClassrooms-Student-Center/Front-End-Fisheye) avec le code qui à déjà été complété.
- Les [données au format JSON](https://github.com/OpenClassrooms-Student-Center/Front-End-Fisheye/blob/main/data/photographers.json).
- Les images et les videos sont dans ce [lien](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEye_Photos.zip).
- Les [notes de rénion](https://course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/Notes+de+reunion.pdf) du repo GitHub qui décrivent ceux qu'on a besoin de faire. 

## BONUS
Éléments que j'ai ajouter en plus

### Images 
Les images des photographes sont très grandes, j'ai plus version qui peuvent être afficher avec l'attribut `srcset` qui permet de les afficher en fonction de la taille et donnc ne pas perdre la qualité des images.

### Formulaire de contact
Lorsque on remplit le formulaire de contact j'ai mis en place un système de vérification des champs avec des [Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), s'il y'a un champs inccorect un message d'erreur sera afficher.

### ListBox (Select/dropdown)
Support les touches Arrow Up, Arrow Down, Home et End, Ce là permet donc de naviguer dans la liste déroulante

## Note du projet
- Le développement à été réalisé sur l'éditeur [Visual Studio Code](https://code.visualstudio.com/).
- La validation des champs du formulaire à été réalisé avec [Regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
-  Vérifier de l'accécibilté avec [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/).
-  Vérifier le code avec un linter [ESLint](https://www.synbioz.com/blog/tech/un-code-js-impeccable-grace-a-eslint).