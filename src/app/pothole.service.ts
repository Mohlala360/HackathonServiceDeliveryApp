import { Injectable } from '@angular/core';
import { PortHole } from './folder/folder.page';

@Injectable({
  providedIn: 'root'
})
export class PotholeService {
  pothHoles: PortHole[];
  constructor() {
    this.pothHoles = [];
  }

  addPothHole(pothhole): void {
    this.pothHoles.push(pothhole);
    console.log(this.pothHoles);
  }

  getPotholes(): any[] {
    return this.pothHoles;
  }
}
