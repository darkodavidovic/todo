import { useEffect, useRef } from 'react'
import useToaster from 'hooks/useToaster'
import "styles/Toaster.scss"

import { FaCheckCircle } from 'react-icons/fa';
import { BsFillExclamationCircleFill, BsXCircleFill } from 'react-icons/bs';
import { MdInfo } from 'react-icons/md';

function Toaster({ toast }) {

    const { id, type, title, message, expire } = toast

    const { removeToast } = useToaster()

    const toasterRef = useRef()
    const messageRef = useRef()

    function setToast() {
        toasterRef.current.classList.add(type)
    }

    function startToast() {
        setTimeout(() => {
            toasterRef.current.classList.add("animate")
            toasterRef.current && (messageRef.current.innerText = message)
        }, 20);
    }


    function startMessage() {
        setTimeout(() => {
            // toasterRef.current && (messageRef.current.innerText = message)
        }, (expire * 1000) - (expire * 1000 - 300));
    }

    function removeOppacity() {
        setTimeout(() => {
            toasterRef.current && toasterRef.current.classList.remove("animate")
        }, expire * 1000);
    }

    function hideToast() {
        setTimeout(() => {
            removeToast(id)
        }, (expire * 1000) + 500);
    }

    const hoverHandler = () => {
    }

    useEffect(() => {
        setToast()
        startToast()
        startMessage()
        removeOppacity()
        hideToast()
        // eslint-disable-next-line
    }, [])


    return (
        <div className="Toaster" ref={toasterRef} >

            {type === "success" && <FaCheckCircle className="icon" />}
            {type === "error" && <BsXCircleFill className="icon" />}
            {type === "warning" && <BsFillExclamationCircleFill className="icon" />}
            {type === "notice" && <MdInfo className="icon" />}

            <span className="title">{title ? title : type + "!"}</span>
            <span className="message" ref={messageRef} onMouseOver={hoverHandler}></span>
            <span className="close" onClick={() => removeToast(id)}>x</span>
        </div>
    )
}

export default Toaster
