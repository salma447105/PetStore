import { Component } from '@angular/core';
import { Clock, LucideAngularModule, Mail, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-contacts',
  imports: [LucideAngularModule],
  templateUrl: './contacts.html',
  styles: ``
})
export class Contacts {
  icons ={Map,Mail,MapPin, Clock}

}
