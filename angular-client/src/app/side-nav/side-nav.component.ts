import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @Input() toggleSideNav:  boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

}
