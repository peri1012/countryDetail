/*
              <ul class="infoList">
                <li class="infoItem"><span>Adı:</span> Azerbaijan</li>
                <li class="infoItem"><span>Paytaxt:</span> Azerbaijan</li>
                <li class="infoItem"><span>Valyuta:</span> Azerbaijan</li>
                <li class="infoItem"><span>Dil:</span> Azerbaijan</li>
                <li class="infoItem flag">
                  <div class="flagImg">
                    <img
                      src="https://vectorflags.s3.amazonaws.com/flags/az-flag-01.png"
                      alt="flag"
                    />
                  </div>
                </li>
              </ul>
*/

// <option value="azerbaijan">Azerbaijan</option>

let allCountryData=[];

async function getAllData(){
  try {
    let data=await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((allData) => allData);
    allCountryData=[...data];
    mapCountryData();
  } catch (error) {
    console.log("error");
  }
}
getAllData();

const selectBox= document.querySelector(".selectBox");
function mapCountryData(){
  allCountryData.map(country =>{
    selectBox.innerHTML += `
    <option value="${country.name.common}">${country.name.common}</option>
    `
  })
}

selectBox.addEventListener("change", (e) =>{
  getSingleCountryData(e.target.value)
})
let singleCountryData={}
async function getSingleCountryData(countryName){
  try {
    let data=await fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((res) => res.json())
    .then((countryData) => countryData[0]);
    singleCountryData={...data};
    showCountryDetail(singleCountryData);
    console.log(singleCountryData)
  } catch (error) {
    console.log("error");
  }
}

const infoBox=document.querySelector(".infoBox")

function showCountryDetail(){
  const currencyCode = Object.keys(singleCountryData.currencies)[0];
  const currencyName = singleCountryData.currencies[currencyCode].name;
  const languageCode=Object.keys(singleCountryData.languages)[0];
  const languageName=singleCountryData.languages[languageCode];
  console.log(languageName)
  infoBox.innerHTML=`
  <ul class="infoList">
  <li class="infoItem"><span>Adı:</span> ${singleCountryData.name.common}</li>
  <li class="infoItem"><span>Paytaxt:</span>  ${singleCountryData.capital[0]}</li>
  <li class="infoItem"><span>Valyuta: </span>  ${currencyName}</li>
  <li class="infoItem"><span>Dil:</span> ${languageName}</li>
  <li class="infoItem flag">
    <div class="flagImg">
      <img
        src="https://flagsapi.com/${singleCountryData.cca2}/flat/64.png"
        alt="flag"
      />
    </div>
  </li>
  </ul>
  `
}