import { createContext, useContext, useEffect, useState } from "react"

const ISSContext = createContext(null)

export function ISSProvider({ children }) {
  const [iss, setIss] = useState(null)

  useEffect(() => {
    const fetchISS = async () => {
      const res = await fetch(
        "https://api.wheretheiss.at/v1/satellites/25544"
      )
      const data = await res.json()

      setIss({
        lat: data.latitude,
        lng: data.longitude,
        alt: data.altitude,
        vel: data.velocity,
      })
    }

    fetchISS()
    const interval = setInterval(fetchISS, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ISSContext.Provider value={iss}>
      {children}
    </ISSContext.Provider>
  )
}

export const useISS = () => useContext(ISSContext)