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

* Options to save flows and manage saved flows. Option to create account for saving flows so they can be accessed from any device.

## Project Status
### Upcoming
* Ongoing addition of movements to the backend.
* Addition of callout shorthand.

### Bugs
* If a user was logged in and selected a saved flow from their account then after logging out the 'delete' and 'clear' icons in the SavedFlows component are still visible. The selected flow is also still visible even though now it can not be reselected while logged out.
Possible solutions: lift state up to the highest level (App component) OR use Redux.

## More Info
See the official website for Animal Flow to learn more about this movement system: <https://animalflow.com/>

