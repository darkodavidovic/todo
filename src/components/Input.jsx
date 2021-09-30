import { useState, useEffect } from 'react'

function Input({ type, name, value, onChange, formError, placeholder, filter, submited, options }) {

    const { autoComplete, label, labelPosition, trim } = options

    const { maxLength, minLength } = filter

    const [error, setError] = useState(false)

    const inputHandlder = (e) => {
        const value = trim ? e.target.value.trim() : e.target.value
        onChange(prev => ({ ...prev, [name]: value }))
    }

    const sendStatus = (status) => {
        if (status === "ok") {
            setError(false)
            formError(prev => ({ ...prev, [name]: true }))
        }
        if (status === "bad") {
            setError(true)
            formError(prev => ({ ...prev, [name]: false }))
        }
    }

    const textCheck = () => {
        if (value.length >= minLength && value.length <= maxLength) {
            sendStatus("ok")
        } else {
            sendStatus("bad")
        }
    }

    const emailCheck = () => {
        const mailformat = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,6})$/;
        if (value.match(mailformat)) {
            sendStatus("ok")
        } else {
            sendStatus("bad")
        }
    }

    const numberCheck = () => {
        if (value.length >= minLength && value.length <= maxLength) {
            value.match(/\D/g, '') && onChange(prev => ({ ...prev, [name]: value.replace(/\D/g, '') }))
            sendStatus("ok")
        } else {
            sendStatus("bad")
        }
    }

    const checkInput = () => {
        switch (type) {
            case "text":
                textCheck()
                break;
            case "password":
                textCheck()
                break;
            case "number":
                numberCheck()
                break;
            case "email":
                emailCheck()
                break;
            case "date":
                textCheck()
                break;
            default:
                break;
        }
    }

    const style = {
        inputWarning: { boxShadow: "inset 0 0 0 1px red" },
        labelWarning: { color: "red" },
        ok: {}
    }

    useEffect(() => {
        submited > 0 && checkInput()
    }, [submited])

    useEffect(() => {
        if (value.length >= 1) {
            checkInput()
        } else {
            formError(prev => ({ ...prev, [name]: false }))
        }
    }, [value])

    return (
        <div className="Input">
            {
                label && labelPosition === "top" && <label style={error ? style.labelWarning : style.ok}>{label}</label>
            }

            <input type={type === "email" ? "text" : type} name={name} placeholder={placeholder} value={value} onChange={inputHandlder} onKeyUp={checkInput} autoComplete={autoComplete ? "" : "new-password"} style={error ? style.inputWarning : style.ok} />

            {
                label && labelPosition === "bottom" && <label style={error ? style.labelWarning : style.ok}>{label}</label>
            }
        </div>
    )
}

export default Input