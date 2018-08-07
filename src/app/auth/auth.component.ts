import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  constructor(public router: Router) {}

  ngOnInit() {
    var token = window.location.href.split('?token=')[1];
    localStorage.setItem('token', token);
    this.router.navigate(['dashboard']);
  }
}
