document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  const apiKey = "f68bac65c6b5b9c7392d0b4d5f20d507";
  if (input !== '') {
    showWarning("Carregando...")

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${apiKey}&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windDeg: json.wind.deg - 90
      })
    } else {
      clearInfo();
      showWarning("Falha ao buscar temperatura.")
    }
  } else {
    clearInfo();
  }

});

function showInfo(json) {
  showWarning('');

  document.querySelector('.resultado').style.display = "block";
  document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
  document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg}deg)`;

}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
  showWarning('');
  document.querySelector('.resultado').style.display = "none";
}