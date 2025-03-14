# SHIFT Helper

[English](README.md) | [中文](README_zh.md) | [Deutsch](README_de.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Wikang Tagalog](README_tl.md) | [reo Māori](README_mi.md) | [हिन्दी](README_hi.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Ein einfaches, benutzerfreundliches, Open-Source-Tool zur Schichtverwaltung, das speziell für die Fahrer von Kinetic NZ Bus Tauranga entwickelt wurde, um wöchentliche Schichten zu planen und in die meisten Kalenderanwendungen zu integrieren.

#### Funktionen
1. **Unterstützung mehrerer Depots**: Unterstützt Shifts für Greerton, Papamoa, Maleme und Standby.
2. **Schulferienmodus**: Aktivieren Sie den School Holiday-Schalter, um die Shift-Optionen automatisch anzupassen.
3. **Feiertagsmodus**: Legen Sie einen beliebigen Tag als Public Holiday fest, um die Optionen für diesen Tag dynamisch zu ändern.
4. **Stapelbetrieb für Shifts**: Bei sich über mehrere Tage wiederholenden Schichten können Sie Datumsauswahl synchronisieren.
5. **Kalenderexport**: Erzeugt eine .ics-Datei, kompatibel mit gängigen Kalender-Apps (z. B. Google Calendar, Apple Calendar, Microsoft Outlook Calendar).
6. **Offline-Verfügbarkeit**: PWA-Technologie ermöglicht Nutzung jederzeit und überall.

### Anwendung
1. Wählen Sie ein Depot (z. B. Greerton).
2. Wählen Sie einen beliebigen Tag der Woche, um automatisch die Schichtansicht ab Sonntag anzuzeigen.
3. Stellen Sie die täglichen Schichten über das Dropdown-Menü ein, aktivieren Sie Kontrollkästchen für die Stapelsynchronisation und wechseln Sie die Feiertagsoptionen, um Shifts anzupassen.
4. Klicken Sie auf „Add to Calendar“, um eine .ics-Datei zu erstellen und in Ihren Kalender zu importieren. iPhone-Safari-Nutzer können direkt ohne Download importieren.
5. Klicken Sie auf „Send Feedback“, um Vorschläge oder Datenbankfehler zu melden; prüfen Sie „About“ für Versions- und Update-Informationen.

### Installation
SHIFT Helper unterstützt Browserzugriff und mobile Installation und bietet ein PWA (Progressive Web App)-Erlebnis. Nachfolgend finden Sie schrittweise Anleitungen für verschiedene Geräte:

#### Browserzugriff
- Öffnen Sie einen modernen Browser (z. B. Chrome, Safari, Edge).
- Geben Sie die URL ein: https://chenpreston.github.io/shift-helper-pwa/
- Sofortige Nutzung ohne zusätzliche Installation möglich.

#### Android-Nutzer
- **Schritte**:
  1. Öffnen Sie die obige URL im Chrome-Browser (empfohlen).
  2. Tippen Sie auf das „Drei-Punkte-Menü“ in der oberen rechten Ecke.
  3. Wählen Sie „Zum Startbildschirm hinzufügen“ oder „App installieren“.
  4. Nach Bestätigung erscheint das App-Symbol auf Ihrem Startbildschirm und kann wie eine native App verwendet werden.
- **Kalenderimport**:
  - Nach Klick auf „Add to Calendar“ wird die .ics-Datei heruntergeladen.
  - Öffnen Sie die Datei (oft automatisch mit Google Calendar verknüpft) und folgen Sie den Anweisungen zum Importieren.
- **Hinweis**: Unterstützt Offline-Nutzung; eine Netzwerkverbindung wird für die neuesten Daten empfohlen.

#### Apple-Nutzer (iPhone/iPad)
- **Schritte**:
  1. Öffnen Sie die obige URL im Safari-Browser (für direkten Kalenderimport erforderlich).
  2. Tippen Sie auf das „Teilen“-Symbol unten (ein Quadrat mit einem nach oben zeigenden Pfeil).
  3. Wählen Sie „Zum Home-Bildschirm hinzufügen“.
  4. Nach Bestätigung erscheint das App-Symbol auf Ihrem Startbildschirm und kann genutzt werden.
- **Kalenderimport**:
  - Nach Klick auf „Add to Calendar“:
    - **Safari**: Ein Kalenderimport-Fenster erscheint; folgen Sie den Anweisungen, um es in Apple Calendar hinzuzufügen.
    - **Chrome**: Lädt nur die .ics-Datei herunter, kein direkter Import in Apple Calendar möglich.
  - Falls Sie die .ics-Datei in Chrome herunterladen, senden Sie sie per E-Mail oder AirDrop an Safari zum Öffnen oder verwenden Sie eine .ics-unterstützende Drittanbieter-App (z. B. Google Calendar App).
- **Wichtige Hinweise**:
  - Auf Apple-Geräten können Chrome und andere Nicht-Safari-Browser .ics-Dateien nicht direkt in Apple Calendar importieren. Wenn Sie normalerweise Safari nicht nutzen, empfehlen wir, die oben genannten Installationsschritte einmalig mit Safari durchzuführen. Nach der Installation verwendet die App, wenn sie vom Startbildschirm gestartet wird, automatisch die Safari-Engine, sodass Sie Chrome für das tägliche Surfen weiterhin nutzen können.
  - Stellen Sie sicher, dass Ihr iOS-System auf die neueste Version aktualisiert ist, um die beste Erfahrung zu gewährleisten.

### Datenquelle
Die Daten stammen aus dem neuesten Shift Card des Unternehmens (Stand Januar 2025 zusammengestellt). Der Kalender enthält: Schichtnummer, Anmeldezeit, Abmeldezeit, Essensort, Essensdauer und Pausendauer.

### Technologie
- **Frontend**: HTML, CSS, JavaScript
- **PWA**: Service Worker für Offline-Caching
- **CSV-Parsing**: PapaParse-Bibliothek
- **Open Source**: MIT-Lizenz, Quellcode verfügbar unter [GitHub](https://github.com/chenpreston/shift-helper-pwa)