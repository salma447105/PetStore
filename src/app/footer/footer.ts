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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
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
