import VueRouter from "vue-router";
import PortfolioPageComponent from "../components/pages/portfolio.vue";
import AboutMePageComponent from "../components/pages/about-me.vue";
import BlogPageComponent from "../components/pages/blog.vue";

const routes = [
    {path: "/", redirect: "/blog"},
    {path: "/blog", component: BlogPageComponent},
    {path: "/portfolio", component: PortfolioPageComponent},
    {path: "/about-me", component: AboutMePageComponent}
]

export default function createStore() {
    return new VueRouter({
        linkActiveClass: "active",
        routes
    })
}
