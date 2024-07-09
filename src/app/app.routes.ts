import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        title: "Home Page",
        loadComponent: () => import('./components/pages/home/home.component')
    },
    {
        path: "create-bovine",
        title: "Adicionar Bovino",
        loadComponent: () => import('./features/create/create.component')
    },
    {
        path: "edit/:id",
        title: "Alterar Bovino",
        loadComponent: () => import('./features/edit/edit.component')
    },
    {
        path: "view-bovine/:id",
        title: "Bovino",
        loadComponent: () => import('./features/table/table.component')
    },
    {
        path: "**",
        title: "Página não Encontrada",
        loadComponent: () => import('./features/not-found/not-found.component')
    }
];
