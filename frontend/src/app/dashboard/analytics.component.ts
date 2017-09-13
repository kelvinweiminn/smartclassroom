import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

import {INgxMyDpOptions} from 'ngx-mydatepicker';                        
import {IMyDpOptions,IMyDateModel, IMyDate, IMyOptions, IMyInputFieldChanged} from 'mydatepicker';
import * as moment from 'moment-timezone';
@Component({
  templateUrl: 'analytics.component.html'
})

export class AnalyticsComponent implements OnInit {
  constructor(private dataService: DataService){
  }
  avgLight:string ;
  avgTemp:string;
  avgHumi:string;
  avgCO2:string;
  

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

  currentLocation= "All Locations";
  tempDevice = '2102CB" or Device_ID = "210088" or Device_ID = "20FD79" or Device_ID = "2101E9" or Device_ID = "2102AC" or Device_ID = "1CB0C2" or Device_ID = "1CB021" or Device_ID = "1CB0D4 ';  
  co2Device = '1C8876';
  lightDevice = '20FE30" or Device_ID = "210043" or Device_ID = "21034E" or Device_ID = "2100AB" or Device_ID = "210285" or Device_ID = "1CB001" or Device_ID = "1CB049" or Device_ID = "1CB00D';
    

  pieLightArr = [];
  pieTempArr = [];
  pieHumiArr = [];
  pieCO2Arr = [];

  pieLightDevice = [];
  pieTempDevice = [];
  pieHumiDevice = [];
  pieCO2Device = [];

  public brandPrimary = '#20a8d8';
  public brandSuccess = '#4dbd74';
  public brandInfo = '#63c2de';
  public brandWarning = '#f8cb00';
  public brandDanger = '#f86c6b';

  faceArr = [];
  tempArr = [];
  testDevice = '2102CB';
  testDate = '2017-09-12';
  timeFaceArr = [];
  timeTempArr = [];
  showTempTime = [];
  showFaceTime = [];
  rawTimeTemp;
  rawTimeFace;

  ngOnInit() {
   this.retrieveFace();
   this.retrieveTemp();
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
      this.co2Device = '1C8876';
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
    else if (room == 'All Locations'){
      this.tempDevice = '2102CB" or Device_ID = "210088" or Device_ID = "20FD79" or Device_ID = "2101E9" or Device_ID = "2102AC" or Device_ID = "1CB0C2" or Device_ID = "1CB021" or Device_ID = "1CB0D4 ';  
      this.co2Device = '1C8876';
      this.lightDevice = '20FE30" or Device_ID = "210043" or Device_ID = "21034E" or Device_ID = "2100AB" or Device_ID = "210285" or Device_ID = "1CB001" or Device_ID = "1CB049" or Device_ID = "1CB00D';
    }
    if(this.num == 7){
      this.weekClick();
    }else if (this.num==1){
      this.monthClick();
    }
    
  }
  // GetRoom(device:string){
    
  //   if(device == "2102CB" || device =="20FE30"){
  //     this.tempLabels.push('IIT1-6-59');
  //     this.pieCO2Device.push('IIT1-6-59') ;
  //     this.pieLightDevice.push('IIT1-6-59') ;
  //   } else if (device== "210043" || device =="210088" ){
  //     this.tempLabels.push( 'IIT1-6-60');
  //     this.pieCO2Device.push('IIT1-6-60') ;
  //     this.pieLightDevice.push('IIT1-6-60') ;
  //   } else if (device == "21034E" || device =="20FD79"){
  //     this.tempLabels.push('IIT1-6-61');
  //     this.pieCO2Device.push('IIT1-6-61') ;
  //     this.pieLightDevice.push('IIT1-6-61') ;
  //   } else if (device == "210285" || device =="2102AC"){
  //     this.tempLabels.push('IIT3-7-50/2');
  //     this.pieCO2Device.push('IIT3-7-50/2') ;
  //     this.pieLightDevice.push('IIT3-7-50/2') ;
  //   } else if (device == "2100AB"|| device =="2101E9"){
  //     this.tempLabels.push('IIT3-7-46');
  //     this.pieCO2Device.push('IIT3-7-46') ;
  //     this.pieLightDevice.push('IIT3-7-46') ;
  //   } else if (device == "1CB001" || device =="1CB0C2"){
  //     this.tempLabels.push('IIT3-8-32');
  //     this.pieCO2Device.push('IIT3-8-32') ;
  //     this.pieLightDevice.push('IIT3-8-32') ;
  //   } else if (device == "1CB00D" || device =="1CB0D4"){
  //     this.tempLabels.push('IoTLab') ;
  //     this.pieCO2Device.push('IoTLab') ;
  //     this.pieLightDevice.push('IoTLab') ;
  //   } else if (device == "1CB049"|| device =="1CB021"){
  //     this.tempLabels.push('BigData');
  //     this.pieCO2Device.push('BigData') ;
  //     this.pieLightDevice.push('BigData') ;
  //   }
    
  // }
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
  // callAll(){
  //     this.tempCall();
  //     this.humiCall();
  //     this.lightCall();
  //     this.CO2Call();

  // }

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
      
      // this.callAll();
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
      

      // this.callAll();
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
      // this.callAll();
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
      

