import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NavController} from '@ionic/angular';

import {AuthenticateService} from '../../services/authentication/authentication.service';
import {User} from '../../model/user';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    validationsForm: FormGroup;
    errorMessage = '';
    successMessage = '';

    validationMessages = {
        email: [
            {type: 'required', message: 'Email is required.'},
            {type: 'pattern', message: 'Enter a valid email.'}
        ],
        password: [
            {type: 'required', message: 'Password is required.'},
            {type: 'minlength', message: 'Password must be at least 6 characters long.'}
        ],
        name: [
            {type: 'required', message: 'Please enter a name'}
        ],
        birthday: [{type: 'required', message: 'Please set a birthday'}],
        gender: [{type: 'required', message: 'Please choose your gender'}],
        terms: [{type: 'required', message: 'Please accept the terms'}]
    };
    bday: Date;
    maxDate: number = new Date().getFullYear() - 18;

    constructor(
        private navCtrl: NavController,
        private authService: AuthenticateService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.validationsForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            password: new FormControl('', Validators.compose([
                Validators.minLength(5),
                Validators.required
            ])),
            username: new FormControl('', Validators.required),
            // surname: new FormControl('', Validators.required),
            birthday: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            terms: new FormControl('', Validators.requiredTrue),
            code: new FormControl('', Validators.required)
        });
    }

    tryRegister(value) {
        if(this.calculateAge(this.bday) < 18){
            return;
        }

        // TODO check if terms are accepted
        const user = new User();
        user.name = value.username;
        user.gender = value.gender;
        user.profilePictureUrl="https://firebasestorage.googleapis.com/v0/b/moveit-2019.appspot.com/o/profilePic%2FdefaultPic?alt=media&token=77281e2a-9855-4b8a-b8dc-74ee60092cc4";       
        user.birthday = new Date(value.birthday);
        user.birthday.setHours(0,0,0,0);
        this.authService.registerUser(value.code, value.email, value.password, user)
            .then(res => {
                console.log(res);
                this.errorMessage = '';
                this.successMessage = 'Your account has been created. Please log in.';
                this.navCtrl.navigateRoot('/menu/dashboard');
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
                this.successMessage = '';
            });
    }

    calculateAge(birthday: Date) {
        this.bday = new Date(birthday);
        const timeDiff = Math.abs(Date.now() - this.bday.getTime());
        return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);

    }

    goLoginPage() {
        this.navCtrl.navigateBack('');
    }

}
