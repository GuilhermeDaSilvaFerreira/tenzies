import '../styles/Die.css'

export default function Die(props) {
    function getDice() {
        switch (props.value) {
            case 1:
                return (
                    <div className={`first-face die ${props.isHeld && 'held'}`} onClick={() => { props.hold(props.id) }}>
                        <span class="dot">
                        </span>
                    </div>
                )
            case 2:
                return (
                    <div className={`second-face die ${props.isHeld && 'held'}`} onClick={() => { props.hold(props.id) }}>
                        <span class="dot">
                        </span>
                        <span class="dot">
                        </span>
                    </div>
                )
            case 3:
                return (
                    <div className={`third-face die ${props.isHeld && 'held'}`} onClick={() => { props.hold(props.id) }}>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                )
            case 4:
                return (
                    <div className={`fourth-face die ${props.isHeld && 'held'}`} onClick={() => { props.hold(props.id) }}>
                        <div class="column">
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                        <div class="column">
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                )
            case 5:
                return (
                    <div className={`fifth-face die ${props.isHeld && 'held'}`} onClick={() => { props.hold(props.id) }}>
                        <div class="column">
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>

                        <div class="column">
                            <span class="dot"></span>
                        </div>

                        <div class="column">
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                )
            case 6:
                return (
                    <div className={`sixth-face die ${props.isHeld && 'held'}`} onClick={() => { props.hold(props.id) }}>
                        <div class="column">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                        <div class="column">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                )
            default:
                break

        }
    }

    return (
        getDice()
    )
}