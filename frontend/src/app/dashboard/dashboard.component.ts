import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

import {INgxMyDpOptions} from 'ngx-mydatepicker';                        
import {IMyDpOptions,IMyDateModel, IMyDate, IMyOptions, IMyInputFieldChanged} from 'mydatepicker';
import * as moment from 'moment-timezone';
@Component({
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  constructor(private dataService: DataService){
  }

  avgTemp:string;
  maxTemp:string;
  maxTempDate;
  minTemp:string;
  minTempDate;

  avgHumi:string;
  maxHumi:string;
  maxHumiDate;
  minHumi:string;
  minHumiDate;

  avgLight:string;
  maxLight:string;
  maxLightDate;
  minLight:string;
  minLightDate;

  avgCO2:string;
  maxCO2:string;
  maxCO2Date;
  minCO2:string;
  minCO2Date;

  avgLightDayArr = [];
  maxLightDayArr = [];
  minLightDayArr = [];

  avgCO2DayArr = [];
  maxCO2DayArr = [];
  minCO2DayArr = [];
  
  avgHumiDayArr= [];
  maxHumiDayArr= [];
  minHumiDayArr= [];

  avgTempDayArr= [];
  maxTempDayArr= [];
  minTempDayArr= [];

  timeTempArr = [];
  timeHumiArr = [];
  timeCO2Arr = [];
  timeLightArr = [];

  num=7;
  currentDate =  new Date();
  displayDate = new Date();
  displyToday;
  displayArea;


  startDate;
  endDate;
  today;
  counterArr=[];
  now = Date.now();

  currentLocation= "IIT1-6-59";
  tempDevice = '2102CB';  
  co2Device = '1C8876';
  lightDevice = '20FE30';
    



  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  ngOnInit() {
    this.monthClick();
  }
//device id
  GetDeviceID(room:string){
    this.currentLocation = room;
    if(room == "IIT1-6-59"){
      this.tempDevice = '2102CB';
      this.co2Device = '1C8876';
      this.lightDevice = '20FE30';
    } else if (room == "IIT1-6-60"){
      this.tempDevice = '210043';
      this.co2Device = '1C8876';
      this.lightDevice = '210088';
    } else if (room == "IIT1-6-61"){
      this.tempDevice = '21034E';
      this.co2Device = '1C8876';
      this.lightDevice = '20FD79';
    } else if (room == "IIT3-7-50/2"){
      this.tempDevice = '210285';
      this.co2Device = '2C3112';
      this.lightDevice = '2102AC';
    } else if (room == "IIT3-7-46"){
      this.tempDevice = '2100AB';
      this.co2Device = '1C8876';
      this.lightDevice = '2101E9';
    } else if (room == "IIT3-8-32"){
      this.tempDevice = '1CB001';
      this.co2Device = '1C8876';
      this.lightDevice = '1CB0C2';
    } else if (room == "IoTLab"){
      this.tempDevice = '1CB00D';
      this.co2Device = '1C8876';
      this.lightDevice = '1CB0D4';
    } else if (room == "BigData"){
      this.tempDevice = '1CB049';
      this.co2Device = '1C8876';
      this.lightDevice = '1CB021';
    }
    if(this.num == 7){
      this.weekClick();
    }else if (this.num==1){
      this.monthClick();
    }
    
  }
//select by week/month
  firstDayOfMonth(day) {
    var d = new Date(Date.apply(null, arguments));
    d.setDate(1);
    return d.toISOString();
  }

  lastDayOfMonth(day) {
      var d = new Date(Date.apply(null, arguments));

      d.setMonth(d.getMonth() + 1);
      d.setDate(0);
      return d.toISOString();
  }
  callAll(){
      this.tempCall();
      this.humiCall();
      this.lightCall();
      this.CO2Call();

  }

  minusButton(){
    if(this.num==7 ){
      var newDate =  new Date(this.startDate); 
      newDate.setDate(newDate.getDate() - this.num);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime = Singapore.format("YYYY-MM-DD");
      this.startDate = formattedTime;
      var newDate =  new Date(this.endDate); 
      newDate.setDate(newDate.getDate() - this.num);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime = Singapore.format("YYYY-MM-DD");
      this.endDate = formattedTime;
      this.displayArea ="Week ("+this.startDate +" to " +this.endDate+")";
      
      this.callAll();
    }
    else if(this.num==1){
      var newDate =  new Date(this.startDate); 
      newDate.setDate(newDate.getDate() - this.num);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime = Singapore.format("YYYY-MM-DD");
      this.endDate = formattedTime;

      var newDate =  new Date(this.startDate); 
      newDate.setMonth(newDate.getMonth() - this.num);
      newDate.setDate(1);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime = Singapore.format("YYYY-MM-DD");
      this.startDate = formattedTime;
      this.displayArea ="Month ("+this.startDate +" to " +this.endDate+")";
      

      this.callAll();
    }
  }
  plusButton(){
    if(this.num ==7){
      var newDate =  new Date(this.startDate); 
      newDate.setDate(newDate.getDate() + this.num);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime = Singapore.format("YYYY-MM-DD");
      this.startDate = formattedTime;
      var newDate =  new Date(this.endDate); 
      newDate.setDate(newDate.getDate() + this.num);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime = Singapore.format("YYYY-MM-DD");
      this.endDate = formattedTime;
      this.displayArea ="Week ("+this.startDate +" to " +this.endDate+")";
      this.callAll();
    }
    else if(this.num == 1){
      var newDate =  new Date(this.endDate); 
      newDate.setDate(newDate.getDate() + this.num);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime = Singapore.format("YYYY-MM-DD");
      this.startDate = formattedTime;

      var newDate =  new Date(this.startDate); 
      newDate.setMonth(newDate.getMonth() + this.num);
      newDate.setDate(0);
      var time = moment.tz(newDate, "Asia/singapore");
      var Singapore = time.clone().tz("Asia/Singapore");
      var formattedTime = Singapore.format("YYYY-MM-DD");
      this.endDate = formattedTime;
      this.displayArea ="Month ("+this.startDate +" to " +this.endDate+")";
      

      this.callAll();
    }
  }

      
      
  
  weekClick(){
    this.num = 7;
    this.counterArr = this.getWeek(moment());
    this.startDate = this.counterArr[0];
    this.endDate = this.counterArr[6];
    var UTC = moment.tz(this.startDate, "Asia/Singapore");
    var Singapore = UTC.clone().tz("Asia/Singapore");
    this.startDate = Singapore.format("YYYY-MM-DD");
    var UTC = moment.tz(this.endDate, "Asia/Singapore");
    var Singapore = UTC.clone().tz("Asia/Singapore");
    this.endDate = Singapore.format("YYYY-MM-DD");
    this.displayArea ="Week ("+this.startDate +" to " +this.endDate+")";
    this.callAll();
  }
  monthClick(){
    this.num = 1;
    this.now = Date.now();
    this.startDate = this.firstDayOfMonth(this.now);
    var UTC = moment.tz(this.startDate, "Asia/Singapore");
    var Singapore = UTC.clone().tz("Asia/Singapore");
    this.startDate = Singapore.format("YYYY-MM-DD");

    this.endDate = this.lastDayOfMonth(this.now);
    var UTC = moment.tz(this.endDate, "Asia/Singapore");
    var Singapore = UTC.clone().tz("Asia/Singapore");
    this.endDate = Singapore.format("YYYY-MM-DD");
    this.displayArea ="Month ("+this.startDate +" to " +this.endDate+")";
    this.callAll();
    
  }
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


//
  
//call light data    
  lightCall(){
    this.avgLightDayArr = [];
    this.maxLightDayArr = [];
    this.minLightDayArr = [];
    this.timeLightArr = [];
    this.retrieveAvgLightDay();
    this.retrieveMaxLightDay();
    this.retrieveMinLightDay();
    this.retrieveAvgLight();
    this.retrieveMaxLight();
    this.retrieveMinLight();
  }
  //avg
    retrieveAvgLight(){
      this.dataService.getLightAverage(this.lightDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.avgLight = JSON.stringify(item.average);
        }
      }).subscribe(()=>{
      });
    }
    retrieveMaxLight(){
      this.dataService.getRangeMaxLight(this.lightDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.maxLight = JSON.stringify(item.max);
        this.maxLightDate = item.Date;
        }
      }).subscribe(()=>{
      });
    }
    retrieveMinLight(){
      this.dataService.getRangeMinLight(this.lightDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.minLight = JSON.stringify(item.min);
        this.minLightDate = item.Date;
        }
      }).subscribe(()=>{
      });
    }
    retrieveAvgLightDay(){
        this.dataService.getLightAverageDay(this.lightDevice,this.startDate,this.endDate).map(response => {      
        for(var item of response){
          var data = parseFloat(item.average);
          this.avgLightDayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeLightArr.push(rawTime);
          //console.log("avg light arr"+this.avgLightDayArr);
        }
      }).subscribe(()=>{
        this.refreshLight();
      });
      
  }
  //max
    retrieveMaxLightDay(){
        this.dataService.getLightMaxDay(this.lightDevice,this.startDate,this.endDate).map(response => {      
        for(var item of response){
          var data = parseFloat(item.max);
          this.maxLightDayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeLightArr.push(time);
        }
      }).subscribe(()=>{
        this.refreshLight();
      });
  }
  //min
    retrieveMinLightDay(){
        this.dataService.getLightMinDay(this.lightDevice,this.startDate,this.endDate).map(response => {      
        for(var item of response){
          var data = parseFloat(item.min);
          this.minLightDayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeLightArr.push(time);
        }
      }).subscribe(()=>{
        this.refreshLight();
      });
    }
    refreshLight(){
        this.LightData = [
            {
            label: "Avg(lux)",
            data: this.avgLightDayArr
          },
            {
            label: "Max(lux)",
            data: this.maxLightDayArr
          },
            {
            label: "Min(lux)",
            data: this.minLightDayArr
          },
        ]

        setTimeout(() => {
          this.LightLabels = this.timeLightArr;
        });
  }


