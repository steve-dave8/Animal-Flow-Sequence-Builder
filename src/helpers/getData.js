let basePositions;
let moveList;

const getBasePositions = async () => {
    const response = await fetch("http://localhost:4000/base-positions", {method: "GET", mode: 'cors'});
    const data = await response.json();
    basePositions = data;
};
getBasePositions();

const getMoveList = async () => {
    const response = await fetch("http://localhost:4000/move-list", {method: "GET", mode: 'cors'});
    const data = await response.json();
    moveList = data;
};
getMoveList();

export { basePositions, moveList };