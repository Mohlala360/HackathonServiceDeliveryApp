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
  islooaded:boolean;
  constructor(private activatedRoute: ActivatedRoute, private pothHoleService: PotholeService) { 
    this.islooaded = false;
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.portHole = new PortHole();
  }

  submit(): void {
    console.log(this.portHole);
    var today = new Date();
    this.portHole.date =` ${today.getDay()}/ ${today.getMonth()} / ${today.getFullYear()}`;
    this.portHole.refNumber = 'ref'+ Date.now();
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
      console.log(this.url);
      this.portHole.pictureContent = reader.result;
    }

    var filename = new Date().getTime() + '.' + files[0].name.split(".")[1];
    var imgFile = new File([files[0]], filename, { type: files[0].type });
    var file_data = imgFile;
    this.portHole.picture = file_data;
  }
}

export class PortHole {
  fullnames: string = '';
  cellnumber: string = '';
  issueType: string = '';
  location: string = '';
  picture: any = null;
  pictureContent: any;
  date : any;
  refNumber : string = '';
}