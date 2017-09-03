import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batteries',
  templateUrl: './batteries.component.html',
  styleUrls: ['./batteries.component.scss']
})
export class BatteriesComponent implements OnInit {

  retrievedData;

  constructor(private dataService: DataService){
  }

  ngOnInit() {
    this.retrieveBatteryLevel('2102CB', 'IIT1659TempHumi');
    this.retrieveBatteryLevel('20FE30', 'IIT1659Light');

    this.retrieveBatteryLevel('210043', 'IIT1660TempHumi');
    this.retrieveBatteryLevel('210088', 'IIT1660Light');

    this.retrieveBatteryLevel('21034E', 'IIT1661TempHumi');
    this.retrieveBatteryLevel('20FD79', 'IIT1661Light');

    this.retrieveBatteryLevel('2100AB', 'IIT3746TempHumi');
    this.retrieveBatteryLevel('2101E9', 'IIT3746Light');

    this.retrieveBatteryLevel('210285', 'IIT37502TempHumi');
    this.retrieveBatteryLevel('2102AC', 'IIT37502Light');

    this.retrieveBatteryLevel('1CB001', 'IIT3832TempHumi');
    this.retrieveBatteryLevel('1CB0C2', 'IIT3832Light');

    this.retrieveBatteryLevel('1CB00D', 'IoTLabTempHumi');
    this.retrieveBatteryLevel('1CB0D4', 'IoTLabLight');

    this.retrieveBatteryLevel('1CB049', 'BigDataTempHumi');
    this.retrieveBatteryLevel('1CB021', 'BigDataLight');

    // this.retrieveBatteryLevel();

  }

// Function to Retrieve Battery Level
  retrieveBatteryLevel(DeviceID:string, device:string){ //

    this.dataService.getBatteryLevel(DeviceID).subscribe(response => {//

      this.retrievedData = response;
      console.log(this.retrievedData);

      for(var item of response){
        document.getElementById(device).innerHTML = item.Value + "%";
      }

      if(parseInt(item.Value) > 20){
        document.getElementById(device + "Status").className = "badge badge-success";
        document.getElementById(device + "Status").innerHTML = "Active";
      } else if (parseInt(item.Value) >= 10){
        document.getElementById(device + "Status").className = "badge badge-warning";
        document.getElementById(device + "Status").innerHTML = "Low Battery";
      } else {
        document.getElementById(device + "Status").className = "badge badge-danger";
        document.getElementById(device + "Status").innerHTML = "Inactive";
      }
      
      
      
    });
  }

}
