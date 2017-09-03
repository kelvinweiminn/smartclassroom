import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DataService } from '../data.service';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

import {INgxMyDpOptions} from 'ngx-mydatepicker';                        
import {IMyDpOptions,IMyDateModel, IMyDate, IMyOptions, IMyInputFieldChanged} from 'mydatepicker';
import * as moment from 'moment-timezone';

@Component({
  selector:'app-1-6-59',
  templateUrl: '1-6-59.component.html'
})
export class FiveNineComponent {
  
  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  tempArr = [];
  humiArr = [];
  co2Arr = [];
  lightArr = [];
  
  timeTempArr = [];
  timeHumiArr = [];
  timeCo2Arr = [];
  timeLightArr = [];

  tempDevice = '2102CB';
  co2Device = '1C8876';
  lightDevice = '20FE30';

  
  selectdorw;
  num ;
  testNum = 0;
  displaydata;
  weekSelected;
  dateSelected;
  counterArr = [];
  startdate = this.counterArr[0];
  enddate = this.counterArr[6];

  batteryTempHumi:string;
  batteryLight:string;

  constructor(private dataService: DataService){
  }

  ngOnInit(){
    this.setCurrent();
    this.selectByWeek();
    this.selectdorw = "days";
    this.retrieveBatteryLevelLight();
    this.retrieveBatteryLevelTempHumi();
    console.log(this.testNum);
  }
//drop down
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  
//get battery level
  retrieveBatteryLevelTempHumi(){

    this.batteryTempHumi = '';

    this.dataService.getBatteryLevel(this.tempDevice).map(response => {

      //console.log("Battery_Temp Response: " + JSON.stringify(response));
      for(var item of response){
        this.batteryTempHumi = item.Value;
      }
      //console.log("Varible assigned Battery_Temp: " + this.batteryTempHumi);

    }).subscribe(()=>{
    });
    
  }

  retrieveBatteryLevelLight(){

    this.batteryLight = '';

    this.dataService.getBatteryLevel(this.lightDevice).map(response => {

      //console.log("Battery_Light Response: " + JSON.stringify(response));
      for(var item of response){
        this.batteryLight = item.Value;
      }
      //console.log("Varible assigned Battery_Light: " + this.batteryLight);

    }).subscribe(()=>{
    });
    
  }
 
//function to retrieve and refresh temperature and humidity values
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

      // console.log("Array assigned Temp data: " + this.tempArr);
      // console.log("Array assigned Humid data: " + this.humiArr);
      // console.log("Array assigned Temp and Humid time: " + this.timeTempArr);

    }).subscribe(()=>{
      this.refreshTempHumiChart();
    });
    
  }
  refreshTempHumiChart(){

    //console.log("To display temp: " + this.tempArr);
    this.tempDataset = [{
      label: "Temperature Values",
      data: this.tempArr
    }];

    setTimeout(() => {
      //console.log("To label temp: " + this.timeTempArr);
      this.tempLabels = this.timeTempArr;
    });

    //console.log("To display humidity: " + this.humiArr);
    this.humiDataset = [{
      label: "Humidity Values",
      data: this.humiArr
    }];

    setTimeout(() => {
      //console.log("To label humidity: " + this.timeHumiArr);
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

      // console.log("Array assigned CO2 data: " + this.co2Arr);
      // console.log("Array assigned CO2 time: " + this.timeCo2Arr);

    }).subscribe(()=>{
      this.refreshCo2Chart();
    });
    
  }

//function to refresh CO2 chart
  refreshCo2Chart(){

    //console.log("To display CO2: " + this.co2Arr);
    this.co2Dataset = [{
      label: "CO2 Values",
      data: this.co2Arr
    }];

    setTimeout(() => {
      //console.log("To label CO2 time: " + this.timeCo2Arr);
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

      // console.log("Array assigned Light data: " + this.lightArr);
      // console.log("Array assigned Light time: " + this.timeLightArr);

    }).subscribe(()=>{
      this.refreshLightChart();
    });
    
  }

//function to refresh Light chart
  refreshLightChart(){

    //console.log("To display Light: " + this.lightArr);
    this.lightDataset = [{
      label: "Light Values",
      data: this.lightArr
    }];

    setTimeout(() => {
      //console.log("To label CO2: " + this.timeLightArr);
      this.lightLabels = this.timeLightArr;
    });
  }

//function retrive light week data
  retrieveLightWeek(){

    this.lightArr = [];
    this.timeLightArr = [];

    this.dataService.getLightWeekData(this.lightDevice, this.startdate,this.enddate).map(response => {

      // console.log("Light Response: " + JSON.stringify(response));
      for(var item of response){
        this.lightArr.push(item.Value);

        var rawTime = item.Date;
        var time = moment.tz(rawTime, "Asia/singapore");
        this.timeLightArr.push(time);
      }

      // console.log("Array assigned Light data: " + this.lightArr);
      // console.log("Array assigned Light time: " + this.timeLightArr);

    }).subscribe(()=>{
      this.refreshLightChart();
    });
    
  }

