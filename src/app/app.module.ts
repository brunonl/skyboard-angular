import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptProviders } from './interceptors';
import { PagesModule } from './pages/pages.module';
import { FooterModule } from './shared/components/footer/footer.module';
import { HeaderModule } from './shared/components/header/header.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PagesModule,
        HeaderModule,
        FooterModule
    ],
    providers: [
        httpInterceptProviders,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
