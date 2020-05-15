import VueRouter from "vue-router";
import PortfolioPageComponent from "../components/pages/portfolio.vue";
import AboutMePageComponent from "../components/pages/about-me.vue";
import BlogPageComponent from "../components/pages/blog.vue";
import ResumePageComponent from "../components/pages/resume.vue";

const routes = [
    // {path: "/", redirect: "/blog"},
    // {path: "/about-me", component: AboutMePageComponent},
    // {path: "/blog", component: BlogPageComponent},
    {path: "/", redirect: "/resume"},
    {path: "/portfolio", component: PortfolioPageComponent},
    {path: "/resume", component: ResumePageComponent},
]

export default function createStore() {
    return new VueRouter({
        linkActiveClass: "active",
        routes
    })
}
