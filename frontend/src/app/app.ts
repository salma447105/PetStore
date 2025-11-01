import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from './footer/footer';
import { ToastComponent } from './toast/toast';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar,Footer,ToastComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
