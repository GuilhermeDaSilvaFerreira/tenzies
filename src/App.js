import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import './App.css';
import Die from './components/Die'

export default function App() {
  const [dice, setDice] = useState(getRandomDiceElements(10))
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const areAllDiceValuesEqual = dice.every(die => die.value === dice[0].value)
    const areAllDiceHeld = dice.every(die => die.isHeld)

    if (areAllDiceValuesEqual && areAllDiceHeld) {
      setTenzies(true)
    }
  }, [dice])

  function getRandomDieObject() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function getRandomDiceElements(numberOfDice) {
    const newDice = []
    
    for (let i = 0; i < numberOfDice; i++) {
      newDice.push(getRandomDieObject())  
    }

    return newDice
  }

  function setDieHoldValue(dieId) {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === dieId ? {...die, isHeld: !die.isHeld} : die
      }))
    }
  }

  function rollDice(){
    setTenzies(false)
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld && !tenzies ? die : getRandomDieObject()
    }))
  }

  const diceElements = dice.map(die => <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} hold={setDieHoldValue} />)

  return (
    <main>
      {tenzies && <Confetti />}
      <div className='container'>
        <h1>
          Tenzies
        </h1>
        <h2>
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </h2>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button className='roll-button' onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
      </div>
    </main>
  );
}
