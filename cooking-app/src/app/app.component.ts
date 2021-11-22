import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';
  loadedNavItem = 'recipe';

  onNavigate(navItem: string) {
    this.loadedNavItem = navItem;
  }
}
