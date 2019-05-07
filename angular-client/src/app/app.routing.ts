import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ChartComponent } from './chart/chart.component';
import { TablePageComponent } from './table-page/table-page.component';


const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent},
    { path: 'logout', redirectTo: 'login'},
    { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: 'table', component: TablePageComponent, canActivate: [AuthenticationGuard]},
    { path: 'chart', component: ChartComponent, canActivate: [AuthenticationGuard]},
    { path: '**', component: ErrorPageComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
