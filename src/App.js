import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import './App.css';
import Die from './components/Die'
import DiceNumber from './components/DiceNumber'

export default function App() {
  const [coloredBackground, setColoredBackground] = useState(false)
  const [selectedDiceNumber, setSelectedDiceNumber] = useState()

  const bestScoreKey = `best_score_${selectedDiceNumber}`
  const oldBestScore = localStorage.getItem(bestScoreKey) ?? 0
  const [bestScore, setBestScore] = useState(oldBestScore)

  const [dice, setDice] = useState(getRandomDiceElements())
  const [rolls, setRolls] = useState(0)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    setRolls(0)
  }, [selectedDiceNumber])

  useEffect(() => {
    const areAllDiceValuesEqual = dice.every(die => die.value === dice[0].value)
    const areAllDiceHeld = dice.every(die => die.isHeld)

    if (areAllDiceValuesEqual && areAllDiceHeld) {
      setTenzies(true)

      if (rolls > 0 && (oldBestScore === 0 || rolls < oldBestScore)) {
        localStorage.setItem(bestScoreKey, rolls)
        setBestScore(localStorage.getItem(bestScoreKey))
      }

      setRolls(0)
    }
  }, [dice, rolls, oldBestScore, bestScoreKey, bestScore])

  useEffect(() => {
    setTenzies(false)
    setBestScore(localStorage.getItem(bestScoreKey) ?? 0)
  }, [selectedDiceNumber, bestScoreKey])

  function getRandomDieObject() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function getRandomDiceElements() {
    const newDice = []

    for (let i = 0; i < selectedDiceNumber; i++) {
      newDice.push(getRandomDieObject())
    }

    return newDice
  }

  function setDieHoldValue(dieId) {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === dieId ? { ...die, isHeld: !die.isHeld } : die
      }))
    }
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
    } else {
      setRolls(oldRolls => oldRolls + 1)
    }

    setDice(oldDice => oldDice.map(die => {
      return die.isHeld && !tenzies ? die : getRandomDieObject()
    }))
  }

  function getDiceNumberElements() {
    const possibleDiceNumbers = [10, 15, 20, 25, 30]
    if (!selectedDiceNumber) {
      setSelectedDiceNumber(possibleDiceNumbers[0])
    }
    return possibleDiceNumbers.map(diceNumber => {
      return <DiceNumber key={nanoid()} value={diceNumber} isSelected={diceNumber === selectedDiceNumber} changeSelectedDiceNumber={setSelectedDiceNumber} />
    })
  }

  function getDiceElements() {
    if (dice.length === selectedDiceNumber) {
      return dice.map(die => <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} hold={setDieHoldValue} />)
    }

    setDice(getRandomDiceElements())
  }

  return (
    <div className='main-body'>
      <section>
        <div className='container infos'>
          <span className='dice-number-info'>
            <h3 className='dice-number-text'>Number of Dice: </h3>
            {getDiceNumberElements()}
          </span>
          <h3 className='number-of-rolls'>Rolls: <span className='rolls'>{rolls}</span></h3>
          <h3 className='best-score'>Best Score: <span className='score'>{bestScore}</span></h3>
        </div>
      </section>
      {tenzies && <Confetti />}
      <main>
        <div className='container tenzies'>
          <h1>
            Tenzies
          </h1>
          <h2>
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
          </h2>
          <div className={`dice-container ${selectedDiceNumber <= 25 ? 'five-columns' : 'six-columns'}`}>
            {getDiceElements()}
          </div>
          <button className='roll-button' onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
        </div>
      </main>
    </div>
  );
}
