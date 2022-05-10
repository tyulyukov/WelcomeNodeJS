import React from "react";

export default class PortfolioListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            portfolio: {}
        }

        this.changeVisibility = this.changeVisibility.bind(this)
        this.createPortfolio = this.createPortfolio.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.onUploadFile = this.onUploadFile.bind(this)
        this.saveDataFile = this.saveDataFile.bind(this)
    }

    changeVisibility() {
        const state = this.state
        state.isVisible = !state.isVisible
        this.setState(state)
    }

    onInputChange(ev) {
        const state = this.state
        state.portfolio["name"] = ev.target.value
        this.setState(state)
    }

    saveDataFile(data){
        const state = this.state
        state.portfolio["image"] = data
        this.setState(state)
    }

    onUploadFile(ev){
        if(FileReader){
            let fileReader = new FileReader()
            const save = this.saveDataFile
            fileReader.onload = function () {
                save(fileReader.result)
            }
            fileReader.onerror = function (err) {
                console.log(err)
            }
            fileReader.readAsDataURL(ev.target.files[0])
        }
    }

    createPortfolio() {
        const formData  = new FormData()
        formData.append('name', this.state.portfolio.name)
        formData.append('image', document.forms[0].elements["image"].files[0])

        fetch('http://localhost:3000/api/portfolios', {
            method: "POST",
            mode: 'cors',
            cache: 'no-cache',
            body: formData
        })
            .then(res => {
                console.log(res)

                this.props.createPortfolio(this.state.portfolio)
                const state = this.state
                state.isVisible = false
                state.portfolio = {}
                this.setState(state)
            })
            .catch(err => console.error(err))
    }

    render() {
        if (this.state.isVisible === false)
            return (
                <button onClick={this.changeVisibility}>show...</button>
            )

        let image
        if (this.state.portfolio.image)
            image = (<img src={this.state.portfolio.image} alt="portfolio" width='150px' />)
        else
            image = (<div> No Img </div>)

        return (
            <div>
                <form>
                    {image}
                    <input type="text" onInput={this.onInputChange}/>
                    <input name="image" type="file" accept=".jpg, .png, .jpeg, .bmp, .tif, .tiff|image/*" onChange={this.onUploadFile}/>
                    <input type="button" value="create" onClick={this.createPortfolio}/>
                </form>

                <button onClick={this.changeVisibility}>hide</button>
            </div>
        )
    }
}