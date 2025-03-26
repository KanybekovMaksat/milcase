import { register } from "module";

export const pathKeys = {
  root: '/',
  home() {
    return pathKeys.root;
  },
  favorite(){
    return pathKeys.root.concat('favorites/')
  },
  about() {
    return pathKeys.root.concat('about/');
  },
  cart() {
    return pathKeys.root.concat('cart/');
  },
  order(){
    return pathKeys.root.concat('order/')
  },
  terms() {
    return pathKeys.root.concat('terms-of-use/');
  },
  policy() {
    return pathKeys.root.concat('privacy-policy/');
  },
  login() {
    return pathKeys.root.concat('login/');
  },
  program() {
    return pathKeys.root.concat('course/');
  },
  loyalty() {
    return pathKeys.root.concat('loyalty/');
  },
  forgotPassword(){
    return pathKeys.root.concat("forgot-password/")
  },
  catalog() {
    return pathKeys.root.concat('catalog/');
  },
  register(){
    return pathKeys.root.concat('register/')
  },
  // group({ params }: { params: { slug: string } }) {
  //   return pathKeys.root.concat(`group/${params.slug}/`);
  // },
  course: {
    root() {
      return pathKeys.root.concat('courses/');
    },
    bySlug(slug: string) {
      return pathKeys.course.root().concat(`${slug}/`);
    },
  },
  profile: {
    root() {
      return pathKeys.root.concat('profile/');
    },
    badges() {
      return pathKeys.profile.root().concat('badges/');
    },
  },
};
