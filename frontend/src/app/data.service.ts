import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  //retrieve data
    getTempHumiData(device, date)
    {
      return this.http.get('http://localhost:3000/api/temphumiddata/device/' + device + '/' + date)
        .map(res => res.json());
    }
    getCO2Data(device, date)
    {
      return this.http.get('http://localhost:3000/api/co2data/device/' + device + '/' + date)
        .map(res => res.json());
    }
    getLightData(device, date)
    {
      return this.http.get('http://localhost:3000/api/lightdata/device/' + device + '/' + date)
        .map(res => res.json());
    }

    getLightWeekData(device, startDate,endDate)
    {
      return this.http.get('http://localhost:3000/api/lightdata/test/device/' + device + '/' + startDate +'/'+ endDate)
        .map(res => res.json());
    }
    getTempHumiWeekData(device, startDate,endDate)
    {
      return this.http.get('http://localhost:3000/api/temphumiddata/test/device/' + device + '/' + startDate +'/'+ endDate)
        .map(res => res.json());
    }
    getCo2WeekData(device, startDate,endDate)
    {
      return this.http.get('http://localhost:3000/api/co2data/device/' + device + '/' + startDate +'/' + endDate)
        .map(res => res.json());
  }
  // average
    getLightAverageDay(device, startDate, endDate)
    {
      return this.http.get('http://localhost:3000/api/lightdata/average/device/' + device + '/' + startDate + '/' + endDate)
        .map(res => res.json());
    }
    getLightAverage(device, startDate, endDate)
    {
      return this.http.get('http://localhost:3000/api/lightdata/average/device/' + device + '/' + startDate + '/' + endDate + '/all' )
        .map(res => res.json());
    }
    getTempAverageDay(device, startDate, endDate )
    {
      return this.http.get('http://localhost:3000/api/tempdata/average/device/' + device + '/' + startDate + '/' + endDate  )
        .map(res => res.json());
    }
    getTempAverage(device, startDate, endDate)
    {
      return this.http.get('http://localhost:3000/api/tempdata/average/device/' + device + '/' + startDate + '/' + endDate + '/all' )
        .map(res => res.json());
    }
    getHumiAverageDay(device, startDate, endDate )
    {
      return this.http.get('http://localhost:3000/api/humidata/average/device/' + device + '/' + startDate + '/' + endDate  )
        .map(res => res.json());
    }
    getHumiAverage(device, startDate, endDate)
    {
      return this.http.get('http://localhost:3000/api/humidata/average/device/' + device + '/' + startDate + '/' + endDate + '/all' )
        .map(res => res.json());
    }
    getCO2AverageDay(device, startDate, endDate )
    {
      return this.http.get('http://localhost:3000/api/co2data/average/device/' + device + '/' + startDate + '/' + endDate)
        .map(res => res.json());
    }
    getCO2Average(device, startDate, endDate)
    {
      return this.http.get('http://localhost:3000/api/co2data/average/device/' + device + '/' + startDate + '/' + endDate + '/all')
        .map(res => res.json());
  }
  // max
    getLightMaxDay(device, startDate, endDate)
    {
      return this.http.get('http://localhost:3000/api/lightdata/max/device/' + device + '/' + startDate + '/' + endDate )
        .map(res => res.json());
    }
    getLightMax(device)
    {
      return this.http.get('http://localhost:3000/api/lightdata/max/device/' + device)
        .map(res => res.json());
    }
    getTempMaxDay(device, startDate, endDate )
    {
      return this.http.get('http://localhost:3000/api/tempdata/max/device/' + device + '/' + startDate + '/' + endDate  )
        .map(res => res.json());
    }
    getTempMax(device)
    {
      return this.http.get('http://localhost:3000/api/tempdata/max/device/' + device)
        .map(res => res.json());
    }
    getHumiMaxDay(device, startDate, endDate )
    {
      return this.http.get('http://localhost:3000/api/humidata/max/device/' + device + '/' + startDate + '/' + endDate  )
        .map(res => res.json());
    }
    getHumiAMax(device)
    {
      return this.http.get('http://localhost:3000/api/humidata/max/device/' + device)
        .map(res => res.json());
    }
    getCO2MaxDay(device, startDate, endDate )
    {
      return this.http.get('http://localhost:3000/api/co2data/max/device/' + device + '/' + startDate + '/' + endDate  )
        .map(res => res.json());
    }
    getCO2Max(device)
    {
      return this.http.get('http://localhost:3000/api/co2data/max/device/' + device)
        .map(res => res.json());
  }
  // min
    getLightMinDay(device, startDate, endDate)
    {
      return this.http.get('http://localhost:3000/api/lightdata/min/device/' + device + '/' + startDate + '/' + endDate )
        .map(res => res.json());
    }
    getLightMin(device)
    {
      return this.http.get('http://localhost:3000/api/lightdata/min/device/' + device)
        .map(res => res.json());
    }
    getTempMinDay(device, startDate, endDate )
    {
      return this.http.get('http://localhost:3000/api/tempdata/min/device/' + device + '/' + startDate + '/' + endDate  )
        .map(res => res.json());
    }
    getTempMin(device)
    {
      return this.http.get('http://localhost:3000/api/tempdata/min/device/' + device)
        .map(res => res.json());
    }
    getHumiMinDay(device, startDate, endDate )
    {
      return this.http.get('http://localhost:3000/api/humidata/min/device/' + device + '/' + startDate + '/' + endDate  )
        .map(res => res.json());
    }
    getHumiAMin(device)
    {
      return this.http.get('http://localhost:3000/api/humidata/min/device/' + device)
        .map(res => res.json());
    }
    getCO2MinDay(device, startDate, endDate )
    {
      return this.http.get('http://localhost:3000/api/co2data/min/device/' + device + '/' + startDate + '/' + endDate  )
        .map(res => res.json());
    }
    getCO2Min(device)
    {
      return this.http.get('http://localhost:3000/api/co2data/min/device/' + device)
        .map(res => res.json());
  }
  // battery
    getBatteryLevel(device) {//
      return this.http.get('http://localhost:3000/api/battery/' + device)//
      .map(res => res.json());
    }

  // facedata
    getFaceAll() {
      return this.http.get('http://localhost:3000/api/facedata/all')
      .map((res) => res.json());
    }
    getTempSession(device, date, startHour, endHour) {
      return this.http.get('http://localhost:3000/api/facedata/tempdata/' + device + '/' + date + '/' + startHour + '/' + endHour)
        .map(res => res.json());
    }
    getFaceData(date) {
      return this.http.get('http://localhost:3000/api/facedata/' + date)
      .map((res) => res.json());
    }
    getFaceSession(date, startHour, endHour) {
      return this.http.get('http://localhost:3000/api/facedata/' + date + '/' + startHour + '/' + endHour)
      .map((res) => res.json());
    }


  // switchcontrol
    switchToggle(dev, command) {
      return this.http.get('http://192.168.2.81:8181/device.cgi?dev=' + dev + '&cmd=' + command)
      .map((res) => res.json());
    }

  // get mode
    getMode() {
      return this.http.get('http://localhost:4000/getmode')
      .map((res) => res.json());
    }

  // change mode
    changeMode(mode) {
      return this.http.get('http://localhost:4000/changemode/' + mode)
      .map((res) => res.json());
    }

  // retrieve mock temperature
    getMockTemp() {
      return this.http.get('http://localhost:4000/gettemp')
      .map(res => res.json());
    }

  // retrive mock light
    getMockLight() {
      return this.http.get('http://localhost:4000/getlight')
      .map(res => res.json());
    }

    // post mock data
    postMockData(body) {
      return this.http.post('http://localhost:4000/postmock', body);
    }

    getSwitchStatus(number) {
      return this.http.get('http://192.168.2.81:8181/device.cgi?dev=' + number + '&cmd=128');
    }

  //range data
    getRangeMaxTemp(device,startDate,endDate )
    {
      return this.http.get('http://localhost:3000/api/temp/maxdata/'+ device + '/'+ startDate+ '/' + endDate)
        .map(res => res.json());
    } 
  getRangeMinTemp(device,startDate,endDate )
    {
      return this.http.get('http://localhost:3000/api/temp/mindata/'+ device + '/'+ startDate+ '/' + endDate)
        .map(res => res.json());
    }
  getRangeMaxHumi(device,startDate,endDate )
    {
      return this.http.get('http://localhost:3000/api/humi/maxdata/'+ device + '/'+ startDate+ '/' + endDate)
        .map(res => res.json());
    } 
  getRangeMinHumi(device,startDate,endDate )
    {
      return this.http.get('http://localhost:3000/api/humi/mindata/'+ device + '/'+ startDate+ '/' + endDate)
        .map(res => res.json());
    }
  getRangeMaxCO2(device,startDate,endDate )
    {
      return this.http.get('http://localhost:3000/api/co2/maxdata/'+ device + '/'+ startDate+ '/' + endDate)
        .map(res => res.json());
    } 
  getRangeMinCO2(device,startDate,endDate )
    {
      return this.http.get('http://localhost:3000/api/co2/mindata/'+ device + '/'+ startDate+ '/' + endDate)
        .map(res => res.json());
    }
  getRangeMaxLight(device,startDate,endDate )
    {
      return this.http.get('http://localhost:3000/api/light/maxdata/'+ device + '/'+ startDate+ '/' + endDate)
        .map(res => res.json());
    } 
  getRangeMinLight(device,startDate,endDate )
    {
      return this.http.get('http://localhost:3000/api/light/mindata/'+ device + '/'+ startDate+ '/' + endDate)
        .map(res => res.json());
    }
}
