import React from "react";

export default class PortfolioListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            portfolio: this.props.portfolio,
            portfolioName: this.props.portfolio.name
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.editPortfolio = this.editPortfolio.bind(this)
        this.cancelEdit = this.cancelEdit.bind(this)
        this.confirmEdit = this.confirmEdit.bind(this)
    }

    editPortfolio() {
        const state = this.state
        state.isEditing = true
        this.setState(state)
    }

    cancelEdit() {
        const state = this.state
        state.isEditing = false
        state.portfolioName = state.portfolio.name
        this.setState(state)
    }

    confirmEdit() {
        const state = this.state
        state.portfolio.name = state.portfolioName
        this.setState(state)
        this.cancelEdit()
    }

    onInputChange(ev) {
        const state = this.state
        state.portfolioName = ev.target.value
        this.setState(state)
    }

    render() {
        if (this.state.isEditing)
            return this.renderEdit()

        let image
        if (this.state.portfolio.image)
            image = (<div><br/><img src={this.state.portfolio.image} alt="portfolio" width='150px' /><br/></div>)

        return (
            <li>
                {image}
                <span>{this.state.portfolioName}</span>
                <input type="button" value="edit" onClick={this.editPortfolio}/>
            </li>
        )
    }

    renderEdit() {
        return (
            <li>
                <input type="text" value={this.state.portfolioName} onInput={this.onInputChange}/>
                <input type="button" value="edit" onClick={this.confirmEdit}/>
                <input type="button" value="cancel" onClick={this.cancelEdit}/>
            </li>
        )
    }
}