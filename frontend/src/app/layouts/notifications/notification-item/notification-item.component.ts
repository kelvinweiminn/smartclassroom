import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {

  @Input() notification;
  deviceId;
  location;
  message;
  style;

  constructor() { }

  ngOnInit() {
    this.deviceId = this.notification.Device_ID;
    //console.log("Device ID is " + this.deviceId);

    if (this.notification.Device_Type == 'light'){
      this.message = 'Lights were on!';
      this.style = 'callout callout-warning m-0 py-3';
    }

    if (this.notification.Device_ID == '1CB0D4'){
      this.location = 'IoT Lab';
    }else if (this.notification.Device_ID == '1CB021'){
      this.location = 'Big Data';
    }else if (this.notification.Device_ID == '1CB0C2'){
      this.location = '3-8-32';
    }else if (this.notification.Device_ID == '2101E9'){
      this.location = '3-7-46';
    }else if (this.notification.Device_ID == '20FD79'){
      this.location = '1-6-61';
    }else if (this.notification.Device_ID == '210088'){
      this.location = '1-6-60';
    }else if (this.notification.Device_ID == '2102AC'){
      this.location = '3-7-50';
    }else if (this.notification.Device_ID == '20FE30'){
      this.location = '1-6-59';
    }
  }

}
