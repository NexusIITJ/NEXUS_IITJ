export function orbitPosition(angle, radius, inclination = 51.6) {
  const rad = (inclination * Math.PI) / 180

  const x = radius * Math.cos(angle)
  const z = radius * Math.sin(angle)
  const y = radius * Math.sin(rad) * Math.sin(angle)

  return [x, y, z]
}
