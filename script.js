const cells = document.querySelectorAll(".game_board .cell");

const storage = new Storage("tictactoe");

storage.getAll(function (data) {
  let count = Object.keys(data).length;
  for (const id in data) {
    const index = data[id].index;
    const symbol = data[id].symbol;
    cells[index].textContent = symbol;
  }

  for (let index = 0; index < cells.length; index++) {
    const cell = cells[index];

    cell.addEventListener("click", function () {
      if (this.textContent != "") {
        return;
      }
      const symbol = ++count % 2 == 0 ? "o" : "x";
      storage.set(index, symbol, function (id, entry) {
        console.log(id, entry);
      });

      this.textContent = symbol;
      check_winner: {
        const win_combinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        for (const combination of win_combinations) {
          if (
            symbol === getCellText(combination[0]) &&
            symbol === getCellText(combination[1]) &&
            symbol === getCellText(combination[2])
          ) {
            showMessage("Winner is " + symbol + "!");
            break;
          }
        }
      }
    });
  }
});

function getCellText(id) {
  return cells[id].textContent;
}

document.querySelector(".reset").addEventListener("click", function () {
  resetGame();
});

document.querySelector(".reset_game").addEventListener("click", function () {
  resetGame();
  popup.classList.remove("open");
});

function resetGame() {
  for (const cell of cells) {
    cell.textContent = "";
    // storage.delete(id);
  }

  storage.clear();
  count = 0;
}

const popup = document.querySelector(".popup");

popup.addEventListener("click", function (event) {
  if (!event.target.classList.contains("popup")) {
    return;
  }
  this.classList.remove("open");
});

function showMessage(message) {
  popup.querySelector(".message").textContent = message;
  popup.classList.add("open");
}

/*
  (condition) ? 'value_if_true' : 'value_if_false';

  const data = {4: "fasdfsadf"};


  ....

    getElement(4);
    ...

  ...

  function getElement(id) {
    return data[id];
  }
  ///...
*/
