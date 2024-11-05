import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MaterialComponent} from './material/material.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tictactoe';
}
