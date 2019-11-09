import React from 'react';
import css from './card-form.module.css';

export default class CardForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cardNumber: ""
        };
    }

    _getCardType() {
        const number = this.state.cardNumber;
        const firstLetters = number.substr(0, 2);
        switch (firstLetters) {
            case "34":
            case "37":
                return "American Express";
            case "51":
            case "52":
            case "53":
            case "54":
            case "55":
                return "MasterCard";
            
            default:
                if (number.charAt(0) === "4") {
                    return "Visa";
                }
                return undefined;
        }
    }

    _digitSum(number) {
        let sum = 0;

        while (number) {
            sum += number % 10;
            number = Math.floor(number / 10);
        }

        return sum;
    }

    _isValid() {
        const { cardNumber } = this.state;

        let sum = 0;
        for (let i = 0; i < cardNumber.length; i++) {
            const digit = Number(cardNumber.charAt(cardNumber.length - i - 1));
            if (Number.isNaN(digit)) {
                return false;
            }

            if (i % 2 !== 0) {
                sum += this._digitSum(digit * 2);
            } else {
                sum += digit;
            }
        }

        return sum % 10 === 0;
    }

    render() {
        const { cardNumber } = this.state;

        return (
            <div>
                <h2 className={css.title}>Broj kartice</h2>
                <input
                    className={css.title}
                    type="text"
                    value={this.state.cardNumber}
                    onChange={(e) => this.setState({ cardNumber: e.target.value })} />
                
                {cardNumber.length > 10 && 
                    <div> 
                        <div className={css.title}>{ this._isValid() ? "Valid" : "Invalid"}</div>
                        <div >{this._getCardType()}</div>
                    </div>}
            </div>
        )
    }
}