//function retrive CO2 week data
  retrieveCo2Week(){

    this.co2Arr = [];
    this.timeCo2Arr = [];

    this.dataService.getCo2WeekData(this.co2Device, this.startdate,this.enddate).map(response => {

       //console.log("CO2 Response: " + JSON.stringify(response));
      for(var item of response){
        this.co2Arr.push(item.Data);

        var rawTime = item.Date;
        var time = moment.tz(rawTime, "Asia/singapore");
        this.timeCo2Arr.push(time);
      }

      // console.log("Array assigned CO2 data: " + this.co2Arr);
      // console.log("Array assigned CO2 time: " + this.timeCo2Arr);

    }).subscribe(()=>{
      this.refreshCo2Chart();
    });
    
  }

//function to retrieve temperature and humidity values
  retrieveTempHumiWeek(){

    this.tempArr = [];
    this.timeTempArr = [];

    this.humiArr = [];
    this.timeHumiArr = [];

    this.dataService.getTempHumiWeekData(this.tempDevice, this.startdate,this.enddate).map(response => {

      // console.log("Response: " + JSON.stringify(response));
      for(var item of response){
        this.tempArr.push(item.Temperature);
        this.humiArr.push(item.Humidity);

        var rawTime = item.Date;
        var time = moment.tz(rawTime, "Asia/singapore");
        this.timeTempArr.push(time);
        this.timeHumiArr.push(time);
      }

      // console.log("Array assigned Temp data: " + this.tempArr);
      // console.log("Array assigned Humid data: " + this.humiArr);
      // console.log("Array assigned Temp and Humid time: " + this.timeTempArr);

    }).subscribe(()=>{
      this.refreshTempHumiChart();
    });
    
  }

//date picker format  
  private myDatePickerOptions: INgxMyDpOptions  = {
        dateFormat: 'yyyy-mm-dd',    
  };
  
//event listener for change in datepicker
  onDateChanged(event: IMyDateModel){

    this.dateSelected = event.formatted;
    //console.log("Selected Date: " + this.dateSelected);
    
    this.refreshAllCharts();
  }

//set current
  setCurrent(){
    var currentDate =  new Date();
    var time = moment.tz(currentDate, "Asia/singapore");
    var Singapore = time.clone().tz("Asia/Singapore");
    var formattedTime = Singapore.format("YYYY-MM-DD");
    this.dateSelected = formattedTime;

    this.refreshAllCharts();
  }

//refresh all charst
  refreshAllCharts(){
    this.retrieveTempHumi();
    this.retrieveLight();
    this.retrieveCo2();
  }

//refresh all charts in weeks
  refreshAllChartsInWeek(){
    this.retrieveLightWeek();
    this.retrieveCo2Week();
    this.retrieveTempHumiWeek();
  }

//plus and minus function
  
    minusDate(){
      
      var newDate =  new Date(this.dateSelected);
      newDate.setDate(newDate.getDate() - 1);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime = Singapore.format("YYYY-MM-DD");
      this.dateSelected = formattedTime;
      this.displaydata =  this.dateSelected;

      this.refreshAllCharts();
    }

    plusDate(){
      var newDate =  new Date(this.dateSelected);
      newDate.setDate(newDate.getDate() + 1);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime= Singapore.format("YYYY-MM-DD");
      this.dateSelected = formattedTime;
      this.displaydata =  this.dateSelected;

      this.refreshAllCharts();
    }

