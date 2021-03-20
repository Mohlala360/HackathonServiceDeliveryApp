import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/Home', icon: 'mail' },
 //{ title: 'Payment', url: '/Payment', icon : 'key'},
    //{ title: 'Potholes', url: '/Potholes', icon : 'hole'},
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
