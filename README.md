# Employee Management Application

Angular + NgRx + Angular Material employee management application built for the Exelynt Frontend Developer Assignment.

## Features
- Responsive employee table
- Search employee by ID
- Add, edit and delete employee
- Delete confirmation dialog
- Reactive Forms with validation
- Country API integration
- Employee REST API integration
- NgRx Store, Effects and Entity Adapter
- Loading, error and empty states
- Smart/container and presentation-oriented components
- Angular Material UI
- Unit tests
- OnPush change detection and selector-based state access

## APIs
Countries:
https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country

Employees:
https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee

## Run
```bash
npm install
npm start
```

Open http://localhost:4200

## Test
```bash
npm test
```

## Build
```bash
npm run build
```

## Structure
- `core/` models and API services
- `store/` NgRx actions, reducers, effects and selectors
- `features/` employee screens
- `shared/` reusable UI components
