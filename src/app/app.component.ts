import { Component,OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference,AngularFireUploadTask} from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 ref:AngularFireStorageReference;
 task:AngularFireUploadTask;
 uploadProgress:Observable<number>
 downloadURL:Observable<string>
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public origin:any;
  public destination:any;
  constructor(private afStorage: AngularFireStorage ,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone){}
  upload(event)
  {
    const id=Math.random().toString(36).substring(2);
    this.ref=this.afStorage.ref(id);
    this.task=this.ref.put(event.target.files[0])
    this.uploadProgress=this.task.percentageChanges();
    
   
  }
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let pickUp = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      pickUp.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = pickUp.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    
   this.getDirection();
  }
  getDirection() {
    this.origin = { lat: 24.8024, lng: 67.0298 };
    this.destination = { lat: 24.8237, lng: 67.0358 };
   
    
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }
  getURL(){
   // this.downloadURL=this.ref.getDownloadURL();
      console.log("here");
  }
}
