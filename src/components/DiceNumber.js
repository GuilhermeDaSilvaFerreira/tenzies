import '../styles/DiceNumber.css'

export default function DiceNumber(props) {
    const classes = `dice-number ${props.isSelected ? 'selected' : ''}`

    return (
        <div className={classes} onClick={() => { props.changeSelectedDiceNumber(props.value) }}>
            {props.value}
        </div>
    )
}