//call temperature data  
  tempCall(){
    this.avgTempDayArr= [];
    this.maxTempDayArr= [];
    this.minTempDayArr= [];
    this.timeTempArr = [];
    this.retrieveAvgTempDay();
    this.retrieveMaxTempDay();
    this.retrieveMinTempDay();
    this.retrieveAvgTemp();
    this.retrieveMaxTemp();
    this.retrieveMinTemp();
  } 

  //avg
    retrieveAvgTemp(){
      this.dataService.getTempAverage(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.avgTemp = JSON.stringify(item.average);
        }
      }).subscribe(()=>{
      });
    }
    retrieveMaxTemp(){
      this.dataService.getRangeMaxTemp(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.maxTemp = JSON.stringify(item.max);
        this.maxTempDate = item.Date;
        }
      }).subscribe(()=>{
      });
    }
    retrieveMinTemp(){
      this.dataService.getRangeMinTemp(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.minTemp = JSON.stringify(item.min);
        this.minTempDate = item.Date;
        }
      }).subscribe(()=>{
      });
    }
    retrieveAvgTempDay(){
      this.dataService.getTempAverageDay(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
          var data = parseFloat(item.average);
          this.avgTempDayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeTempArr.push(time);
          
        }
      }).subscribe(()=>{
        this.refreshTemp();
      });
      
  }
  //max
    retrieveMaxTempDay(){
      this.dataService.getTempMaxDay(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
          var data = parseFloat(item.max);
          this.maxTempDayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeTempArr.push(time);
      }
      }).subscribe(()=>{
        this.refreshTemp();
      });
  }
  //min
    retrieveMinTempDay(){
      this.dataService.getTempMinDay(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
          var data = parseFloat(item.min);
          this.minTempDayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeTempArr.push(time);
      }
      }).subscribe(()=>{
        this.refreshTemp();
      });
    }
    refreshTemp(){
      this.TempData = [
            {
            label: "Avg(°C)",
            data: this.avgTempDayArr
          },
            {
            label: "Max(°C)",
            data: this.maxTempDayArr
          },
            {
            label: "Min(°C)",
            data: this.minTempDayArr
          },
      ]
      setTimeout(() => {
        this.TempLabels = this.timeTempArr;
      });
  }
 