//select by week
  //counter to get data in advance
  selectByWeek(){
    this.weekcounter();
    this.num = this.dayofweek(moment());
    var begin = new Date();
    var time = moment.tz(begin, "Asia/singapore");
    var Singapore = time.clone().tz("Asia/Singapore");
    var formattedTime = Singapore.format("YYYY-MM-DD");  
    this.displaydata = formattedTime;
  } 
  //get this week data
  getWeek(day) {
    var today = day.clone();
    var monday = today.clone().startOf('isoWeek');
    var sunday = today.clone().endOf('isoWeek');
    var days = [];
    for (var current = monday.clone(); current.isBefore(today, 'day'); current.add(1, 'days')) {
        days.push(current.format());
    }
    days.push(today.format());
    for (var current = today.clone().add(1, 'days');
        current.isBefore(sunday, 'day') || (current.isSame(sunday, 'day') && !today.isSame(sunday, 'day'));
        current.add(1, 'days')) {
        days.push(current.format());
    }
    return days;
  };
  //get this weeks'number
  dayofweek(day) {
    return Math.ceil(moment(day).dayOfYear() / 7);
  };
  //day and week button
  weekcounter(){
    this.counterArr = this.getWeek(moment());
    this.startdate = this.counterArr[0];
    this.enddate = this.counterArr[6];
    this.displaydata = "Week "+this.num+" ("+this.startdate+" to "+this.enddate+")"
    this.selectdorw =  "weeks";
  };
  weekClick(){
    this.counterArr = this.getWeek(moment());
    this.startdate = this.counterArr[0];
    this.enddate = this.counterArr[6];

    var UTC = moment.tz(this.startdate, "Asia/Singapore");
    var Singapore = UTC.clone().tz("Asia/Singapore");
    this.startdate = Singapore.format("YYYY-MM-DD");

    var UTC = moment.tz(this.enddate, "Asia/Singapore");
    var Singapore = UTC.clone().tz("Asia/Singapore");
    this.enddate = Singapore.format("YYYY-MM-DD");

    this.displaydata = "Week "+this.num+" ("+this.startdate+" to "+this.enddate+")"
    this.selectdorw =  "weeks";

    this.refreshAllChartsInWeek();
  };
  daycounter(){
    var jialat = new Date();
    var time = moment.tz(jialat, "Asia/singapore");
    var Singapore = time.clone().tz("Asia/Singapore");
    var formattedTime = Singapore.format("YYYY-MM-DD");
    this.dateSelected = formattedTime;
    this.displaydata = this.dateSelected;
  }
  dayClick(){
    var jialat = new Date();
    var time = moment.tz(jialat, "Asia/singapore");
    var Singapore = time.clone().tz("Asia/Singapore");
    var formattedTime = Singapore.format("YYYY-MM-DD");
    this.dateSelected = formattedTime;
    this.displaydata = this.dateSelected;
    this.selectdorw = "days";

    this.refreshAllCharts();
  }
  minusWeekStart(){
    var start = new Date(this.startdate);
    start.setDate(start.getDate() - 7);
    var time = moment.tz(start, "Asia/singapore");
    var Singapore = time.clone().tz("Asia/Singapore");
    var formattedTime = Singapore.format("YYYY-MM-DD");
    this.startdate = formattedTime;
    //console.log(this.startdate);
  }
  minusWeekEnd(){
    var end = new Date(this.enddate);
    end.setDate(end.getDate() - 7);
    var time = moment.tz(end, "Asia/singapore");
    var Singapore = time.clone().tz("Asia/Singapore");
    var formattedTime = Singapore.format("YYYY-MM-DD");
    this.enddate = formattedTime;
    this.num = this.num -1;
    //console.log(this.enddate);
  }
  plusWeekStart(){
    var start = new Date(this.startdate);
    start.setDate(start.getDate() + 7);
    var time = moment.tz(start, "Asia/singapore");
    var Singapore = time.clone().tz("Asia/Singapore");
    var formattedTime = Singapore.format("YYYY-MM-DD");
    this.startdate = formattedTime;
    //console.log(this.startdate);
  }
  plusWeekEnd(){
    var end = new Date(this.enddate);
    end.setDate(end.getDate() + 7);
    var time = moment.tz(end, "Asia/singapore");
    var Singapore = time.clone().tz("Asia/Singapore");
    var formattedTime = Singapore.format("YYYY-MM-DD");
    this.enddate = formattedTime;
    this.num = this.num +1;
    //console.log(this.enddate);
  }
  minusWeekCounter(){
    this.minusWeekStart();
    this.minusWeekEnd();
    this.displaydata = "Week "+this.num+" ("+this.startdate+" to "+this.enddate+")";
    this.refreshAllChartsInWeek();
  }
  plusWeekCounter(){
    this.plusWeekStart();
    this.plusWeekEnd();
    this.displaydata = "Week "+this.num+" ("+this.startdate+" to "+this.enddate+")";
    this.refreshAllChartsInWeek();
  } 
  minusButton(){
    if(this.selectdorw == "days"){
      this.minusDate();
    }
    else{
      this.minusWeekCounter();
    }
  }
  plusButton(){
    if(this.selectdorw == "days"){
      this.plusDate();
    }
    else{
      this.plusWeekCounter();
    }
}

//objects used by the chart to display data
  private tempDataset = [
    {
      label: "Values",
      data: [],
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

  public lightColour = [
    {
      backgroundColor: 'rgba(250, 204, 0, 0.5)',  
      borderColor: this.brandWarning,
      fill: true,
      radius: 2.5,
      borderWidth: 2.5
    }];
  public humiColour = [
    {
      backgroundColor: 'rgba(32, 168, 217, 0.71)',  
      borderColor: this.brandPrimary,
      fill: true,
      radius: 2.5,
      borderWidth: 2.5
    }];
  public tempColour = [
    {
      backgroundColor: 'rgba(99, 193, 222, 0.58)',  
      borderColor: this.brandInfo,
      fill: true,
      radius: 2.5,
      borderWidth: 2.5
    }];
  public co2Colour = [
    {
      backgroundColor: 'rgba(248, 109, 109, 0.57)',  
      borderColor: this.brandDanger,
      fill: true,
      radius: 2.5,
      borderWidth: 2.5
    }];

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