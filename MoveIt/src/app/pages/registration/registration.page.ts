import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  goLoginPage(){
    this.navCtrl.navigateBack('');
  }

}
