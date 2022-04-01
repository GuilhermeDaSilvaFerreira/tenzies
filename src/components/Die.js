import '../styles/Die.css'

export default function Die(props){
    return (
        <span className={`die ${props.isHeld && 'held'}`} onClick={() => { props.hold(props.id) }}>
            {props.value}
        </span>
    )
}