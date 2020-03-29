1. Żeby odpalić backend:
Należy mieć zainstalowane oraz dodane do zmiennych systemowych narzędzie maven.
W folderze z projektem w terminalu wpisać komendę "mvn spring-boot:run".

2. Żeby odpalić frontend:
Należy mieć zainstalowany Node.js oraz narzędzie npm bądź yarn.
W folderze frontend w terminalu wpisać komendę "npm start" lub "yarn start".

Aplikacja backendowa odpali się na adresie lokalnym na porcie 8080.
Aplikacja frontendowa odpali się na adresie lokalnym na porcie 3000.

Możliwe ścieżki do wykorzystania:
- / oraz /topic - przeznaczone do tworzenia tematów do głosowania.
- /topic/{topicId} - przeznaczone do oddawania głosów oraz do śledzenia wyniku głosowania dla danego tematu