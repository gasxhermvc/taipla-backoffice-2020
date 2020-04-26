import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@based/services/app.service';
import { AuthService } from '@based/services/auth.service';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {

  constructor(
    public app: AppService,
    private auth: AuthService,
    private router: Router
  ) {
    (window as any).switcher = this;
  }

  ngOnInit() {
    this.onOk();
  }

  public logout() {
    this.app.showLoading();
    this.auth.logout().subscribe(response => {
      if (response.success) {
        // window.location.reload();
        this.router.navigate([this.app.env.auth.redirects.login]);
      } else {
        this.app.showDefaultError();
      }
      setTimeout(() => this.app.hideLoading(), 2000);
    });
  }

  public onOk() {
    this.router.navigate([this.app.env.auth.redirects.intent]);
  }

}
