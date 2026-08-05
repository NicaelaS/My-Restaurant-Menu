import { useState, useEffect } from 'react'

function DailySpecial() {

  const [special, setSpecial] = useState(null)

  useEffect(() => {

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')

      .then(res => res.json())

      .then(data => setSpecial(data.meals[0]))

  }, [])

  if (!special) return <p>Loading today's special...</p>

  return (

    <div>

      <h3>Today's Special: {special.strMeal}</h3>

      <img src={special.strMealThumb} alt={special.strMeal} width="200" />

    </div>

  )

}


export default DailySpecial