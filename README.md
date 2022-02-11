# Animal Flow Sequence Builder

## Description
This is an app, created using React JS, for designing Animal Flow sequences. It uses my [Animal Flow Moves API](https://github.com/steve-dave8/Animal-Flow-Moves-API) on the backend. 

### Features
* Over 100 movements

* For a selected movement a list of next possible movements will be provided from which you can pick your next move and repeat the process to build a flow

* Options to filter next moves by level and/or component

* Generate random flows (with filter options available)

* Mirror your flows (swapping left/right)

* An index to look up moves individually

* Options to save flows and manage saved flows. Option to create account for saving flows so they could be accessed from any device.

## Getting Started
1. Git clone the frontend and backend repos.

..* `git clone https://github.com/steve-dave8/Animal-Flow-Sequence-Builder.git`

..* `git clone https://github.com/steve-dave8/Animal-Flow-Moves-API.git`

2. After cloning, in your Terminal while in the frontend folder run the command `npm install` which will create a node_modules folder that contains the frontend's dependencies as outlined in its package.json file. Repeat for the backend folder.

3. Backend environment setup: create a .env file in the main backend folder and set a PORT variable. Example: `PORT=4000`. Also set a JWT_SECRET variable.

4. Start scripts: 

..* Backend: `npm start`

..* Frontend: this requires setting the variable `REACT_APP_BACKEND` whose value should be the url for the backend. For running locally the value can be something like `http://localhost:4000` depending on which port you set for the backend. You will need to use one of the following:

For MacOS: `REACT_APP_BACKEND=http://localhost:4000 npm start`

For Windows (command line; cmd.exe): `set "REACT_APP_BACKEND=http://localhost:4000" && npm start`

For Windows (powershell): `($env:REACT_APP_BACKEND = "http://localhost:4000") -and (npm start)`

For more information on React & Environment Variables, see [documentation](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables#adding-temporary-environment-variables-in-your-shell).

## Project Status
### Upcoming
* Ongoing addition of movements to the backend.
* Addition of callout shorthand.

### Bugs
* If a user was logged in and selected a saved flow from their account then after logging out the 'delete' and 'clear' icons in the SavedFlows component are still visible. The selected flow is also still visible even though now it can not be reselected while logged out.

Possible solutions: lift state up to a higher level (App component) OR use Redux.

## More Info
See the official website for Animal Flow to learn more about this movement system: <https://animalflow.com/>

