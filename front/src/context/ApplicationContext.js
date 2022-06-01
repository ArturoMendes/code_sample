const { createContext, useState, useContext } = require("react");

export const AppContext = createContext({
  selectedStation: false,
  setSelectedStation: () => {}
})

export const useAppContext = () => useContext(AppContext)

const ApplicationContext = (props) => {
  const [selectedStation, setSelectedStation] = useState(null)
  
  return (
    <AppContext.Provider value={{selectedStation, setSelectedStation}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ApplicationContext