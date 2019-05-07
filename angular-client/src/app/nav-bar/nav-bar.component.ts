import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() toggleSideNav = new EventEmitter<any>();

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

}
