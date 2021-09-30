
import { TaskContext } from "providers/TaskProvider"
import { useContext } from "react"

const useTaskManager = () => {

    // global task state
    const { tasks, setTasks } = useContext(TaskContext)

    function saveToLocalStorage(data) {
        localStorage.setItem("tasks", JSON.stringify(data ? data : []))
    }

    const taskManager = (task, method) => {
        const exist = task ? tasks.findIndex(element => element.taskID === task.taskID) : false
        let update = [...tasks]

        switch (method) {

            case "addNew":
                if (exist === -1) {
                    const addNew = [...tasks, task]
                    setTasks(addNew)
                    saveToLocalStorage(addNew)
                }
                break;

            case "update":
                if (exist !== -1) {
                    update[exist] = { ...task }
                    setTasks(update)
                    saveToLocalStorage(update)
                }
                break;

            case "delete":
                const filtered = tasks.filter(element => element.taskID !== task.taskID)
                setTasks(filtered)
                saveToLocalStorage(filtered)
                break;

            default:
                break;
        }
    }

    const resetTaskEditor = () =>{

    }

    return { taskManager, resetTaskEditor }
}
export default useTaskManager