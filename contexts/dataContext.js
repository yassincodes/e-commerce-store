import React, {useState} from "react"

const dataContext = React.createContext()

function DataContextProvider({children}) {
    const [choosenCategorie, setChoosenCategorie] = useState("")
    return (
        <dataContext.Provider value={{choosenCategorie, setChoosenCategorie}}>
            {children}
        </dataContext.Provider>
    )
}

export {DataContextProvider, dataContext}