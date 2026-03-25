export const createPlayer = (name, marker) => {

    let score = 0;

    const addScore = () => {
        score++
    }

    const getScore = () => score;

    return { name, marker, addScore, getScore };
}
