const grid = document.getElementsByClassName("grid-item");
const player = document.getElementById("player");
let firstPlayer = true;
let player1Clicks = [];
let player2Clicks = [];
winningSequences = [
  ["a0", "a1", "a2"],
  ["a3", "a4", "a5"],
  ["a6", "a7", "a8"],
  ["a0", "a3", "a6"],
  ["a1", "a4", "a7"],
  ["a2", "a5", "a8"],
  ["a0", "a4", "a8"],
  ["a2", "a4", "a6"],
];
winningSequence = [];
let count = 0;

for (let i = 0; i < grid.length; i++) {
  grid[i].addEventListener("click", function () {
    count++;
    const img = document.createElement("img");
    if (firstPlayer) {
      img.src = "cross.png";
      img.className = `a${i}`;
      grid[i].classList.add(`a${i}`);
      player1Clicks.push(`a${i}`);
      player.innerText = "Player 2 turn";
    } else {
      img.src = "blueO.png";
      img.className = `a${i}`;
      grid[i].classList.add(`a${i}`);
      player2Clicks.push(`a${i}`);
      player.innerText = "Player 1 turn";
    }

    grid[i].appendChild(img);
    if (count >= 5) {
      let currentPlayerClicks = firstPlayer ? player1Clicks : player2Clicks;
      for (let j = 0; j < winningSequences.length; j++) {
        let allElementsPresent = winningSequences[j].every((element) =>
          currentPlayerClicks.includes(element)
        );
        if (allElementsPresent) {
          player.innerText = firstPlayer ? "Player 1 wins!" : "Player 2 wins!";
          player.className = "winner";
          winningSequence.push(winningSequences[j]);
          const [innerArray] = winningSequence;
          for (let k = 0; k < grid.length; k++) {
            for (let l = 0; l < innerArray.length; l++) {
              if (grid[k].classList.contains(innerArray[l])) {
                grid[k].classList.add("winning-boxes");
              }
            }
          }
        }
      }
    }
    if (count === 9) {
      player.innerText = "Draw!";
      player.className = "draw";
    }
    firstPlayer = !firstPlayer;
  });
}
