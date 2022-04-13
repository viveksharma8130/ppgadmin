import http from "./http-common";

class DataService {
  // Login Services
  Login(data) {
    return http.get("admin/login?" + data);
  }

  // Banner Services
  BannerAll() {
    return http.get(`/banner/admin/all`);
  }
  BannerAdd(data) {
    return http.post(`/banner/create`, data);
  }
  BannerUpdate(id, data) {
    return http.patch(`/banner/update/${id}`, data);
  }
  BannerDelete(id) {
    return http.delete(`/banner/delete/${id}`);
  }

  // Article Services
  ArticleAll() {
    return http.get(`/article/admin/all`);
  }
  ArticleAdd(data) {
    return http.post(`/article/create`, data);
  }
  ArticleUpdate(id, data) {
    return http.patch(`/article/update/${id}`, data);
  }
  ArticleDelete(id) {
    return http.delete(`/article/delete/${id}`);
  }

  // Filter Services
  FilterAll() {
    return http.get(`/filter/admin/all`);
  }
  FilterAdd(data) {
    return http.post(`/filter/create`, data);
  }
  FilterUpdate(id, data) {
    return http.patch(`/filter/update/${id}`, data);
  }
  FilterDelete(id) {
    return http.delete(`/filter/delete/${id}`);
  }

  // Category Services
  CategoryAll() {
    return http.get(`/category/admin/all`);
  }
  CategoryAdd(data) {
    return http.post(`/category/create`, data);
  }
  CategoryAllFilterById(id) {
    return http.get(`/category/id/${id}`);
  }
  CategoryUpdate(id, data) {
    return http.patch(`/category/update/${id}`, data);
  }
  CategoryDelete(id) {
    return http.delete(`/category/delete/${id}`);
  }

  // Pooja Booking Services
  PoojaBookingAll() {
    return http.get(`/puja/admin/all`);
  }
  PoojaBookingAdd(data) {
    return http.post(`/puja/create`, data);
  }
  PoojaBookingUpdate(id, data) {
    return http.patch(`/puja/update/${id}`, data);
  }
  PoojaBookingDelete(id) {
    return http.delete(`/puja/delete/${id}`);
  }

  // Pooja Booking Packages Services
  PoojaBookingAllPackages(id) {
    return http.get(`/puja_packages/puja/${id}`);
  }
  PoojaBookingAddPackges(data) {
    return http.post(`/puja_packages/create`, data);
  }
  PoojaBookingUpdatePackges(id, data) {
    return http.patch(`/puja_packages/update/${id}`, data);
  }
  PoojaBookingDeletePackges(id) {
    return http.delete(`/puja_packages/delete/${id}`);
  }

  // Product Services
  ProductAll() {
    return http.get(`/product/admin/all`);
  }

  ProductAdd(data) {
    return http.post(`/product/create`, data);
  }
  ProductById(id) {
    return http.get(`/product/id/${id}`);
  }
  ProductUpdate(id, data) {
    return http.patch(`/product/update/${id}`, data);
  }
  ProductDelete(id) {
    return http.delete(`/product/delete/${id}`);
  }

  // Product Packages Services
  ProductAllVariant(id) {
    return http.get(`/product_variant/product/${id}`);
  }
  ProductCreateVariant(data) {
    return http.post(`/product_variant/create`, data);
  }
  ProductUpdateVariant(id, data) {
    return http.patch(`/product_variant/update/${id}`, data);
  }
  ProductDeleteVariant(id) {
    return http.delete(`/product_variant/delete/${id}`);
  }
}

export default new DataService();
