## Meteorological stations API
Minimal API to serve meteorological stations definitions.

## Running
Before running execute `npm install` to install all of the dependencies of the project. You can manually set the `NODE_ENV` environment value or let any of the scripts do it for you.

It is necessary to create a *config.[NODE_ENV].js* file for each environment in which the application will be run. This files have not been commited to the repository since they contain the credentials that allow the API to connect to the database. The file has to have the following format:

```
module.exports = {
  database: [NAME_OF_THE_DATABASE],
  username: [DB_USERNAME],
  password: [PASSWORD],
  host: [HOST],
  dialect: 'mysql'
}
```

It is strongly recommended that the API has a dedicated user (or role) to access the database. This role should have privileges acording to the capabilities of the API.

Then, to start the API simply execute `npm start`. Check the *package.json* to see other scripts available.

### TO DO
- [ ] Remove need to connect to database in tests
- [x] Remove body-parser
- [x] Write deployment instructions
- [ ] Add API docs
- [x] Mock ORM and assert called in tests before proceeding any further
- [x] Create config files for testing and production (gitignored)
- [x] Connect to DB