      // this.callAll();
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
    // this.callAll();
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
    // this.callAll();
    
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


  
//call light data    
  lightCall(){
    this.pieLightArr = [];
    this.pieLightDevice = [];
    //this.retrievePieLight();
  }
  // retrievePieLight(){
  //   this.dataService.getLightPie(this.startDate,this.endDate).map(response => {
  //     for(var item of response){
  //     this.pieLightArr.push(item.average);
  //     //this.GetRoom(item.device);
      
  //     }
  //   }).subscribe(()=>{
  //     console.log(JSON.stringify(this.pieTempDevice[0]));
  //     console.log(parseFloat(this.pieTempArr[0]));
  //   });
  // }
//call face data
  retrieveFace(){
    this.dataService.getFaceAll().map(response => {
      for(var item of response){
      this.faceArr.push(parseFloat(item.percentage));
      //console.log("facearr:" + this.faceArr);
      var rawTimeFace = item.Time;
      this.showFaceTime.push(rawTimeFace);
      var time = moment.tz(rawTimeFace, "Asia/singapore");
      this.timeFaceArr.push(time);
      console.log("timearrface:"+this.showFaceTime)
    }
    }).subscribe(()=>{
      this.refreshTemp();
    });
  }
  
  retrieveTemp(){
     this.dataService.getTempHumiData(this.testDevice,this.testDate,).map(response => {
        for(var item of response){
        this.tempArr.push(parseFloat(item.Temperature));
        //console.log("temparr:"+this.tempArr)
        var rawTimeTemp = item.Date;
        this.showTempTime.push(rawTimeTemp);
        var time = moment.tz(rawTimeTemp, "Asia/singapore");
        this.timeTempArr.push(time);
        console.log("timearrtemp:"+this.showTempTime)
        }
      }).subscribe(()=>{
        this.refreshTemp();
      });
  }
  refreshTemp(){
      this.faceData = [
            {
            label: this.rawTimeFace,
            data: this.tempArr,
            yAxisID: 'left-y-axis'
          },
            {
            label: this.rawTimeTemp,
            data: this.faceArr,
            yAxisID: 'right-y-axis'

          },
        ]
      setTimeout(() => {
        this.faceLabels=this.timeFaceArr;
        //this.tempLabels=this.timeTempArr;
      });
  }

 
//call temperature data  
  // tempCall(){
  //   this.pieTempArr = [];
  //   this.pieTempDevice = [];
  //   this.retrievePieTemp();
  // } 
  // retrievePieTemp(){
  //   this.dataService.getTempPie(this.startDate,this.endDate).map(response => {
  //     for(var item of response){
  //     this.pieTempArr.push(parseFloat(item.average));
  //     //this.GetRoom(item.device);
  //     }
  //   }).subscribe(()=>{
  //     //this.tempLabels = this.pieTempDevice;
  //     // this.tempData = this.pieTempArr;
  //     // console.log(this.pieTempDevice);
  //     // console.log(this.tempLabels);
  //   });
  // }

 
//call humidity data  
  // humiCall(){
  //   this.pieHumiArr = [];
  //   this.pieHumiDevice = [];
  //   this.retrievePieHumi();
  // }
  // retrievePieHumi(){
  //     this.dataService.getHumiPie(this.startDate,this.endDate).map(response => {
  //       for(var item of response){
  //       this.pieHumiArr.push(item.average);
  //       //this.GetRoom(item.device);
  //       }
  //     }).subscribe(()=>{
  //     });
  // } 
  

//call CO2 data  
  // CO2Call(){
  //   this.pieCO2Arr = [];
  //   this.pieCO2Device = [];
  //   this.retrievePieCO2();
  // }
  // retrievePieCO2(){
  //     this.dataService.getCO2Pie(this.startDate,this.endDate).map(response => {
  //       for(var item of response){
  //       this.pieCO2Arr.push(item.average);
  //       //this.GetRoom(item.device);        
  //      }
  //     }).subscribe(()=>{
  //     });
  // }



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
//face
private faceData = [
    {
      label: [],
      data: [],
      yAxisID: 'left-y-axis'

    },
    {
      label: [],
      data: [],
      yAxisID: 'right-y-axis'
    },
];
public faceLabels: Array<any> = [];
public faceColour = [
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
                tooltipFormat: 'YYYY-MM-DD hh:mm A'
            },
            scaleLabel: {
                display: false,
                labelString: 'Time'
            }
        },],
        yAxes: [{
          // ticks: {
          //   beginAtZero: false
          // },
          id: 'left-y-axis',
          type: 'linear',
          position: 'left'

        },
        {
          id: 'right-y-axis',
          type: 'linear',
          position: 'right'
        }]
      }
      
};


};
  
  
  // private optionsLineChart = {
  //       animation: false,
  //       responsive: true,
  //       maintainAspectRatio:true,
  //       scales: {
  //         xAxes: [{
  //             display: true,
  //             type: "time",
  //             time: {
  //                 unit: "hour",
  //                 tooltipFormat: 'YYYY-MM-DD hh:mm A'
  //             },
  //             scaleLabel: {
  //                 display: false,
  //                 labelString: 'Time'
  //             }
  //         },],
  //         yAxes: [{
  //           ticks: {
  //             beginAtZero: false
  //           },
            

  //         }]
  //       }
  //   };
