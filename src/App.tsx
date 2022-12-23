import React from 'react';
import axios from "axios";
import { useState } from "react";
import { FiArrowLeft, FiMapPin, FiDroplet } from "react-icons/fi";
import "./styles/App.scss";

type UserLocal = string;

function App() {
  const [userLocal, setUserLocal] = useState<UserLocal>();

  async function handleGetWeather() {
    const url = `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${userLocal}&aqi=no&lang=pt`;
    await axios
      .get(url)
      .then(async (res) => {
        
        const main = document.querySelector(".page2__main");
        const mainImg = main?.querySelector(".main__img")
        const mainH1 = main?.querySelector(".main__temperature")
        const mainWeather = main?.querySelector(".main__weather")
        const mainLocal = main?.querySelector(".main__local span")
        const mainHumidity = main?.querySelector(".main__humidity span")
        
        mainImg?.removeAttribute("src")
        mainImg?.setAttribute("src", `https:${res.data.current.condition.icon}`)

        if(mainH1) mainH1.innerHTML = `${res.data.current.temp_c}ºC`
        if(mainWeather) mainWeather.innerHTML = res.data.current.condition.text
        if(mainLocal) mainLocal.innerHTML = `${res.data.location.name}, ${res.data.location.country}`
        if(mainHumidity) mainHumidity.innerHTML = `${res.data.current.humidity}`     

        toggleScreens();

        const input = document.querySelector("input");
        if(input) input.value = "";

        setUserLocal("")
      })
      .catch((e) => alert("Não foi possível encontrar o clima desse local."));
  }

  function toggleScreens() {
    const page1 = document.querySelector(".wrapper__page1");
    const page2 = document.querySelector(".wrapper__page2");

    page1?.classList.toggle("off");
    page2?.classList.toggle("off");
  }

  return (
    <div className="wrapper">
      <div className="wrapper__page1">
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

      <div className="wrapper__page2 off">
        <header className="page2__header">
          <FiArrowLeft onClick={toggleScreens} />
          <span onClick={toggleScreens}>Voltar para o início</span>
        </header>
        <main className="page2__main">
          <img src='' alt="ícone do clima" className="main__img"/>
          <h1 className="main__temperature">20ºC</h1>
          <span className="main__weather">Nublado</span>
          <span className="main__local"><FiMapPin /> <span>São Paulo, Brazil</span></span>
          <span className="main__humidity"><FiDroplet /> Umidade: <span>50</span>%</span>
        </main>
      </div>
    </div>
  );
}

export default App;
