import React, { useState } from 'react';
import ExchangeRate from './ExchangeRate';
import axios from 'axios';

const CryptoConverter = () => {

    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA'];
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC');
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC');
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC');
    const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('BTC');
    const [result, setResult] = useState(0);

    console.log(amount);

    const convert = () => {

        const options = {
            method: 'GET',
            url: '',
            params: {
                from_currency: chosenPrimaryCurrency, 
                function: 'CURRENCY_EXCHANGE_RATE', 
                to_currency: chosenSecondaryCurrency
            },
            headers: {
                'x-rapidapi-host': '',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount);
            setPrimaryCurrencyExchanged(chosenPrimaryCurrency);
            setSecondaryCurrencyExchanged(chosenSecondaryCurrency);
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className='currency-converter'>
            <h1>CURRENCY CONVERTOR</h1>

            <div className='input-box'>
                <table style={{ borderCollapse: 'separate', borderSpacing: '10px'}}>
                    <tbody>
                        <tr>
                            <td>Primary Currency: </td>
                            <td>
                                <input 
                                    type="text" 
                                    name="currency-amount-1" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)} 
                                />
                            </td>
                            <td>
                                <select 
                                    name="currency-option-1" 
                                    className='currency-options' 
                                    value={chosenPrimaryCurrency}
                                    onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, index) => (<option key={index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td>Secondary Currency: </td>
                            <td>
                                <input 
                                    name="currency-amount-2" 
                                    value={result}
                                    disabled={true} 
                                />
                            </td>
                            <td>
                                <select 
                                    name="currency-option-2" 
                                    className='currency-options' 
                                    value={chosenSecondaryCurrency}
                                    onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                                >
                                    {currencies.map((currency, index) => (<option key={index}>{currency}</option>))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button className='convert-button' onClick={convert}>CONVERT</button>
            </div>

            <ExchangeRate 
                exchangeRate={exchangeRate}
                chosenPrimaryCurrency={primaryCurrencyExchanged}
                chosenSecondaryCurrency={secondaryCurrencyExchanged}
            />
        </div>
    )
}

export default CryptoConverter;
