import BlHeader from 'viewsPath/components/HeaderPanel.vue';
import BlBreadcrumb from 'viewsPath/components/Breadcrumb.vue';
import BlCard from 'viewsPath/components/Card.vue';
import BlPageWrapper from 'viewsPath/components/PageWrapper.vue';

export default Vue => {
  Vue.component('bl-header', BlHeader);
  Vue.component('bl-breadcrumb', BlBreadcrumb);
  Vue.component('bl-card', BlCard);
  Vue.component('bl-page-wrapper', BlPageWrapper);
};
