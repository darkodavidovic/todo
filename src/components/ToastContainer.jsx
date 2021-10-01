import { useContext } from 'react'
import Toaster from './Toaster'
import { ToasterContext } from 'providers/ToasterProvider'
import "styles/ToastContainer.scss"

function ToastContainer() {

    const { toaster } = useContext(ToasterContext)

    return (
        <div className="ToastContainer">

            <div className="tc">
                {
                    toaster.filter(el => el.position === "top-center").map((toast) => (
                        <Toaster key={toast.id} toast={toast} />
                    ))
                }
            </div>

            <div className="tr">
                {
                    toaster.filter(el => el.position === "top-right").map((toast) => (
                        <Toaster key={toast.id} toast={toast} />
                    ))
                }
            </div>


            <div className="cc">
                {
                    toaster.filter(el => el.position === "center-center").map((toast) => (
                        <Toaster key={toast.id} toast={toast} />
                    ))
                }
            </div>


        </div>
    )
}

export default ToastContainer
