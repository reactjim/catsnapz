# Cat Snapz

## Pre-requisites

- Node v14+ https://nodejs.org/en/
- Yarn

## Running the app

- Run `yarn install` to install project dependencies
- Once dependencies install, run `yarn start`

## Running the tests

- No time for tests - boo hoo :(

## Languages / frameworks used

- ReactJS - https://reactjs.org/
- Axios - https://github.com/axios/axios
- Typescript - https://www.typescriptlang.org/

## Tools used

- VS Code - https://code.visualstudio.com/
- The Cat API - https://thecatapi.com/
- Parcel bundler - https://parceljs.org/

## Notes & potential improvements

1. No automated tests included
1. Due to time constraints, I'm loading all images, votes and favs in one hit and smashing it all together. A more elegant solution is needed for this
1. For speed, I used Semantic UI component library
1. Really(!) simple implementation of a user utilising local storage. Clear local storage and you lose your votes/favourites... d'oh!
1. The two hooks are waaaaay too HEAVY and some abstraction is seriously needed... no time now though
1. Some caching of results would be nice to avoid hitting API every time listing page is loaded
1. A loading state for images and when clicking on favourites and vote buttons would enhance the ux
