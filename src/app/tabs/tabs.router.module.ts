import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'details',
        children: [
          {
            path: ':id',
            loadChildren: '../details/details.module#DetailsPageModule'
          }
        ]
      },
      {
        path: 'edit',
        children: [
          {
            path: ':id',
            loadChildren: '../create/create.module#CreatePageModule'
          }
        ]
      },
      {
        path: 'create',
        children: [
          {
            path: '',
            loadChildren: '../create/create.module#CreatePageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: 'list',
        children: [
          {
            path: '',
            loadChildren: '../list/list.module#ListPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/details',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
