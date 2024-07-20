import React, {useEffect, useState} from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



function CurrencyConverter() {
    const [input, setInput] = useState("");
    const [info, setInfo] = useState([]);
    const [options, setOptions] = useState([]);
    const [from, setFrom] = useState("inr");
    const [to, setTo] = useState("usd");
    const [convertvalue, setConvertvalue] = useState("");

    const fetchdata = async() =>{
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`)
        const data = await response.json();
        const currency = data[from];
        setInfo(currency)
    }

    useEffect(()=>{
        fetchdata()
        // eslint-disable-next-line
    },[from])

    useEffect(()=>{
        setOptions(Object.keys(info))
        convert()
        // eslint-disable-next-line 
    },[info])

    const convert = () =>{
        const rate = input*info[to]
        setConvertvalue(rate.toFixed(2))  
    }

    
    const handlereverse =  () => {
        setFrom(to)
        setTo(from)
    }

    return (
        <div id='currency'>
            <h1 className='my-4' style={{textAlign:"center"}}>Currency Converter</h1>
            <div className="amount d-flex my-3">
                <div className="mb-3 mx-2">
                    <label htmlFor="number" className="form-label">Amount</label>
                    <input type="text" style={{height:"42px"}} className="form-control" id="number" aria-describedby="number" value={input} onChange={(e)=>setInput(e.target.value)} />
                        
                </div>
                <div className="mb-3 mx-2">
                    <label htmlFor="from" className="form-label">From</label>
                    <Dropdown options={options} onChange={(e)=>setFrom(e.value)} value={from} placeholder="from" />                  
                </div>

                <i class="fa-solid fa-arrow-right-arrow-left mx-3" style={{position:'relative', top:"45px", cursor:"pointer"}} onClick={()=>handlereverse()}></i>

                <div className="mb-3 mx-2">
                    <label htmlFor="to" className="form-label">To</label>
                    <Dropdown options={options}  onChange={(e)=>setTo(e.value)} value={to} placeholder="to" />
                        
                </div>

            </div>
                <button type="button" className="btn btn-primary my-2"  onClick={()=>convert()}>Convert</button>

            <h2 className='my-4'> Converted Amount:
            {input !== ""  ? <span> {convertvalue} </span> : ""} 
                </h2> 
        </div>
    )
}

export default CurrencyConverter
