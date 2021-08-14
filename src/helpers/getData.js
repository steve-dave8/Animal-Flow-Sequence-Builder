const getBasePositions = async () => {
    const response = await fetch("http://localhost:4000/base-positions", {method: "GET", mode: 'cors'});
    const data = await response.json();
    return data;
};

const basePositions = getBasePositions();

const getMoveList = async () => {
    const response = await fetch("http://localhost:4000/move-list", {method: "GET", mode: 'cors'});
    const data = await response.json();
    return data;
};

const moveList = getMoveList();

export { basePositions, moveList };