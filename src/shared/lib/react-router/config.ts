import { register } from "module";

export const pathKeys = {
  root: '/',
  home() {
    return pathKeys.root;
  },
  about() {
    return pathKeys.root.concat('about/');
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
    return pathKeys.root.concat('loyalty-programs/');
  },
  forgotPassword(){
    return pathKeys.root.concat("forgot-password/")
  },
  ranking() {
    return pathKeys.root.concat('ranking/');
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
