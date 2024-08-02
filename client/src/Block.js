
import React, { useRef, useEffect, useState } from 'react';

const styles = {
  "backgroundColor": "#6C63FF",
  "height": "30px",
  "width": "30px",
  "padding": "4px",
  "margin": "4px",
  "textAlign": "center",
  "color": "black",
  "borderRadius": "5px",
  "fontSize": "25px"
}

const Block = (props) => {

    const { isFocused, attempted, keys } = props;
    // will have a color
    // will have a text bar where you can only enter chars
    // will have a truth char to compare with

    const [inputVal, setInputVal] = useState('');
    const inputChar = useRef(null);
    useEffect(() => {
      if (isFocused) {
        inputChar.current.focus();
      }
    }, [isFocused]);

    const changeVal = (val) => {
      if (typeof val === 'string') {
        setInputVal(val.toUpperCase());
        attempted(keys[0], keys[1], val.toUpperCase());
      }
    }

    const onEnter = (e) => {
      if ((e.charCode >= 65 && e.charCode <= 90) ||
        (e.charCode >=97 && e.charCode<=122)) {
          changeVal(e.key);
      }
    }


    return (
      <td>
        <input
          key={keys[0]}
          type="text"
          maxLength="1"
          ref={inputChar}
          onKeyPress={onEnter}
          value={inputVal}
          onChange={changeVal}
          style={styles}
        />
      </td>
    );

}

export default Block;