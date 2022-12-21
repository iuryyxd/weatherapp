import axios from "axios";
import { useState } from "react";
import { FiArrowLeft, FiMapPin, FiDroplet } from 'react-icons/fi'
import "./styles/App.scss";

function App() {
  const [userLocal, setUserLocal] = useState();

  async function handleGetWeather() {
  
    const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${userLocal}&aqi=no&lang=pt`;
    await axios
      .get(url)
      .then(async (res) => {
        
        toggleScreens()

        const input = document.querySelector("input")
        input.value = ""

        const main = document.querySelector(".page2__main")

        main.innerHTML = `
        <img src='https:${res.data.current.condition.icon}' alt="ícone do clima"/>
        <h1>${res.data.current.temp_c}ºC</h1>
        <span>${res.data.current.condition.text}</span>
        <span><FiMapPin /> ${res.data.location.name}, ${res.data.location.country}</span>
        <span><FiDroplet /> Humidade: ${res.data.current.humidity}%</span>
        `
      })
      .catch((e) => alert("Não foi possível encontrar o clima desse local."));
  }

  function toggleScreens() {
    const page1 = document.querySelector(".wrapper__page1")
    const page2 = document.querySelector(".wrapper__page2")

    page1?.classList.toggle("off")
    page2?.classList.toggle("off")
  }

  return (
    <div className="wrapper">
      <div className="wrapper__page1 off">
        <header className="page1__header">
          <img
            src="https://i.pinimg.com/originals/06/c4/f7/06c4f70ec5931e2342e703e8a3f0a253.png"
            alt="imagem uma nuvem com um sol"
          />
          <h1>Weather App</h1>
        </header>
        <form action="dialog" className="page1__form" name="form">
          <input
            type="text"
            placeholder="Digite o nome da sua cidade"
            onChange={(e) => setUserLocal(e.target.value)}
          />
          <button form="form" onClick={handleGetWeather}>
            Buscar clima
          </button>
        </form>
      </div>

      <div className="wrapper__page2">
        <header className="page2__header">
          <FiArrowLeft onClick={toggleScreens}/>
          <span onClick={toggleScreens}>Voltar para o início</span>
        </header>
        <main className="page2__main">

        </main>
      </div>
    </div>
  );
}

export default App;
