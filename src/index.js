import "babel-polyfill";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { validatIp, addtileLayer, addOffset, getAdress } from "./helpers";
import icon from "../images/location-pin-alt-svgrepo-com.png";

const ipInput = document.querySelector(".search-bar__input"),
  btn = document.querySelector("button"),
  ipInfo = document.querySelector("#ip"),
  locationInfo = document.querySelector("#location"),
  timezoneInfo = document.querySelector("#timezone"),
  ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handelKey);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [38, 95],
});
const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
  zoomControl: false,
});
addtileLayer(map);

L.marker([51.5, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
  if (validatIp(ipInput.value)) {
    getAdress(ipInput.value).then(setInfo);
  }
}

function handelKey(e) {
  if (e.key === "Enter") {
    getAdress("46.216.41.201").then(setInfo);
  }
}

function setInfo(mapData) {
  ipInfo.innerText = mapData.ip_address;
  locationInfo.innerText = mapData.city + "," + mapData.region;
  timezoneInfo.innerText = mapData.timezone.current_time;
  ispInfo.innerText = mapData.currency.currency_name;

  map.setView([mapData.latitude, mapData.longitude]);
  L.marker([mapData.latitude, mapData.longitude], { icon: markerIcon }).addTo(
    map
  );

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getData;
});
