# Einheit 5: Backend-Test mit Postman/Newman

## 1. Ziel

Ziel dieser Einheit war es, die REST-API der Bewertungsapp zu überprüfen. Getestet wurden die Endpunkte für Teams, Projekte, Bewertungen und die statistische Auswertung.

Die API-Tests wurden zunächst manuell mit PowerShell und anschließend automatisiert mit Newman durchgeführt.

## 2. Testumgebung

| Komponente    | Verwendete Umgebung                           |
|---------------|-----------------------------------------------|   
| Backend       | Node.js, Express, Sequelize                   |
| Datenbank     | MySQL über XAMPP                              |
| API-Adresse   | `http://127.0.0.1:4000`                       |
| Testwerkzeug  | Newman 6.2.3                                  |
| Collection    | `docs/postman/bewertungsapp-collection.json`  |
| Environment   | `docs/postman/bewertungsapp-environment.json` |
| Testdatum     | 02.11.2026                                    |

Die Tests wurden lokal auf dem Entwicklungsrechner ausgeführt.

## 3. Getestete API-Endpunkte

### Team

- `GET /team` – Teams abrufen
- `POST /team` – Team erstellen
- `GET /team/:id` – Team nach ID abrufen
- `PUT /team/:id` – Team aktualisieren
- `DELETE /team/:id` – Team löschen

Zusätzlich wurden ungültige Team-IDs, fehlende Pflichtfelder und der Zugriff auf gelöschte Teams getestet.

### Project

- `GET /project` – Projekte abrufen
- `POST /project` – Projekt erstellen
- `GET /project/:id` – Projekt nach ID abrufen
- `PUT /project/:id` – Projekt aktualisieren
- `DELETE /project/:id` – Projekt löschen

Zusätzlich wurden fehlende Pflichtfelder und der Zugriff auf gelöschte Projekte getestet.

### Evaluation

- `GET /evaluation` – Bewertungen abrufen
- `POST /evaluation` – Bewertung erstellen (manuell getestet)
- `POST /evaluation` mit ungültigem Score – Fehlerbehandlung überprüfen

### Auswertung

- `GET /project/9/statistik` – Statistik eines vorhandenen Projekts abrufen
- `GET /project/99999/statistik` – Fehlerbehandlung bei nicht vorhandenem Projekt prüfen

## 4. Automatisierte Testergebnisse

Die Postman-Collection wurde am 02.11.2026 mit Newman ausgeführt.

| Kennzahl                      | Ergebnis |
|-------------------------------|----------|
| Testdurchläufe                | 1        |
| HTTP-Requests                 | 20       |
| Ausgeführte Testskripte       | 20       |
| Assertions                    | 41       |
| Fehlgeschlagene Requests      | 0        |
| Fehlgeschlagene Assertions    | 0        |
| Gesamtdauer                   | 1.827 ms |
| Durchschnittliche Antwortzeit | 11 ms    |

**Ergebnis: Alle 41 automatisierten Assertions wurden erfolgreich bestanden.**

## 5. Negativtests

| Testfall                              | Erwarteter Status | Tatsächlicher Status | Ergebnis  |
|---------------------------------------|-------------------|----------------------|-----------|
| Ungültige Team-ID `abc`               | 400               | 400                  | Bestanden |
| Team ohne Namen erstellen             | 400               | 400                  | Bestanden |
| Gelöschtes Team abrufen               | 404               | 404                  | Bestanden |
| Projekt ohne Titel erstellen          | 400               | 400                  | Bestanden |
| Gelöschtes Projekt abrufen            | 404               | 404                  | Bestanden |
| Bewertung mit Score 15 bei Maximum 10 | 400               | 400                  | Bestanden |
| Statistik eines unbekannten Projekts  | 404               | 404                  | Bestanden |

Die API gibt bei ungültigen Eingaben passende HTTP-Statuscodes und JSON-Fehlermeldungen zurück.

## 6. Statistikprüfung

Für Projekt 9 wurden folgende Durchschnittswerte zurückgegeben:

| Kriterium            | Durchschnitt | Gewicht |
|----------------------|--------------|---------|
| Inhalt               | 8,00         | 1       |
| Präsentationstechnik | 7,00         | 1       |
| Technische Umsetzung | 8,00         | 1,5     |

Die Statistik liefert Durchschnittswerte pro Kriterium. Ein gewichteter Gesamtdurchschnitt wird von diesem Endpunkt nicht direkt zurückgegeben.

## 7. Testdaten und Voraussetzungen

Die automatisierten Team- und Projekt-Tests erstellen eigene Testdatensätze, aktualisieren diese und löschen sie anschließend wieder.

Die Projekt-Tests setzen ein vorhandenes Team mit ID 13 voraus. Die Evaluation- und Statistiktests verwenden vorhandene Demo-Daten, insbesondere Projekt 9 und die Kriterien 10, 11 und 12.

Der positive POST-Test für Bewertungen wurde manuell durchgeführt und lieferte `201 Created` mit der neu angelegten Bewertung ID 13. Er ist nicht Teil des automatisierten Newman-Durchlaufs, um bei wiederholten Ausführungen keine zusätzlichen Bewertungen anzulegen.

## 8. Durchführung mit Newman

Die Tests können im Projektverzeichnis mit folgendem Befehl wiederholt werden:

```powershell
npx newman run .\docs\postman\bewertungsapp-collection.json `
    -e .\docs\postman\bewertungsapp-environment.json
```

Voraussetzung ist ein laufender Backend-Server unter `http://127.0.0.1:4000` sowie eine entsprechend vorbereitete MySQL-Testdatenbank.

## 9. Fazit

Die REST-API der Bewertungsapp wurde erfolgreich manuell und automatisiert getestet.

Alle 20 automatisierten Requests und alle 41 Assertions waren erfolgreich. Die CRUD-Funktionen für Teams und Projekte, die Validierung von Bewertungen sowie die statistische Auswertung arbeiten in der getesteten lokalen Umgebung wie erwartet.

**Gesamtergebnis: Testlauf erfolgreich, 0 Fehler.**