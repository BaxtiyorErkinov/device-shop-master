import { App } from 'vue';

//plugins
import router from '@/router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

export function registerPlugins(app: App) {
  app.use(router).use(ElementPlus);
}
