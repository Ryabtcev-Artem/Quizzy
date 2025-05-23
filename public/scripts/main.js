import Menu from "./Menu.js";
import Tabs from "./Tabs.js";
import Tooltip from "./Tooltip.js";
import CardRotate from "./CardRotate.js";
import LoadTestsInfo from "./LoadTestsInfo.js";
import LoadPassPage from "./LoadPassPage.js";
import Slider from "./Slider.js";
import LoadTestPage from "./LoadTestPage.js"
const path = window.location.pathname
new Menu();
if (path.startsWith('/index') || path === '/'){
    new Tabs();
    new Slider()
}
new Tooltip();
new CardRotate();
if (path.startsWith('/tests-')){
    new LoadTestPage()
}
new LoadTestsInfo();
if (path.startsWith('/passes-')){
    new LoadPassPage()
}
