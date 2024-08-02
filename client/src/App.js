import workingLogo from './assets/work_in_progress.svg';
import wellDoneLogo from './assets//well_done.svg';
// import refreshLogo from './arrows-rotate-solid.svg';
import sadLogo from './assets/sad.svg'
import './App.css';
import Board  from './Board';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

// const options = {
//   method: 'GET',
//   url: 'https://wordsapiv1.p.rapidapi.com/words/',
//   params: {
//     letterPattern: '^a.{4}$',
//     pronunciationpattern: '.*æm$',
//     limit: '100',
//     page: '1',
//     hasDetails: 'hasDetails'
//   },
//   headers: {
//     'X-RapidAPI-Key': '',
    
//     'X-RapidAPI-Host': ''
//   }
// };

function App() {


  const [word, setWord] = useState('');
  useEffect(() => {
  // Replace the word with response
  //   axios.request(options).then(function (response) {
  //     setWord(response.data);
  //   }).catch(function (error) {
  //     console.error(error);
  //   })
    setWord('APPLE');
  })

  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState();
  const [failed, setFailed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const successful = (count) => {
    setCount(count);
    setSuccess(true);
  }

  const unsuccessful = () => {
    setFailed(true);
  }

  // const toggleHover = () => setIsHovering(!isHovering);
  const mouseEnter = () => setIsHovering(true);
  const mouseLeave = () => setIsHovering(false);

  const reset = () => {
    setSuccess(false);
    setFailed(false);
    setCount(0);
    setIsHovering(false);
  }

  const Refresh = () => {
    return (
      <div className="retry-block">
        <FontAwesomeIcon
          icon={faRotate}
          className={isHovering ? "fa-spin retry-img" : "retry-img"}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
          onClick={reset}
        />
      </div>
    )
  };

  const Game = () => {
    if (success) {
      return (
        <div className="win-message">
          <div>
            Word: {word}
          </div>
          <div className="win-icon-block">
          <span>
            <img src={wellDoneLogo} className="done" />
          </span>
          <span>
            Attempted the word in {count} {count > 1 ? `tries` : `try`}
          </span>
          </div>
          <Refresh />
        </div>
      )
    } else if (failed)  {
      return (
        <div>
          <img src={sadLogo} className="failed" />
          <Refresh />
        </div>
      )
    } else {
      return (
        <div className="board-game">
          <div className="working"><img src={workingLogo} /></div>
          <div><label>Enter today's word</label></div>
          <Board word={word} successful={successful} unsuccessful={unsuccessful}/>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
    </div>
  );
}

export default App;