//call humidity data  
  humiCall(){
    this.avgHumiDayArr= [];
    this.maxHumiDayArr= [];
    this.minHumiDayArr= [];
    this.timeHumiArr = [];
    this.retrieveAvgHumiDay();
    this.retrieveMaxHumiDay();
    this.retrieveMinHumiDay();
    this.retrieveAvgHumi();
    this.retrieveMaxHumi();
    this.retrieveMinHumi();
  }
  
  //avg
    retrieveAvgHumi(){
      this.dataService.getHumiAverage(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.avgHumi = JSON.stringify(item.average);
        }
      }).subscribe(()=>{
      });
    }
    retrieveMaxHumi(){
      this.dataService.getRangeMaxHumi(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.maxHumi = JSON.stringify(item.max);
        this.maxHumiDate = item.Date;
        }
      }).subscribe(()=>{
      });
    }
    retrieveMinHumi(){
      this.dataService.getRangeMinHumi(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.minHumi = JSON.stringify(item.min);
        this.minHumiDate = item.Date;
        }
      }).subscribe(()=>{
      });
    }
    retrieveAvgHumiDay(){
      this.dataService.getHumiAverageDay(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
          var data = parseFloat(item.average);
          this.avgHumiDayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeHumiArr.push(time);
        }
      }).subscribe(()=>{
        this.refreshHumi();
      });
  }
  //max
    retrieveMaxHumiDay(){
      this.dataService.getHumiMaxDay(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
          var data = parseFloat(item.max);
          this.maxHumiDayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeHumiArr.push(time);
      }
      }).subscribe(()=>{
          this.refreshHumi();
        });
  } 
  //min
    retrieveMinHumiDay(){
      this.dataService.getHumiMinDay(this.tempDevice,this.startDate,this.endDate).map(response => {
        for(var item of response){
          var data = parseFloat(item.min);
          this.minHumiDayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeHumiArr.push(time);
      }
      }).subscribe(()=>{
          this.refreshHumi();
        });
    }
    refreshHumi(){
      this.HumiData = [
        {
        label: "Avg(%)",
        data: this.avgHumiDayArr
      },
        {
        label: "Max(%)",
        data: this.maxHumiDayArr
      },
        {
        label: "Min(%)",
        data: this.minHumiDayArr
      },

      ];
      setTimeout(() => {
        this.HumiLabels = this.timeHumiArr;
      });
  }

