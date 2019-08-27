import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';
import { AdminGuard } from './pages/admin/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule' },
  { path: 'games', loadChildren: './pages/games/games.module#GamesPageModule' },
  { path: 'teams', loadChildren: './pages/teams/teams.module#TeamsPageModule' },
  { path: 'ranks', loadChildren: './pages/ranks/ranks.module#RanksPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canLoad: [AuthGuard] },
  { path: 'selections', loadChildren: './pages/selections/selections.module#SelectionsPageModule', canLoad: [AuthGuard] },
  { path: 'support', loadChildren: './pages/support/support.module#SupportPageModule' },
  { path: 'admin/games', loadChildren: './pages/admin/games/games.module#GamesPageModule', canLoad: [AuthGuard, AdminGuard] },
  { path: 'admin/teams', loadChildren: './pages/admin/teams/teams.module#TeamsPageModule', canLoad: [AuthGuard, AdminGuard] },
  { path: 'admin/bowls', loadChildren: './pages/admin/bowls/bowls.module#BowlsPageModule', canLoad: [AuthGuard, AdminGuard] },
  { path: 'admin', loadChildren: './pages/admin/admin.module#AdminPageModule', canLoad: [AuthGuard, AdminGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
