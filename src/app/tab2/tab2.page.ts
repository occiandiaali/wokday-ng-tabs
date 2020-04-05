import { Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, icon } from 'leaflet';
// import { ModalController }

// import "../../assets/icon/marker-icon-2x.png";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  map: Map;
  category: string;
  workerList = [];
  userIcon = icon({
    iconUrl: '../../assets/icon/marker-icon-2x.png',
    iconSize: [32, 35],
    // iconAnchor: [22, 84],
    // popupAnchor: [25, -18]
  });
  workerIcon = icon({
    iconUrl: '../../assets/icon/marker.png',
    iconSize: [32, 35]
  });
  count = 0;

  constructor() { }

  // showSelectedCategory() {
  //   console.log(`Selected: ${this.category}`);
  // }

  ionViewDidEnter() {
    this.mainMap();
  }

  mainMap() {
    this.map = new Map('mapid').setView([6.6875, 3.4157], 14);
    tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // tslint:disable-next-line:max-line-length
        attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      }
    ).addTo(this.map);

    marker([6.6875, 3.4157], { icon: this.userIcon }).addTo(this.map)
      .bindPopup('<b>You are here</b><br> More info..')
      .openPopup();
  } // main map

  // called on ion select FIND
  showSelected() {
    console.log(`Selection is: ${this.category}`);
    fetch('../../assets/data.json')
      .then(res => res.json())
      .then(json => {
        this.workerList = json.werkers;
        if (marker !== null) {
          // tslint:disable-next-line:no-shadowed-variable
          this.map.eachLayer(marker => {
            this.map.removeLayer(marker);
          });
        } // if block

        for (const werk of this.workerList) {
          this.count++;
          if (this.category === werk.skill) {
            console.log(`Found ${this.count} ${werk.skill}(s)`);
            // add attribution again to render tile??
            tileLayer(
              'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              {
                // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // tslint:disable-next-line:max-line-length
                attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
              }
            ).addTo(this.map);
            // and AGAIN (DRY) add user marker??
            marker([6.6875, 3.4157], { icon: this.userIcon }).addTo(this.map)
              .bindPopup('<b>You are here</b><br> More info..')
              .openPopup();
            // worker marker
            marker([werk.location.lat, werk.location.long], { icon: this.workerIcon })
              .addTo(this.map)
              .bindPopup(
                `<img src="${werk.imageUrl}"/><br/>
              <b>${werk.name}</b>
              `
              )
              .openPopup();
          }
        }
      });
  } // show selected


  ionViewWillLeave() {
    this.map.remove();
  }

} // class
