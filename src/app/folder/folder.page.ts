import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PotholeService } from '../pothole.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public portHole: PortHole;
  url: any;
  islooaded: boolean;
  provinces: any[];
  provinceCities: any[];
  cityManucipalities: any[];

  public provs = [
    { id: 1, name: 'Gauteng' },
    { id: 2, name: 'Limpopo' },
    { id: 3, name: 'Mpumalanga' }
  ];

  public cities = [
    { id: 1, name: 'city of tshwane', provinceId: 1 },
    { id: 2, name: 'city of joburg', provinceId: 1 },
    { id: 3, name: 'city of ekhuruleni', provinceId: 1 },
    { id: 4, name: 'nkangala district', provinceId: 3 },
    { id: 5, name: 'nelspruit district', provinceId: 3 },
    { id: 6, name: 'siyabuswa district', provinceId: 3 },
    { id: 7, name: 'sekhukhune district', provinceId: 2 },
    { id: 8, name: 'capricon district', provinceId: 2 },
    { id: 9, name: 'ledwaba district', provinceId: 2 },
  ];

  public manucipalities = [
    //gauteng
    { id: 1, name: 'mamelodi mmanucipality', cityId: 1 },
    { id: 2, name: 'mabopane mmanucipality', cityId: 1 },
    { id: 3, name: 'tembisa mmanucipality', cityId: 3 },
    { id: 4, name: 'midrand mmanucipality', cityId: 3 },
    { id: 5, name: 'soweto mmanucipality', cityId: 2 },
    { id: 6, name: 'alexandra mmanucipality', cityId: 2 },
    //limpopo
    { id: 7, name: 'tubatse mmanucipality', cityId: 7 },
    { id: 8, name: 'fetakgomo mmanucipality', cityId: 7 },
    { id: 9, name: 'polokwane mmanucipality', cityId: 8 },
    { id: 10, name: 'seshego mmanucipality', cityId: 8 },
    { id: 11, name: 'moletjie mmanucipality', cityId: 9 },
    { id: 12, name: 'mphahlele mmanucipality', cityId: 9 },
    //mpumalanga
    { id: 13, name: 'emalahleni mmanucipality', cityId: 4 },
    { id: 14, name: 'meddleburg mmanucipality', cityId: 4 },
    { id: 15, name: 'kanyamazane mmanucipality', cityId: 5 },
    { id: 16, name: 'emerlo mmanucipality', cityId: 5 },
    { id: 17, name: 'ramokgaletsane mmanucipality', cityId: 6 },
    { id: 18, name: 'kwaMhlanga mmanucipality', cityId: 6 },
  ];

  constructor(private activatedRoute: ActivatedRoute, private pothHoleService: PotholeService) {
    this.islooaded = false;
    this.provinces = [];
    this.provinceCities = [];
    this.cityManucipalities = [];
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.portHole = new PortHole();
    this.portHole.location = new Location();
    this.loadProvinces();
  }

  submit(): void {
    console.log(this.portHole);
    var today = new Date();
    this.portHole.date = ` ${today.getDay()}/ ${today.getMonth()} / ${today.getFullYear()}`;
    this.portHole.refNumber = 'ref' + Date.now();
    this.pothHoleService.addPothHole(this.portHole);
    this.islooaded = true;
  }

  onFileChanged(event) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      //console.log(this.url);
      this.portHole.pictureContent = reader.result;
    }

    var filename = new Date().getTime() + '.' + files[0].name.split(".")[1];
    var imgFile = new File([files[0]], filename, { type: files[0].type });
    var file_data = imgFile;
    this.portHole.picture = file_data;
  }

  loadProvinces(): void {
    this.provinces = this.provs;
    console.log('this is a list of provinces', this.provinces);
  }

  provinceSelected(event: any): void {
    console.log('this is the selected province', event);
    const provinceId = event.detail.value;
    this.loadProvinceCities(provinceId);
    //this.portHole.location.province = this.provs.filter(prov => prov.id == provinceId)[0]?.name;
    console.log(document.getElementById('provinceNameId'));
  }

  loadProvinceCities(provinceId: number): void {
    var results = [];
    console.log('length before', this.provinceCities.length);
    results = this.cities.filter(city => city.provinceId == provinceId);
    this.provinceCities = results;
    console.log('length after', this.provinceCities.length);
    console.log('this is the ciiy of selected province', this.provinceCities);
  }

  provinceCitySelected(event: any): void {
    console.log('this is the selected province', event.detail.value);
    const provinceCityId = event.detail.value;
    this.loadCityManucipalities(provinceCityId);
  }

  loadCityManucipalities(cityId: number): void {
    var results = [];
    console.log('length before', this.provinceCities.length);
    results = this.manucipalities.filter(manucipal => manucipal.cityId == cityId);
    this.cityManucipalities = results;
    console.log('length after', this.cityManucipalities.length);
    console.log('this is the manucipality of selected city', this.cityManucipalities);
  }

  cityManucipalitySelected(event: any) {
    console.log('this is the selected manucipality', event.detail.value);
    const cityManucipalityId = event.detail.value;
    //this.portHole.location.manucipality = this.manucipalities.filter(prov => prov.id == cityManucipalityId)[0]?.name;
  }

  getProvinceNamebyId(provinceId: number): string {
    return this.provinces.filter(province => province.id == provinceId)[0].name;
  }

  getManucipalityNamebyId(manucipalityId: number): string {
    return this.manucipalities.filter(manucipality => manucipality.id == manucipalityId)[0].name;
  }

  getCityNamebyId(cityId: number): string {
    return this.cities.filter(city => city.id == cityId)[0].name;
  }
}

export class PortHole {
  fullnames: string = '';
  cellnumber: string = '';
  issueType: string = '';
  location: Location;
  picture: any = null;
  pictureContent: any;
  date: any;
  refNumber: string = '';
  roadType: string = '';
}

export class Location {
  province: string = '';
  city: string = '';
  manucipality: string = '';
  lactionName: string = '';
}