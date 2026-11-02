Methode    |	Pfad	    |   Beschreibung                                    |	Body (Beispiel)    |	Statuscodes
GET	       |  /teams        |	Alle Teams inkl. Members & Projects abrufen     |	keiner             |	200 OK
GET	       |  /teams/:id	|    Einzelnes Team per ID abrufen	                |    keiner	           |     200 OK, 404 Not Found
POST	   |  /teams	    |    Neues Team erstellen	                        |    {"Name": "Team Web", "Klasse": "4AHITL"}	|201 Created, 400 Bad Request
PUT	       |  /teams/:id	|   Team aktualisieren	                            |   {"Name": "Team Web Apps"}	|   200 OK, 404 Not Found
DELETE	   |  /teams/:id	|   Team löschen	                                |   keiner	           |    204 No Content, 404 Not Found
GET	       |  /projects	    |   Alle Projekte abrufen	                        |   keiner             |   200 OK
GET	       |  /projects/:id/statistik |   Durchschnitts-Score pro Kriterium für ein Projekt  |	keiner	|  200 OK, 404 Not Found
POST	   |  /projects	    |   Neues Projekt erstellen	                        |   {"teamId": 1, "Titel": "App"}	|   201 Created, 400 Bad Request, 404 Not Found
POST	   |  /evaluations	|   Neue Bewertung abgeben	                        |   {"projectId": 1, "criterionId": 1, "jurorId": 1, "Score": 8}  |  201 Created, 400 Bad Request, 404 Not Found, 409 Conflict