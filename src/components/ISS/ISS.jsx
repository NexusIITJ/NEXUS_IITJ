import { useEffect, useState } from "react"
import axios from "axios"

const latLngToVector3=(lat, lng, radius)=>{
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  return [
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ]
}

export default function ISS() {
  const [pos, setPos] = useState([0, 0, 0])

  useEffect(() => {
    const fetchISS = async () => {
      const { data } = await axios.get(
        "https://api.wheretheiss.at/v1/satellites/25544"
      )

      const position = latLngToVector3(
        data.latitude,
        data.longitude,
        1.8
      )

      setPos(position)
    }

    fetchISS()
    const interval = setInterval(fetchISS, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.03, 16, 16]} />
      <meshBasicMaterial color="cyan" />
    </mesh>
  )
}
