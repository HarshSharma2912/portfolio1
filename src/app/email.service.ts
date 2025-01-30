import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId = 'service_m9p8nhc';
  private templateId = 'template_7o69167';
  private userId = 'W300uCPWQyEGWoLxC';

  constructor() {} 

  sendEmail(data: any): Promise<any> {
    return emailjs.send(this.serviceId, this.templateId, data, this.userId);
  }
}
