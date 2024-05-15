import { Routes } from '@angular/router';
import { LoginComponent } from './login//login.component';
import {TicTacToeComponent} from "./tic-tac-toe/tic-tac-toe.component";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'game', component: TicTacToeComponent}
];
