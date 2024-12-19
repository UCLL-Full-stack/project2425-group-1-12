# Requirements



## User Stories

- [x] Navigation-bar
- [x] User-login
- [x] User-register
- [x] User-logout
- [ ] Adding-PC-to-Cart
- [ ] Ordering
- [ ] Order-history
- [x] Account-page
- [x] Administrator-page


## Per lab


### Lab 1 - Typescript Jest

- [x] De code van je project staat op GitHub classroom, in een repository die overeenkomt met je Toledo groep.
- [x] De map “back-end/model” bevat je domeinmodel geschreven in Typescript.
- [ ] De map “back-end/test/model” bevat alle tests voor je domeinobjecten. Op dit moment kun je alleen het aanmaken van je objecten testen, validatie is voor de volgende les.
- [x] Tests worden geschreven met Jest.


### Lab 2 - REST API with Node.js & Express

- [x] Alle lagen worden geïmplementeerd volgens de principes van gelaagde architectuur:
  - [x] Domein
  - [x] Services
  - [x] Controllers
- [x] Validatie:
  - [x] Controllers bevatten geen validatie.
  - [x] Services bevatten overkoepelende validatieregels.
  - [x] Domeinobjecten bevatten input validatie en business validatie die specifiek zijn voor dat domeinobject.
- [ ] Testen:
  - [x] Alle domeinobjecten zijn volledig getest met Jest, inclusief validatie.
  - [ ] Alle services zijn volledig getest met Jest.
  - [x] Controllers worden getest via swagger (handmatig), geen aparte tests nodig.
- [x] De gegevens die binnenkomen via requests in de router worden ingekapseld in Data Transfer Objects. DezeDTO's zijn gedefinieerd in een bestand index.ts in de map types.
- [x] Alle routes zijn volledig gedocumenteerd en uitvoerbaar met Swagger via de url /api-docs.
- [x] Voor elk type is er een volledig uitgewerkt componentenschema gedefinieerd bovenaan de controller zelf.


### Lab 3 - React & Next.js intro

- [x] Een Next.js front-end app is geïnstalleerd in de front-end directory.
- [x] Alle pagina's die een route in Next.js nodig hebben worden in de map “pages” geplaatst.
- [x] Pagina's worden opgebouwd uit verschillende herbruikbare componenten die in de map “components” worden geplaatst.
- [(x) tf does this mean??] Componenten worden niet rechtstreeks geïmplementeerd in een pagina.
- [x] “Props” worden gebruikt om dynamische inhoud binnen componenten weer te geven.
- [x] “State” wordt gebruikt om informatie op te slaan tussen verschillende renders van een component (geen lokale variabelen!).
- [x] Callback functies worden gebruikt om hogerliggende componenten of pagina's op de hoogte te brengen van een gebeurtenis binnen de huidige component.
- [x] Het aanroepen van een Rest API gebeurt in afzonderlijke, herbruikbare Services. Er wordt nooit fetch logica rechtstreeks in een component geschreven.
- [x] Dynamische routing moet op de juiste plaatsen worden gebruikt.
- [x] Je gebruikt events op verschillende plaatsen (onclick, onhover, ...).

### Lab 4 - Database

- [x] Je werkt niet langer met statische gegevens in de repositories, maar met een echte database.
- [x] Wijzigingen aan bestaande entiteiten moeten in de servicelaag via het domeinmodel worden gedaan en pas daarna via de repository-laag naar de database worden gestuurd. Op deze manier worden business- en validatieregels niet geschonden.
- [x] Het databaseschema wordt gemodelleerd in een Prisma-schema en de Prisma-client wordt gegenereerd.
- [x] Databaseobjecten in de domeinlaag gebruiken de Prisma-client om de database te bevragen.
- [x] Er worden geen Prisma-objecten doorgegeven aan de servicelaag. Prisma-objecten worden gekoppeld aan domeinobjecten in een statische from-methode van het bijbehorende domeinobject.
- [x] Er wordt een lokale postgreSQL database geïnstalleerd en gebruikt. De configuratie om verbinding te maken staat in een .env bestand.
- [x] Er wordt minimaal 1 één-op-veel relatie gemodelleerd.
- [x] Tenminste 1 many-to-many relatie is gemodelleerd in je prisma schema en domein objecten. Er mag geen circulaire afhankelijkheid bestaan in je domeinlaag, dus beslis of je een tussenliggend object gebruikt of dat je de relatie in het domein uni-directioneel maakt.


