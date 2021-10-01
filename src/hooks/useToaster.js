import { useContext } from 'react'
import { ToasterContext } from 'providers/ToasterProvider'
import uniqid from 'uniqid'

function useToaster() {

    const {setToaster} = useContext(ToasterContext)

    function showToast(options) {
        setToaster(prev => [...prev, { ...options, id: uniqid() }])
    }

    function removeToast(id) {
        setToaster(prev => prev.filter(toast => toast.id !== id))
    }

    return { showToast, removeToast }
}

export default useToaster
