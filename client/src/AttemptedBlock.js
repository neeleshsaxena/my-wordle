
import React, { useEffect, useState } from 'react';

const normalStyles = {
  "backgroundColor": "#135DF3",
  "height": "30px",
  "width": "30px",
  "padding": "4px",
  "margin": "4px",
  "textAlign": "center",
  "color": "black",
  "borderRadius": "5px",
  "fontSize": "25px"
}

const correctStyles = {
    "backgroundColor": "#0AF500",
    "height": "30px",
    "width": "30px",
    "padding": "4px",
    "margin": "4px",
    "textAlign": "center",
    "color": "black",
    "borderRadius": "5px",
    "fontSize": "25px"
}
const incorrectStyles = {
    "backgroundColor": "#F31317",
    "height": "30px",
    "width": "30px",
    "padding": "4px",
    "margin": "4px",
    "textAlign": "center",
    "color": "black",
    "borderRadius": "5px",
    "fontSize": "25px"
}

const incorrectPositionStyles = {
  "backgroundColor": "#FBC01E",
  "height": "30px",
  "width": "30px",
  "padding": "4px",
  "margin": "4px",
  "textAlign": "center",
  "color": "black",
  "borderRadius": "5px",
  "fontSize": "25px"
}

const AttemptedBlock = (props) => {

  const { char, evaluated, isCorrect, hasChar } = props;
  const [styles, setStyles] = useState(normalStyles);
  useEffect(() => {
    if (evaluated && isCorrect) {
      setStyles(correctStyles);
    } else if (evaluated & !isCorrect) {
      if (hasChar) {
        setStyles(incorrectPositionStyles)
      } else {
        setStyles(incorrectStyles);
      }
    }
  }, [evaluated, isCorrect, hasChar])

  return (
    <td>
      <input 
        style={styles}
        value={char}
        readOnly
      />
    </td>
  );

}

export default AttemptedBlock;