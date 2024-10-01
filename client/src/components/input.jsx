    /*
    import { useState, useRef} from "react"

    function UseRfFun(){
        const [show , setShow] = useState(false);
        function handleshow(event){
            if(event.key === 'Enter'){
                setShow(true)
            }
        }
        const input = useRef()
        return(
            <>
                 <h1>Test: {input.current?.value}</h1>

                <h1>Test: {show && input.current.value}</h1>
                <input type="text" style={{border: '3px solid black'}} ref={input} onKeyDown={handleshow}/>
            </>
        )
    }

    export default function FunctionInput(){
    const [form, setForm] = useState({
        name: '',
        password: '',
        hasError: true,
        option: 'Good'
    })
    //const [name, setname] =  useState('');
    //const [password, setpassword] =  useState('');
    //const [option, setoption] =  useState('Good');
    //const [hasError, setHasError] =  useState(true);


    function handlNameChange (event){
        setForm({
            name: event.target.value,
            hasError: event.target.value.trim().length === 0

        })
        //setname(event.target.value)
        //setHasError(event.target.value.trim().length === 0)

    }
    function handlPasswordChange (event){
        setForm((...prev) =>({
            ...prev,
            password: event.target.value,
            hasError: event.target.value.trim().length === 0

        }))
    }
    function handleOptionChange(event) {
        setForm(prevForm => ({
        ...prevForm,
        option: event.target.value
        }));
    }
        return(
            <section>
                <form>
                    <label htmlFor="name">Your name</label>
                    <input  type="text" id="name" value={form.name} onChange={handlNameChange} style={{
                        border: form.hasError ? '1px solid red' : null
                    }}/>

                    <label htmlFor="password">Your password</label>
                    <input  type="password" id="password" value={form.password} onChange={handlPasswordChange} style={{
                        border: form.hasError ? '1px solid red' : null
                    }}/>

                    <label htmlFor="options">Your options</label>
                    <select id="options" value={form.option} onChange={handleOptionChange}>
                        <option value="Error"> Error</option>
                        <option value="Good"> Good</option>
                        <option value="Very Good"> Very Good</option>
                    </select>
                    <pre>
        Names: {form.name}
        <br />
        Passwords: {form.password}
        <br />
        option: {form.option}
    </pre>
                </form>
                <UseRfFun /> 
            </section>
        )
    }
*/