### Lab 5 - Front-end advanced

- [ ] De hook useSWR wordt gebruikt voor API-requests.
  - [ ] SSR en SSG kunnen optioneel worden toegepast.
- [ ] De hook useEffect wordt gebruikt voor interactie met een extern systeem (bijv. browser storage).
- [ ] Er is minstens 1 functioneel formulier met validatie, foutafhandeling en integratie met de back-end.
- [ ] Er is minstens 1 login formulier met validatie en foutafhandeling.
- [x] Er worden minstens 2 waarden opgeslagen in de browser storage en gebruikt in de hele applicatie.
- [x] Styling is toegepast in de mate dat je applicatie bruikbaar en leesbaar is. Je mag je eigen styling framework kiezen.


### Lab 6 - Security

- User Sign-up:
  - [x] Paswoorden worden steeds encrypted opgeslagen in de database (bcrypt).
  - [ ] User input wordt steeds gevalideerd. (Back-end en Front-end)
- Authentication:
  - [ ] Je gebruikt JWT token based authentication waar nodig in de routes en Swagger.
  - [ ] Behalve voor login, register, status, de Swagger documentatie en eventueel een beperkt aantal andere routes afhankelijk van de context van je project.
- Authorisation:
  - [ ] Je hebt minstens 3 verschillende rollen in je domain.
  - [ ] Minstens 1 route in je back-end heeft een ander gedrag afhankelijk van de rol (geeft andere data op basis van de rol)


### Lab 7 - Front-end security & i18n

- Security in front-end
  - [x] Je kan inloggen, uitloggen en gebruikers registreren.
  - [x] Er wordt gebruik gemaakt van token-based authentication met JWT.
  - [x] Authentication: de meeste pagina's zijn afgeschermd
  - [x] Authorisation: minstens 1 pagina geeft een andere content op basis van de rol
  - [ ] Als gebruiker een functionaliteit/pagina oproept waartoe hij niet gemachtigd is, wordt hij op een correcte manier geïnformeerd.
  - [ ] Je voorziet op de homepagina een tabel met een aantal voorgedefinieerde gebruikers die wij als lectoren kunnen gebruiken om je project mee te testen. Voorbeeld hieronder
  - [ ] Indien de username of het password niet voldoet aan je validatieregels dan verander je dat in de tabel.

| username | password | role                                        |
|----------|----------|---------------------------------------------|
| user1    | user1    | rol in context van je project (bv. lector)  |
| user2    | user2    | rol in context van je project (bv. student) |
| user3    | user3    | rol in context van je project (bv. admin)   |


- i18n
  - [x] Je kan minstens 3 pagina's van je project in minstens 2 talen/locales tonen.
  - [x] Je kan op een gebruiksvriendelijke manier de taal switchen op elk van minstens deze 3 pagina's.



## Final project requirements


### General

- [ ] The project is versioned in a GitHub repository which is initialized via GitHub classroom.
- [ ] A release tag with the name “FINAL” is created before the deadline of the assignment. This tag will be reviewed.
- [ ] The project consists of an "analysis", "front-end" and "back-end" folder.
- [ ] The project follows the same structure as the provided start template.
- [ ] Your project contains a seed.ts containing test data that we can use to test your stories. This script must be executable via "npx ts-node util/seed.ts".
- [ ]  We need to be able to start your project immediately with our own database configuration by using the steps:
  - Back-end: npm install; npx prisma migrate dev; npm start
  - Front-end: npm install; npm start
- [ ] Create a movie (max. 4 minutes) to demo the project.
- [ ] The login page contains a table of predefined users that can be used for testing, e.g.

