import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
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
            {type: 'minlength', message: 'Password must be at least 5 characters long.'}
        ],
        name: [
            {type: 'required', message: 'Please enter a name'}
        ],
        birthdate: [{type: 'required', message: 'Please set a birthday'}],
        gender: [{type: 'required', message: 'Please choose your gender'}],
        terms: [{type: 'required', message: 'Please accept the terms'}]
    };

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
            //surname: new FormControl('', Validators.required),
            birthdate: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            terms: new FormControl('', Validators.required),
            code: new FormControl('', Validators.required)
        });
    }

    tryRegister(value) {
        // TODO check if terms are accepted
        const user = new User();
        user.name = value.firstname + ' ' + value.lastname;
        user.gender = value.gender;
        user.birthdate = value.birthdate;
        this.authService.registerUser(value.otp, value.email, value.password, user)
            .then(res => {
                console.log(res);
                this.errorMessage = '';
                this.successMessage = 'Your account has been created. Please log in.';
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
                this.successMessage = '';
            });
    }

    goLoginPage() {
        this.navCtrl.navigateBack('');
    }

}
