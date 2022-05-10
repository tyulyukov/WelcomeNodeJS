import React from "react";
import PortfolioListItem from "./PortfolioListItem";
import CreatePortfolioListItem from "./CreatePortfolioListItem"

export default class PortfolioList extends React.Component {
    constructor(props) {
        super(props); // Выбов базового конструктора
        this.state = {
            portfolios: [],
            isLoading: false,
            error: null
        }

        this.createPortfolio = this.createPortfolio.bind(this)

        this.localSave = this.localSave.bind(this)
        this.localLoad = this.localLoad.bind(this)
        this.localClear = this.localClear.bind(this)
    }

    localSave(){
        localStorage.setItem('portfolios', JSON.stringify(this.state.portfolios))
    }

    localLoad(){
        const state = this.state

        let json = localStorage.getItem('portfolios')
        console.log(json)

        if(json == null)
            state.portfolios = []
        else
            state.portfolios = JSON.parse(json)

        this.setState(state)
    }

    localClear(){
        localStorage.clear()
    }

    createPortfolio(newPortfolio) {
        newPortfolio.id = Date.now()
        const state = this.state
        state.portfolios.push(newPortfolio)
        this.setState(state)
    }

    render() {
        if (this.state.isLoading === true)
            return this.renderLoading()
        else if (this.state.error != null)
            return this.renderError()

        return (
            <div>
                <h2>Portfolio list</h2>

                <button onClick={this.localSave}> save all </button>
                <button onClick={this.localLoad}> load all </button>
                <button onClick={this.localClear}> clear </button>

                <ul>
                    {this.state.portfolios.map(p => {
                        return <PortfolioListItem portfolio={p} key={'portfolioListItem_' + p.id} />
                    })}
                </ul>

                <CreatePortfolioListItem createPortfolio={this.createPortfolio}/>
            </div>
        )
    }

    renderLoading() {
        return (
            <div>Loading...</div>
        )
    }

    renderError() {
        return (
            <div>Error {this.state.error}</div>
        )
    }
}