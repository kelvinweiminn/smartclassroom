import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

import { DataService } from '../data.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  data = {};

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  show(input: Event) {
    var command = input.target["checked"];

    if (command) {
      this.dataService.switchToggle(135).subscribe(res => console.log(res));
    } else {
      this.dataService.switchToggle(134).subscribe(res => console.log(res));
    }
  }

  onSubmit(){
    console.log(this.data);
  }

}
