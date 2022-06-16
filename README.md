# Vad gör Applikationen allmänt, vad är den till för?

Applikationen hanterar Sogetis årliga konstlotteri, där konstverk årsvis
lottas ut till de anställda. Utöver att visa upp de konstverk som ingår i en utlottning, sköter
systemet bl.a. allmän information om lotteriet, vinsthistorik, dragning av vinnare, register
över medlemmar med mera.

# Vilka knappar finns? Hur är de kopplade till lotterierna?

## För användare:

    - "Norrkonst"
    Knapp med dropdown-funktion där man kan se konstverk
    för de olika åren (denna knapp ändras till huvudmeny-knapp i "mobilläge")

    - "Högvinster"
    Knapp för att se de olika konstverken som varit med i tidigare lotteri samt se vilka konstverk som är med i de aktuella lotteriet. Användare kan klicka på ett konstverk för att få upp en ruta med detaljerad info om konstverket.

    - "Garantivinster"
    Knapp för att se garantivinster för tidigare år eller i de aktuella lotteriet.

    - "Vinnare"
    Knapp för att se tidigare vinnare, här finns även funktion för att söka bland vinnarna.

    - "Om oss"
    Knapp med en dropdown-funktion som visar menyval för "Styrelse", "Flöde" och "Info".

## För admin:

    - "Norrkonst"
    Knapp med dropdown-funktion med de olika lotterierna, där admin kan skapa nytt lotteri, redigera samt ta bort tidigare lotterier.

    - "Högvinster"
    Knapp för att se de olika konstverken som varit med i tidigare lotteri samt se vilka konstverk som är med i de aktuella lotteriet. Här finns det tre funktions-knappar för admin:
    "Ta bort valda", "Välj alla" samt "Lägg till ny". Som admin kan man klicka på konstverket och redigera och på så sätt uppdatera det valda konstverket. Man kan markera en eller flera bilder om man vill ta bort.

    - "Garantivinster"
    Knapp för att se garantivinster för tidigare år eller i de aktuella lotteriet samt kunna lägga upp ny garantivinst.

    - "Logga in/ut"
    Knapp där man loggar in med användarnamn och lösenord (för admin).

    - "Medlemmar"
    Knapp för att se vilka som är medlemmar, sökfunktion för att söka bland medlemmar. Funktioner för att lägga till, redigera och ta bort medlemmar.

    - "Vinnare"
    Knapp för att se tidigare vinnare och välja konstföremål som vinnarna har valt.

    - "Starta Lotteri"
    Där finns en knapp som utför dragning och som slumpvis lottar fram vinnare, 25% av medlemmarna vinner högvinster och resten får garantivinst.

    - "Om oss"
    Knapp med en dropdown-funktion som visar "Styrelse", "Flöde" samt "Info".
    I samtliga dessa sidor kan admin klicka på en funktions-knapp, "pennan", för att redigera text.

    - "Logga ut"
    Knapp för att som admin kunna logga ut.

## Vilka listor med data finns?

-   konstverk
-   medlemmar
-   vinnare

## Vad kan användare göra?

-   se olika år
-   titta på konstverk
-   välja konstverk om man vunnit
-   se vinnare
-   se info

## Vad kan admin göra?

-   utöver det användare kan se:
    -   redigera konstverk
    -   redigera medlemmar
    -   redigera vinnare
    -   lotta fram vinnare
    -   redigera info-sidor

## Vilken teknik ligger bakom?

-   Frontend/Backend
-   Java (med Spring Boot)
-   Angular (med Material Design)
-   mySQL

# SogetiArtLotteryClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
