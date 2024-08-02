import React, { useState } from 'react';
import Block from './Block';
import AttemptedBlock from './AttemptedBlock';


const styles = {
  "display": "flex",
  "justifyContent": "center"
}

const Board = (props) => {
  const { word, successful, unsuccessful } = props;
  const maxAttempts = word.length;
  const [blocks, setBlocks] = useState(
      Array.from({ length: maxAttempts }, () => Array.from({ length: word.length }, () => null))
    );
  const [attempedRows, setAttemptedRows] = useState([]);
  const [focused, setFocused] = useState({x: 0, y: 0});

  const attempted = (i, j, char) => {
    const copy = blocks.slice();
    copy[i][j] = char;
    let x, y;
    if (j === word.length-1) {
      const newAttemptedRows = attempedRows.slice();
      newAttemptedRows.push(i);
      setAttemptedRows(newAttemptedRows);
      x = focused.x + 1;
      y = 0;

      if (blocks[i].join('') === word) {
        successful(i + 1);
      }
    } else {
      y = focused.y + 1;
      x = focused.x;
    }
    const newFocused = { x, y };
    setFocused(newFocused);
    setBlocks(copy);
    if (i === word.length -1 && j === word.length-1) {
        unsuccessful();
    }
  }

  return (
    <div>
      <DrawBoard
        blocks={blocks}
        attempted={attempted}
        word={word}
        attempedRows={attempedRows}
        focused={focused}
      />
    </div>
  );
};

const DrawBoard = (props) => {

  const { 
    blocks,
    attempted,
    word,
    attempedRows,
    focused
  } = props;

  return (
    <div className="board" style={styles}>
    <table className="grid">
      <tbody>
      {blocks.map((row, i) => {
        return (
          <tr key={i} className="row">
            {row.map((char, j) => {
              if (char) {
                return (
                  <AttemptedBlock
                    char={char}
                    evaluated={attempedRows.includes(i) ? true : false}
                    isCorrect={char === word.charAt(j) ? true : false}
                    hasChar={word.includes(char)? true : false}
                  />
                )
              } else {
                return <DrawBlock i={i} j={j} attempted={attempted} focused={focused}/>
              }
            })}
          </tr> 
        )
      })}
      </tbody>
    </table>
    </div>
  )
}

const DrawBlock = (props) => {
  const { i, j, attempted, focused } = props;
  return (
    <Block
      attempted={attempted}
      keys={[i,j]}
      isFocused={(focused.x === i && focused.y === j) ? true : false}
    />
  )
}

export default Board;