import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from '../data.service';

import { AutoControlComponent } from './auto-control/auto-control.component';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  mode = '';


  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getMode().subscribe( (res) => {
      this.mode = res[0].mode;
      console.log("The actuation is " + this.mode);
    }
    )
  }

  onClick(mode) {
    this.dataService.changeMode(mode).subscribe((res) => {
      this.mode = mode;
      console.log(res)
    });
  }
}
