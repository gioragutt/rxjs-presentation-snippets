import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { routes } from '../app-routing.module';
import { Routes, Route } from '@angular/router';

interface Link {
  name: string;
  link: string;
}

interface LinkGroup {
  group: string;
  links: Link[];
}

interface LinkGroups {
  ungrouped: Link[];
  grouped: LinkGroup[];
}

const createLinkGroups = (allRoutes: Routes): LinkGroups => {
  const grouped = allRoutes.reduce((acc: Record<string, Link[]>, curr: Route) => {
    const key = curr.data.group || '__';
    acc[key] = [...(acc[key] || []), ({
      name: curr.data.name,
      link: curr.path,
    })];
    return acc;
  }, {});

  const { __: ungrouped, ...rest } = grouped;
  return {
    ungrouped,
    grouped: Object.entries(rest)
      .map(([group, links]) => ({ group, links })),
  };
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