| username | password | role                                        |
|----------|----------|---------------------------------------------|
| user1    | user1    | rol in context van je project (bv. lector)  |
| user2    | user2    | rol in context van je project (bv. student) |
| user3    | user3    | rol in context van je project (bv. admin)   |


### Functional

- [ ] All the user stories work as described in your analysis and demonstrate that you have mastered all technical expectations. Your analysis is up to date with your code.


### Domain

- [ ] The domain model contains at least 4 entities and reflects the domain model in the analysis.
- [ ] There is at least 1 one-to-many and 1 many-to-many relationship in the database.
- [ ] Many-to-many relationships in the database are not bi-directionally mapped in the domain.
- [ ] The database schema is modelled by means of a Prisma schema (in repository/prisma).
- [ ] A local postgres database is used, connection configuration is stored in a separate .env file.
- [ ] CRUD operations are executed via Prisma client objects.
- [ ] Layered architecture:
  - [ ] Domain objects only depend on other domain objects (not repositories, services or controllers)
  - [ ] Prisma client objects are mapped to domain objects via a static from function in the domain object itself.
  - [ ] No Prisma client objects are passed to services or controller
- [ ] Domain objects contain input validation and business rules validation.
- [ ] Testing: Domain objects are fully tested with Jest.


### Services

- [ ] Services only do orchestration and do not contain domain specific business logic.
- [ ] Services only contain overarching validation rules that can't be handled by the domain.
- [ ] Updates on existing entities are first validated using the domain model before calling the database layer.
- [ ] Layered architecture: services only delegate to the domain or other services, not to controllers.
- [ ] Testing: all services are fully tested with Jest. Mock objects (jest.fn()) are used to ensure isolated testing.


### Controllers

- [ ] All API routes are housed in controllers that are structured and split according to use-case or entity.
- [ ] Controllers only delegate to services and do error handling. They should not contain any other functionality.
- [ ] At least one route exists for every HTTP operation (POST, PUT, GET, DELETE).
- [ ] Each API route is fully documented and testable with Swagger on the url /api-docs.
- [ ] For each known input- and return type, there is a fully detailed component schema defined at the top of the controller itself.
- [ ] Incoming data in the routers' endpoints is encapsulated in Data Transfer Objects. These DTO's are defined in types/index.ts.


### Front-end

- [ ] All routes in the front-end that a user can navigate to have a page in the “pages” folder.
- [ ] There is at least 1 dynamic route.
- [ ] A page only contains a skeleton and is composed of reusable React components.
- [ ] Fetching logic for calling the backend API is encapsulated in separate reusable services.
- [ ] At least one form with a minimum of 2 fields (besides the user login form) exists.
- [ ] A user login form exists.
- [ ] Every form contains validation, error handling and event handling.
- [ ] There are at least 1 GET, 2 POST, 1 PUT and 1 DELETE requests to the back-end API which are fully implemented in the back-end.
- [ ] At least two values are stored in browser session storage and used across the application.
- [ ] Hooks are used in the correct way: useSWR for API requests, useEffect for interaction with external systems, useInterval for polling.
- [ ] I18n:
  - [ ] The application is available in 2 languages (min. 1 page).
  - [ ] There is a user-friendly way to change the language of these pages.
- [ ] Testing: At least 2 components are tested using React Testing Library.


### Security

- [ ] Passwords are stored encrypted in the database using bcrypt.
- [ ] Token-based authentication with JWT is used.
- [ ] Login, user sign-up, api-docs are excluded from authentication. All other pages are protected with authentication.
- [ ] It is possible to authenticate via swagger and test protected endpoints.
- [ ] There exist at least 3 roles in the domain.
- [ ] Back-end: at least 1 route shows different behavior depending on the role.
- [ ] Front-end: at least 1 page shows different behavior/data depending on the role.
- [ ] Authentication/authorization errors are correctly displayed in the front-end.
- [ ] HTTP traffic is protected using Helmet.