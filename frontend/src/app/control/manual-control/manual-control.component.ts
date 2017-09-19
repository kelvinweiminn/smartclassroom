import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-manual-control',
  templateUrl: './manual-control.component.html',
  styleUrls: ['./manual-control.component.scss']
})
export class ManualControlComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  toggle(dev, input: Event) {
    var command = input.target["checked"];

    if (command) {
      this.dataService.switchToggle(dev, 135).subscribe(res => console.log(res));
    } else {
      this.dataService.switchToggle(dev, 134).subscribe(res => console.log(res));
    }
  }

}
