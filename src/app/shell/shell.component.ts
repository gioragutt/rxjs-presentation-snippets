import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { routes } from '../app-routing.module';
import { Routes, Route } from '@angular/router';

interface Link {
  name: string;
  link: string;
  icon: string;
}

interface LinkGroup {
  group: string;
  links: Link[];
}

const createLinkGroups = (allRoutes: Routes): LinkGroup[] => {
  const grouped: Record<string, Link[]> = allRoutes.reduce((acc: Record<string, Link[]>, curr: Route) => {
    const key = curr.data.group || 'General';
    acc[key] = [...(acc[key] || []), ({
      name: curr.data.name,
      link: curr.path,
      icon: curr.data.icon,
    })];
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([group, links]) => ({ group, links }));
};

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  title = 'rxjs-presentation-snippets';
  linkGroups = createLinkGroups(routes);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches), shareReplay());

  constructor(private breakpointObserver: BreakpointObserver) { }
}
