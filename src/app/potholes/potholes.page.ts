import { Component, OnInit } from '@angular/core';
import { PortHole } from '../folder/folder.page';
import { AlertController } from '@ionic/angular';
import { PotholeService } from '../pothole.service';

@Component({
  selector: 'app-potholes',
  templateUrl: './potholes.page.html',
  styleUrls: ['./potholes.page.scss'],
})
export class PotholesPage implements OnInit {
  potholes: PortHole[];
  pothole: any;
  approved: boolean;
  declined: boolean;
  suppliers: any[];
  selectedSupplier: any;
  mustNotSubmit: boolean;

  constructor(public alertController: AlertController, private potholeService: PotholeService) {
    this.mustNotSubmit = false;
  }

  ngOnInit() {
    this.potholes = this.potholeService.getPotholes();
    console.log(this.potholes);
    this.approved = false;
    this.declined = false;
    this.suppliers = [{
      name: 'Gamakgara',
      location: { province: 'Gauteng', city: 'city of tshwane' },
      account: '12312321231',
    }, {
      name: 'Fix it ',
      location: { province: 'Limpopo', city: 'capricon dristrict' },
      account: '12775456755231',
    }, {
      name: 'DrJs',
      location: { province: 'Mpumalanga', city: 'nkangala district' },
      account: '10919734642',
    }
    ];
    this.selectedSupplier =
    {
      name: '',
      location: '',
      account: '',
    }
  }

  async presentAlertPrompt(event) {
    this.pothole = event;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Action!',
      inputs: [
        {
          type: 'text',
          value: `name : ${event.fullnames} cell : ${event.cellnumber}`,
        },
        {
          value: `reported : ${event.issueType}`,
          type: 'text',
        },
        {
          value: `province : ${event.location.province}`,
          type: 'text',
        },
        {
          value: `city : ${event.location.city}`,
          type: 'text',
        },
        {
          value: `manucipality : ${event.location.manucipality}`,
          type: 'text',
        }
      ],
      message: `<img src=${event.pictureContent} style="height: 250px;">`,
      buttons: [
        {
          text: 'Approve',
          role: 'approve',
          cssClass: 'secondary',
          handler: (click) => {
            console.log('Confirm Cancel');
            this.approved = true;
            this.declined = false;
          }
        }, {
          text: 'Decline',
          handler: () => {
            console.log('Confirm Ok');
            this.approved = false;
            this.declined = true;
          }
        }
      ]
    });

    await alert.present();
  }

  onChange(): void {
    this.mustNotSubmit = false;
    if (this.pothole.location.province !== this.selectedSupplier.location.province) {
      this.mustNotSubmit = true;
      alert("supplier out of the issue province");
      return;
    }
  }

  submit(action): void {
    if (action == "approved") {
      alert("supplier successfuly selected");
    } else if (action == "declined") {
      alert("message sent to ");
    }
  }
}


