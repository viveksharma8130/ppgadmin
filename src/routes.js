import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Login from "views/examples/Login.js";
import Banner from "views/examples/Banner";
import Article from "views/examples/Article";
import Filter from "views/examples/Filter";
import Category from "views/examples/Category";
import PoojaBooking from "views/examples/PoojaBooking";
import Package from "views/examples/Package";
import Products from "views/examples/Product";
import ProductAdds from "views/examples/ProductAdds";
import ProductEdit from "views/examples/EditProduct";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    show: true,
  },
  {
    path: "/banner",
    name: "Banner",
    icon: "ni ni-image text-primary",
    component: Banner,
    layout: "/admin",
    show: true,
  },
  {
    path: "/article",
    name: "Articles",
    icon: "ni ni-book-bookmark text-red",
    component: Article,
    layout: "/admin",
    show: true,
  },
  {
    path: "/pooja-booking",
    name: "Pooja Booking",
    icon: "ni ni-ruler-pencil text-success",
    component: PoojaBooking,
    layout: "/admin",
    show: true,
  },
  {
    path: "/add_package",
    name: "Add Package",
    icon: "ni ni-collection text-primary",
    component: Package,
    layout: "/admin",
    show: false,
  },
  {
    path: "/edit-product",
    name: "Edit Product",
    icon: "ni ni-collection text-primary",
    component: ProductEdit,
    layout: "/admin",
    show: false,
  },
  {
    name: "Product",
    icon: "ni ni-bullet-list-67 text-primary",
    show: true,
    collapse: true,
    views: [
      {
        path: "/filter",
        name: "Filter",
        icon: "ni ni-ui-04 text-primary",
        component: Filter,
        layout: "/admin",
        show: true,
      },
      {
        path: "/category",
        name: "Category",
        icon: "ni ni-ui-04 text-primary",
        component: Category,
        layout: "/admin",
        show: true,
      },
      {
        path: "/all-product",
        name: "All Product",
        icon: "ni ni-ui-04 text-primary",
        component: Products,
        layout: "/admin",
        show: true,
      },
      {
        path: "/add-product",
        name: "Add Product",
        icon: "ni ni-ui-04 text-primary",
        component: ProductAdds,
        layout: "/admin",
        show: true,
      },
    ],
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
    show: false,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    show: false,
  },
];
export default routes;
