import React,  { Component } from 'react';

class Translate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            translatedText: '',
            textToTranslate: ''
        };
    }

    render() {
        return(
            <div>
                <input type="text" name="text-to-translate" value={ this.state.textToTranslate } onChange={(e) => this.setTextToTranslate(e)} />
                <button type="button" onClick={(e) => this.translateText(this.state.textToTranslate) }>Translate it!</button>
                <hr />
                <p>{ this.state.translatedText }</p>
            </div>
        );
    }

    setTextToTranslate = (e) => {
        return this.setState({
            textToTranslate: e.target.value
        });
    };

    translateText = (textToTranslate) => {
        fetch('http://localhost:9000/translate', {
			method: 'POST',
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				text: textToTranslate,
				to: 'en'
			})
		})
		.then((response) => response.json())
		.then((data) => {
			this.setState({
				translatedText: data.text
			})
		});
    };
}

export default Translate;