//call CO2 data  
  CO2Call(){
    this.avgCO2DayArr = [];
    this.maxCO2DayArr = [];
    this.minCO2DayArr = [];
    this.timeCO2Arr = [];
    this.retrieveAvgCO2Day();
    this.retrieveMaxCO2Day();
    this.retrieveMinCO2Day();
    this.retrieveAvgCO2();
    this.retrieveMaxCO2();
    this.retrieveMinCO2();
  }
 
  //avg
    retrieveAvgCO2(){
        this.dataService.getCO2Average(this.co2Device,this.startDate,this.endDate).map(response => {
          for(var item of response){
          this.avgCO2 = JSON.stringify(item.average);
          }
        }).subscribe(()=>{
        });
    }
    retrieveMaxCO2(){
      this.dataService.getRangeMaxCO2(this.co2Device,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.maxCO2 = JSON.stringify(item.max);
        this.maxCO2Date = item.Date;
        console.log("co2 max"+this.maxCO2)
        }
      }).subscribe(()=>{
      });
    }
    retrieveMinCO2(){
      this.dataService.getRangeMinCO2(this.co2Device,this.startDate,this.endDate).map(response => {
        for(var item of response){
        this.minCO2 = JSON.stringify(item.min);
        this.minCO2Date = item.Date;
        }
      }).subscribe(()=>{
      });
    }
    retrieveAvgCO2Day(){
      this.dataService.getCO2AverageDay(this.co2Device,this.startDate,this.endDate).map(response => {
        for(var item of response){
          var data = parseFloat(item.average);
          this.avgCO2DayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeCO2Arr.push(time);
        }
      }).subscribe(()=>{
        this.refreshCO2();
      });
      
  }
  //max
    retrieveMaxCO2Day(){
      this.dataService.getCO2MaxDay(this.co2Device,this.startDate,this.endDate).map(response => {
        for(var item of response){
          var data = parseFloat(item.max);
          this.maxCO2DayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeCO2Arr.push(time);
        }
      }).subscribe(()=>{
        this.refreshCO2();
      });
      
  }   
  //min
    retrieveMinCO2Day(){
      this.dataService.getCO2MinDay(this.co2Device,this.startDate,this.endDate).map(response => {
        for(var item of response){
          var data = parseFloat(item.min);
          this.minCO2DayArr.push(data);
          var rawTime = item.Date;
          var time = moment.tz(rawTime, "Asia/singapore");
          this.timeCO2Arr.push(time);
        }
      }).subscribe(()=>{
        this.refreshCO2();
      });
      
    }
    refreshCO2(){
      this.CO2Data = [
          {
          label: "Avg(ppm)",
          data: this.avgCO2DayArr
        },
          {
          label: "Max(ppm)",
          data: this.maxCO2DayArr
        },
          {
          label: "Min(ppm)",
          data: this.minCO2DayArr
        },

        ];
      setTimeout(() => {
        this.CO2Labels = this.timeCO2Arr;
      });
  }




