import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-manual-control',
  templateUrl: './manual-control.component.html',
  styleUrls: ['./manual-control.component.scss']
})
export class ManualControlComponent implements OnInit {

  lightChecked;
  fanChecked;

  constructor(private dataService: DataService) {}

  ngOnInit() {

    this.dataService.getSwitchStatus(1).subscribe(res => {
      console.log('Light Switch Status: ' + res['_body']);
      if (res['_body'] === '8') {
        this.lightChecked = true;
      } else {
        this.lightChecked = false;
      }
    })

    this.dataService.getSwitchStatus(0).subscribe(res => {
      console.log('Fan Switch Status: ' + res['_body']);
      if (res['_body'] === '8') {
        this.fanChecked = true;
      } else {
        this.fanChecked = false;
      }
    })
  }

  toggle(dev, input: Event) {
    const command = input.target['checked'];

    if (command) {
      this.dataService.switchToggle(dev, 135).subscribe(res => console.log(res));
    } else {
      this.dataService.switchToggle(dev, 134).subscribe(res => console.log(res));
    }
  }

}
