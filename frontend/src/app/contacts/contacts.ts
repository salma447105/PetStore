import { Component } from '@angular/core';
import { LucideAngularModule, MapPin, Mail, Phone, Clock } from 'lucide-angular';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './contacts.html',
  styles: ``,
})
export class Contacts {
  icons = { MapPin, Mail, Phone, Clock };
}