// dropdown buttons
  public status: { isopen } = { isopen: false };
  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
  

// convert Hex to RGBA
  public convertHex(hex: string, opacity: number) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
    return rgba;
  }

// events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

// colours
  public lineChart1Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: this.brandWarning,
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart4Colours: Array<any> = [
    {
      backgroundColor: this.brandDanger,
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];

// mainChart

 
  // public mainChartData1: Array<any> =[{
  //     label: "Values",
  //     data: []

  // }];
  public avgHumiData: Array<number>=[];
  mainChartData2 =[];
  mainChartData3= [];
  //mainChartData4 = [];
  public test =['1','2','3','4','5'];
  public test2 =['10','20','30','40','50'];
  
  //public mainChartData2: Array<any> =[];
  // public mainChartData3: Array<any> =[];
  //public mainChartData4: Array<any> =[];

  // public mainChartData: Array<any> = [
  //   {
  //     data: this.mainChartData1,
  //     label: 'light'
  //   },
  //   {
  //     data: this.mainChartData2,
  //     label: 'temp'
  //   },
  //   {
  //     data: this.mainChartData3,
  //     label: 'humi'
  //   },
    // {
    //   data: this.mainChartData4,
    //   label: 'CO2'
    // }
  // ];
  
  
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: this.convertHex(this.brandInfo, 10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';



//light 
  private LightData = [
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
  ];
  public LightLabels: Array<any> = [];
//temp
  public TempData: Array<any> = [
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
  ];
  public TempLabels: Array<any> = [];
//humi
  private HumiData: Array<any> = [
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
  ];
  public HumiLabels: Array<any> = [];
//CO2
  private CO2Data = [
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
    {
      label: "",
      data: []
    },
  ];
  public CO2Labels: Array<any> = [];


//transparent options for card
  public options ={
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          //fontSize: 1,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        // ticks: {
        //   //display: false,
        //   min: 40 - 5,
        //   max: 84 + 5,
        // }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 2,
        hitRadius: 5,
        hoverRadius: 2,
      },
    },
    legend: {
      display: false
    }
  };
