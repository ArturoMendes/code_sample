# Meteorological Data Viewer

### Configure the application

Change the url's for external resources before deploying. To do so change edit the file `src/config.js` and change *STATION_API_URL* to the url of the service that provides the stations and the master variables. If necessary change *METEO_API_URL* to point to the service that offers the meteorological measurements.

### Running

Execute `npm install` and wait while NPM install all the necessary dependencies. Then run `npm start` to preview the application on your browser.

### Deployment

Execute `npm run build` and serve the files created in the folder build

### TO DO
- [x] Fix date ranges not working
- [x] Improve use of context
- [x] Use handling of HTTP methods (*useQuery*)
- [ ] Transform date field to locale date (?)
- [ ] Improve how charts are displayed on smaller devices
- [ ] Improve table style
- [ ] Improve swipe panel transition on height change (?)
- [x] Create charts
- [ ] Improve map layer style
- [x] Create Constants file to save API url's and other application scope variables
- [x] Improve instantiation of Map Component and map
- [x] Write docs on configuration and deployment of app
