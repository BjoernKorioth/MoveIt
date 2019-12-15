import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'leaderboard', loadChildren: './pages/leaderboard/leaderboard.module#LeaderboardPageModule' },
  { path: 'newsfeed', loadChildren: './pages/newsfeed/newsfeed.module#NewsfeedPageModule' },
  { path: 'rewards', loadChildren: './pages/rewards/rewards.module#RewardsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'information', loadChildren: './pages/information/information.module#InformationPageModule' },
  { path: 'progress', loadChildren: './pages/progress/progress.module#ProgressPageModule' },
  { path: 'edit-activity', loadChildren: './pages/edit-activity/edit-activity.module#EditActivityPageModule' },
  { path: 'add-activity', loadChildren: './pages/add-activity/add-activity.module#AddActivityPageModule' },
  { path: 'edit-goal', loadChildren: './pages/edit-goal/edit-goal.module#EditGoalPageModule' },
  { path: 'registration', loadChildren: './pages/registration/registration.module#RegistrationPageModule' },
  { path: 'log-in', loadChildren: './pages/log-in/log-in.module#LogInPageModule' },
  { path: 'terms-of-use', loadChildren: './pages/terms-of-use/terms-of-use.module#TermsOfUsePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
