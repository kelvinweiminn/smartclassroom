import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DataService } from '../data.service';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import {IMyDpOptions,IMyDateModel} from 'mydatepicker';
//import { DatePipe } from '@angular/common';



import * as moment from 'moment-timezone';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {

  tempArr = [];
  humiArr = [];
  co2Arr = [];
  lightArr = [];
  
  timeTempArr = [];
  timeHumiArr = [];
  timeCo2Arr = [];
  timeLightArr = [];

  tempDevice = "1CB001";
  co2Device = '1C8876';
  lightDevice = "1CB0C2";
  date;
  dateSelected;
  
  constructor(private dataService: DataService){
  }
  //private model: Object = { date: { year: 2017, month: 8, day: 3 } };

  ngOnInit(){
    //new DatePipe().transform(myDate, 'yyyy-dd-MM');
    // this.date=new Date();
    // let latest_date =this.DatePipe().transform(this.date, 'yyyy-MM-dd')

    // this.dateSelected = today
    console.log(this.dateSelected); 
    this.retrieveTempHumi();
  }

//function to retrieve temperature and humidity values
  retrieveTempHumi(){
 
    this.tempArr = [];
    this.timeTempArr = [];

    this.humiArr = [];
    this.timeHumiArr = [];

    this.dataService.getTempHumiData(this.tempDevice, this.dateSelected).map(response => {

      // console.log("Response: " + JSON.stringify(response));
      for(var item of response){
        this.tempArr.push(item.Temperature);
        this.humiArr.push(item.Humidity);

        var rawTime = item.Date;
        var time = moment.tz(rawTime, "Asia/singapore");
        this.timeTempArr.push(time);
        this.timeHumiArr.push(time);
      }

      console.log("Array assigned Temp data: " + this.tempArr);
      console.log("Array assigned Humid data: " + this.humiArr);
      console.log("Array assigned Temp and Humid time: " + this.timeTempArr);

    }).subscribe(()=>{
      this.refreshTempHumiChart();
    });
    
  }

  //function to refresh temperature and humidity chart
  refreshTempHumiChart(){

    console.log("To display temp: " + this.tempArr);
    this.tempDataset = [{
      label: "Temperature Values",
      data: this.tempArr
    }];

    setTimeout(() => {
      console.log("To label temp: " + this.timeTempArr);
      this.tempLabels = this.timeTempArr;
    });

    console.log("To display humidity: " + this.humiArr);
    this.humiDataset = [{
      label: "Humidity Values",
      data: this.humiArr
    }];

    setTimeout(() => {
      console.log("To label humidity: " + this.timeHumiArr);
      this.humiLabels = this.timeTempArr;
    });
  }

//function to retrieve CO2 values
  retrieveCo2(){

    this.co2Arr = [];
    this.timeCo2Arr = [];

    this.dataService.getCO2Data(this.co2Device, this.dateSelected).map(response => {

      // console.log("CO2 Response: " + JSON.stringify(response));
      for(var item of response){
        this.co2Arr.push(item.Data);

        var rawTime = item.Date;
        var time = moment.tz(rawTime, "Asia/singapore");
        this.timeCo2Arr.push(time);
      }

      console.log("Array assigned CO2 data: " + this.co2Arr);
      console.log("Array assigned CO2 time: " + this.timeCo2Arr);

    }).subscribe(()=>{
      this.refreshCo2Chart();
    });
    
  }

  //function to refresh CO2 chart
  refreshCo2Chart(){

    console.log("To display CO2: " + this.co2Arr);
    this.co2Dataset = [{
      label: "CO2 Values",
      data: this.co2Arr
    }];

    setTimeout(() => {
      console.log("To label CO2: " + this.timeCo2Arr);
      this.co2Labels = this.timeCo2Arr;
    });
  }

  //function to retrieve Light values
  retrieveLight(){

    this.lightArr = [];
    this.timeLightArr = [];

    this.dataService.getLightData(this.lightDevice, this.dateSelected).map(response => {

      // console.log("Light Response: " + JSON.stringify(response));
      for(var item of response){
        this.lightArr.push(item.Value);

        var rawTime = item.Date;
        var time = moment.tz(rawTime, "Asia/singapore");
        this.timeLightArr.push(time);
      }

      console.log("Array assigned Light data: " + this.lightArr);
      console.log("Array assigned Light time: " + this.timeLightArr);

    }).subscribe(()=>{
      this.refreshLightChart();
    });
    
  }

  //function to refresh Light chart
  refreshLightChart(){

    console.log("To display Light: " + this.lightArr);
    this.lightDataset = [{
      label: "Light Values",
      data: this.lightArr
    }];

    setTimeout(() => {
      console.log("To label CO2: " + this.timeLightArr);
      this.lightLabels = this.timeLightArr;
    });
  }

  //date picker format  
  private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',    
  };
  
  //event listener for change in datepicker
  onDateChanged(event: IMyDateModel){

    this.dateSelected = event.formatted;
    console.log("Selected Date: " + this.dateSelected);
    
    this.retrieveTempHumi();
    this.retrieveCo2();
    this.retrieveLight();
  }


//objects used by the chart to display data
  private tempDataset = [
    {
      label: "Values",
      data: []
    }
  ];
  private humiDataset = [
    {
      label: "Values",
      data: []
    }
  ];
  private lightDataset = [
    {
      label: "Values",
      data: []
    }
  ];
  private co2Dataset = [
    {
      label: "Values",
      data: []
    }
  ];

  private tempLabels = [];
  private humiLabels = [];
  private lightLabels = [];
  private co2Labels = [];

  private options = {
    scales: {
      xAxes: [{
          display: true,
          type: "time",
          time: {
              unit: "hour",
              tooltipFormat: 'YYYY-MM-DD hh:mm A'
          },
          scaleLabel: {
              display: true,
              labelString: 'Time'
          }
      },],
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    }
  };

}