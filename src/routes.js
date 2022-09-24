/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import EditUser from 'views/User/EditUser';
import TambahUser from 'views/User/TambahUser';
import { ListJadwal, TambahJadwal, ListUser, ListAppo, ListAssmit, Dashboard, Icons, EditJadwal,} from'./views'

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true,
  },
   {
    path: "/jadwal",
    name: "Jadwal Dokter",
    icon: "nc-icon nc-paper",
    component: ListJadwal,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/jadwal/tambah",
    name: "Tambah Jadwal Dokter",
    component: TambahJadwal,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/jadwal/edit/:id",
    name: "Edit Jadwal Dokter",
    component: EditJadwal,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/user",
    name: "List User",
    icon: "nc-icon nc-badge",
    component: ListUser,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/appo",
    name: "Appoitments Umum",
    icon: "nc-icon nc-diamond",
    component: ListAppo,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/assmit",
    name: "Appoitments Asuransi & Mitra",
    icon: "nc-icon nc-bullet-list-67",
    component: ListAssmit,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/user/tambah",
    name: "Tambah User",
    component: TambahUser,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/user/edit/:id",
    name: "Edit User ",
    component: EditUser,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    sidebar: true,
  },
];
export default routes;
