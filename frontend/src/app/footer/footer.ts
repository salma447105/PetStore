import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.html',
})
export class Footer {
  currentYear = new Date().getFullYear();

  icons = {
    Facebook: FacebookIcon,
    Instagram: InstagramIcon,
    Twitter: TwitterIcon,
    Location: MapPinIcon,
    Phone: PhoneIcon,
    Mail: MailIcon,
  };
}
