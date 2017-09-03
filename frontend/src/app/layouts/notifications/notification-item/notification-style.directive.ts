import { Directive, OnInit, Renderer2, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appNotificationStyle]'
})
export class NotificationStyleDirective {

  @HostBinding('class.callout callout-warning m-0 py-3') isOpen = false;
  @Input() type;
  @Input() location;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
   }

  ngOnInit(){
      console.log("Notification Style directive constructed! Device Type is " + this.type);
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue',);
    // this.backgroundColor = "red";

    if(this.type === "light"){
      this.renderer.addClass(this.elRef, "callout callout-warning m-0 py-3");
    }
  }
}