//objects used by the chart to display data
  
  // //colors
  //   public lightColour = [
  //     {
  //       backgroundColor: 'rgba(250, 204, 0, 0.30)',  
  //       borderColor: this.brandWarning,
  //       fill: true,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //     {
  //       backgroundColor: 'rgb(77,189,116)',  
  //       borderColor: 'rgb(77,189,116)',
  //       fill: false,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //     {
  //       backgroundColor: 'rgba(154, 171, 183, 1)',  
  //       borderColor: 'rgba(154, 171, 183, 1)',
  //       fill: false,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //   ];
  //   public humiColour = [
  //     {
  //       backgroundColor: 'rgba(32, 168, 217, 0.40)',  
  //       borderColor: this.brandPrimary,
  //       fill: true,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //     {
  //       backgroundColor: 'rgb(77,189,116)',  
  //       borderColor: 'rgb(77,189,116)',
  //       fill: false,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //     {
  //       backgroundColor: 'rgba(154, 171, 183, 1)',  
  //       borderColor: 'rgba(154, 171, 183, 1)',
  //       fill: false,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //   ];
  //   public tempColour = [
  //     {
  //       backgroundColor: 'rgba(99, 193, 222, 0.18)',  
  //       borderColor: this.brandInfo,
  //       fill: true,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //     {
  //       backgroundColor: 'rgb(77,189,116)',  
  //       borderColor: 'rgb(77,189,116)',
  //       fill: false,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //     {
  //       backgroundColor: 'rgba(154, 171, 183, 1)',  
  //       borderColor: 'rgba(154, 171, 183, 1)',
  //       fill: false,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //   ];
  //   public co2Colour = [
  //     {
  //       backgroundColor: 'rgba(248, 109, 109, 0.30)',  
  //       borderColor: this.brandDanger,
  //       fill: true,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //    },
  //    {
  //       backgroundColor: 'rgb(77,189,116)',  
  //       borderColor: 'rgb(77,189,116)',
  //       fill: false,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  //     {
  //       backgroundColor: 'rgba(154, 171, 183, 1)',  
  //       borderColor: 'rgba(154, 171, 183, 1)',
  //       fill: false,
  //       radius: 2.5,
  //       borderWidth: 2.5
  //     },
  // ];
  //colors
    public lightColour = [
      {
        backgroundColor: 'rgba(250, 204, 0, 0.30)',  
        borderColor: this.brandWarning,
        fill: true,
        radius: 2,
        borderWidth: 2
      },
      {
        backgroundColor: 'rgb(187,75,57)',  
        borderColor: 'rgb(187,75,57)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
      {
        backgroundColor: 'rgb(77,189,116)',  
        borderColor: 'rgb(77,189,116)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
    ]; 
    public humiColour = [
      {
        backgroundColor: 'rgba(32, 168, 217, 0.40)',  
        borderColor: this.brandPrimary,
        fill: true,
        radius: 2,
        borderWidth: 2
      },
      {
        backgroundColor: 'rgb(187,75,57)',  
        borderColor: 'rgb(187,75,57)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
      {
        backgroundColor: 'rgb(77,189,116)',  
        borderColor: 'rgb(77,189,116)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
    ];
    public tempColour = [
      {
        backgroundColor: 'rgba(99, 193, 222, 0.18)',  
        borderColor: this.brandInfo,
        fill: true,
        radius: 2,
        borderWidth: 2
      },
      {
        backgroundColor: 'rgb(187,75,57)',  
        borderColor: 'rgb(187,75,57)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
      {
        backgroundColor: 'rgb(77,189,116)',  
        borderColor: 'rgb(77,189,116)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
    ];
    public co2Colour = [
      {
        backgroundColor: 'rgba(248, 109, 109, 0.30)',  
        borderColor: this.brandDanger,
        fill: true,
        radius: 2,
        borderWidth: 2
     },
     {
        backgroundColor: 'rgb(187,75,57)',  
        borderColor: 'rgb(187,75,57)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
      {
        backgroundColor: 'rgb(77,189,116)',  
        borderColor: 'rgb(77,189,116)',
        fill: false,
        radius: 2,
        borderWidth: 2
      },
  ];







  
  
    
    
private optionsLineChart = {
      animation: false,
      responsive: true,
      maintainAspectRatio:true,
      scales: {
        xAxes: [{
            display: true,
            type: "time",
            time: {
                unit: "hour",
                tooltipFormat: 'YYYY-MM-DD'
            },
            scaleLabel: {
                display: false,
                labelString: 'Time'
            }
        },],
        yAxes: [{
          ticks: {
            beginAtZero: false
          },
          

        }]
      }
  };


}