import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {
  AngularFireAuthGuard,
  hasCustomClaim,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToMenu = () => redirectLoggedInTo(['menu']);

const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToMenu}
    },
    {
        path: 'registration',
        loadChildren: './pages/registration/registration.module#RegistrationPageModule',
        canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectLoggedInToMenu}
    },
    {
        path: 'terms', loadChildren: './pages/terms/terms.module#TermsPageModule'
    },
    {
        path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule', canActivate: [AngularFireAuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
    },
  { path: 'goals', loadChildren: './pages/goals/goals.module#GoalsPageModule' },
  { path: 'goals-detail', loadChildren: './pages/goals-detail/goals-detail.module#GoalsDetailPageModule' }
    // { path: 'admin-dashboard', loadChildren: './pages/<path-to-admin-dashboard>', canActivate: [AngularFireAuthGuard],
    //     data: {authGuardPipe: adminOnly} }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
