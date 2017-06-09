import React from "react"
import { uitleg, repeat } from "../lib/helpers"
import autobind from "autobind-decorator"
import classnames from "classnames"

const currencyFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
})

const digitFormatter = new Intl.NumberFormat("nl-NL", {
  maximumFractionDigits: 0
})

const units = {
    huizen: { name: "Huizen", fraction: 250000 },
    boeing: { name: "Boeing 747's", fraction: 180000000 },
    null: { name: "Geld", fraction: 1 },
    koeien: { name: "Koeien", fraction: 1000 },
    koffie: { name: "Kopjes koffie", fraction: 2.5 }
}

export default class Category extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            unit: null
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.forceUpdate(), 100)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    @autobind
    toggle(unit) {
        this.setState({ unit })
    }

    render() {
        const { data, inwoners } = this.props
        
        const now = new Date()
        const startYear = new Date(now.getFullYear(), 0, 1)
        const endYear = new Date(now.getFullYear(), 11, 31)

        const fraction = (now.getTime() - startYear.getTime()) / (endYear.getTime() - startYear.getTime())

        const current = fraction * data.bedrag

        let content

        switch (this.state.unit) {
            case "boeing":
                content = (
                    <div className="category__graphic">
                        <div>
                            <h1>{digitFormatter.format(current / units[this.state.unit].fraction )} ✈️</h1>
                            <h2>{digitFormatter.format(data.bedrag / units[this.state.unit].fraction )} ✈</h2>
                            <h3>voor heel 2017<br />en {digitFormatter.format(data.bedrag / units[this.state.unit].fraction / inwoners)} per inwoner</h3>
                        </div>
                    </div>
                )
                break
            case "huizen":
                content = (
                    <div className="category__graphic">
                        <div>
                            <h1>{digitFormatter.format(current / units[this.state.unit].fraction )} 🏠</h1>
                            <h2>{digitFormatter.format(data.bedrag / units[this.state.unit].fraction )} 🏠</h2>
                            <h3>voor heel 2017<br />en {digitFormatter.format(data.bedrag / units[this.state.unit].fraction / inwoners)} per inwoner</h3>
                        </div>
                    </div>
                )
                break
            case "koeien":
                content = (
                    <div className="category__graphic">
                        <div>
                            <h1>{digitFormatter.format(current / units[this.state.unit].fraction )} 🐄</h1>
                            <h2>{digitFormatter.format(data.bedrag / units[this.state.unit].fraction )} 🐄</h2>
                            <h3>voor heel 2017<br />en {digitFormatter.format(data.bedrag / units[this.state.unit].fraction / inwoners)} per inwoner</h3>
                        </div>
                    </div>
                )
                break
            case "koffie":
                content = (
                    <div className="category__graphic">
                        <div>
                            <h1>{digitFormatter.format(current / units[this.state.unit].fraction )} ☕</h1>
                            <h2>{digitFormatter.format(data.bedrag / units[this.state.unit].fraction )} ☕</h2>
                            <h3>voor heel 2017<br />en {digitFormatter.format(data.bedrag / units[this.state.unit].fraction / inwoners)} per inwoner</h3>
                        </div>
                    </div>
                )
                break
            default:
                content = (
                    <div className="category__graphic">
                        <div>
                            <h1>{currencyFormatter.format(current)}</h1>
                            <h2>{currencyFormatter.format(data.bedrag)}</h2>
                            <h3>voor heel 2017<br />en {currencyFormatter.format(data.bedrag / inwoners)} per inwoner</h3>
                        </div>
                    </div>
                )
        }

        let selected
        if (this.state.unit) {
            selected = (
                <div className={classnames({"units__unit":true, "___is-selected": true})} onClick={(e) => this.toggle(this.state.unit)}>{units[this.state.unit].name}</div>
            )
        }

        let notSelected = []
        Object.keys(units).forEach((unit, i) => {
            if (unit === this.state.unit) {
                return false
            }

            notSelected.push((
                <div key={i} className="units__unit" onClick={(e) => this.toggle(unit)}>{units[unit].name}</div>
            ))
        })

        return (
            <div className={classnames({"category": true, "___is-active": this.props.isActive})}>
                <div className="category__info">
                    <h2>{data.gemeente}</h2>
                    <h1>{data.post}</h1>
                    <p>{uitleg[data.post]}</p>

                    {content}
                </div>
                <div className="category__units">
                    Hoeveel is dat in&nbsp;<div className="units">
                        {selected}
                        {notSelected}
                    </div>
                    ?
                </div>
            </div>
        )
    }
}