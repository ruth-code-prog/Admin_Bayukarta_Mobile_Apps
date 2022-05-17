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
import { ListJadwal, TambahJadwal, ListUser, ListPasien, EditPasien,ListAppo, Dashboard, Icons, EditJadwal,} from'./views'

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
    path: "/pasien",
    name: "Pasien Terlayani",
    icon: "nc-icon nc-circle-10",
    component: ListPasien,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/pasien/edit/:id",
    name: "Edit Nomor Antrian Pasien Terlayani",
    component: EditPasien,
    layout: "/admin",
    sidebar: false,
  },
  {
    path: "/appo",
    name: "Appoitments",
    icon: "nc-icon nc-bullet-list-67",
    component: ListAppo,
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
