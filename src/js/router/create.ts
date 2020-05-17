import VueRouter from "vue-router";
import PortfolioPageComponent from "../components/pages/portfolio.vue";
import AboutMePageComponent from "../components/pages/about-me.vue";
import BlogPageComponent from "../components/pages/blog.vue";
import ResumePageComponent from "../components/pages/resume.vue";
import ProjectPageComponent from "../components/pages/project.vue";

const routes = [
    // {path: "/", name: "", redirect: "/blog"},
    // {path: "/blog", name: "", component: BlogPageComponent},
    {path: "/", name: "index", redirect: "/resume"},
    {path: "/resume", name: "resume", component: ResumePageComponent},
    {path: "/portfolio", name: "portfolio", component: PortfolioPageComponent},
    {path: "/portfolio/:keyword", name: "project", component: ProjectPageComponent},
    {path: "/about-me", name: "about-me", component: AboutMePageComponent},
]

export default function createStore() {
    return new VueRouter({
        linkActiveClass: "active",
        routes
    })
}
