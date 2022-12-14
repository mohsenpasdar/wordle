import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { boardDefault, generateWordSet } from './Words';
import AppContext from './context/AppContext';
import { useEffect, useState } from 'react';

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 })
  const [wordSet, setWordSet] = useState(new Set())

  const correctWord = 'RIGHT'

  useEffect(() => {
    generateWordSet().then(words => {
      setWordSet(words.wordSet)
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({
      ...currAttempt,
      letterPos: ++currAttempt.letterPos
    })
  }

  const onDelete = () => {
    if (!currAttempt.letterPos) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ''
    setBoard(newBoard)
    setCurrAttempt({
      ...currAttempt,
      letterPos: --currAttempt.letterPos
    })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    let currWord = ''
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i]
    }
    console.log(currWord.toLowerCase());
    console.log(wordSet);

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({
        attempt: ++currAttempt.attempt,
        letterPos: 0
      })
    } else {
      alert('word not found')
    }

    if (currWord === correctWord) {
      alert ('Game ended!')
    }
  }

  return (
    <div className="App">
      <nav>
        <h1>WORDLE</h1>
      </nav>
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord }}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
