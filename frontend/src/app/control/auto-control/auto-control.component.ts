import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../data.service';

import * as moment from 'moment';

@Component({
  selector: 'app-auto-control',
  templateUrl: './auto-control.component.html',
  styleUrls: ['./auto-control.component.scss']
})
export class AutoControlComponent implements OnInit {

  tempArr = [];
  tempTimeArr = [];

  lightArr = [];
  lightTimeArr = [];

  data = {};

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.retrieveValues();
  }

  onSubmit() {
    console.log(this.data);
    this.dataService.postMockData(this.data).subscribe((res) => {
      console.log(res);
      this.retrieveValues();
    });
  }

  retrieveValues() {
    this.retrieveLight();
    this.retrieveTemp();
  }

  retrieveTemp() {

    this.tempArr = [];
    this.tempTimeArr = [];

    this.dataService.getMockTemp().map(res => {
      for (const item of res){
        this.tempArr.push(item.Temperature);

        const rawTime = item.Date;
        const time = moment.tz(rawTime, 'Asia/singapore');
        this.tempTimeArr.push(time);
      }
    })
    .subscribe(() => {
      this.tempDataset = [{
        label: 'Temperature (°C)',
        data: this.tempArr
      }];

      setTimeout(() => {
        this.tempLabels = this.tempTimeArr;
      });
    })
  }

  retrieveLight() {

    this.lightArr = [];
    this.lightTimeArr = [];

    this.dataService.getMockLight().map(res => {

      // console.log(JSON.stringify(res));

      for (const item of res){
        this.lightArr.push(item.Light);

        const rawTime = item.Date;
        const time = moment.tz(rawTime, 'Asia/singapore');
        this.lightTimeArr.push(time);

      }
    })
    .subscribe(() => {
      this.lightDataset = [{
        label: 'Light (lux)',
        data: this.lightArr
      }];

      console.log('Light Array: ' + this.lightDataset[0].data);

      setTimeout(() => {
        this.lightLabels = this.lightTimeArr;
      });
    })
  }

  // objects used by the chart to display data
  // tslint:disable-next-line:member-ordering
  private tempDataset = [
    {
      label: 'Temperature',
      data: [],
    }
  ];

  // tslint:disable-next-line:member-ordering
  private lightDataset = [
    {
      label: 'Light',
      data: []
    }
  ];


  public tempColour = [
    {
      // tslint:disable-next-line:no-trailing-whitespace
      backgroundColor: 'rgba(99, 193, 222, 0.58)',  
      fill: true,
      radius: 2.5,
      borderWidth: 2.5
    }];
    // tslint:disable-next-line:no-trailing-whitespace
      
  public lightColor = [
    {
      backgroundColor: 'rgba(248, 109, 109, 0.57)',
      fill: true,
      radius: 2.5,
      borderWidth: 2.5
    }];

  private tempLabels = [];
  private lightLabels = [];

  private options = {
    scales: {
      xAxes: [{
          display: true,
          type: 'time',
          time: {
              unit: 'minute',
              tooltipFormat: 'YYYY-MM-DD hh:mm:ss A'
          },
          scaleLabel: {
              display: true,
              labelString: 'Time'
          }
      }, ],
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    }
  };

}
