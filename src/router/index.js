import {
    createRouter, createWebHistory
} from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobViews from "@/views/JobViews.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobView from "@/views/JobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import EditJobView from "@/views/EditJobView.vue";
import FromDocToHTML from "@/views/FromDocToHTML.vue";
import SplitView from "@/views/SplitView.vue";
import SplitView2 from "@/views/SplitView2.vue";
import ReplaceWord from "@/views/ReplaceWord.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobViews
        },
        {
            path: '/jobs/:id',
            name: 'job',
            component: JobView
        },
        {
            path: '/job/edit/:id',
            name: 'job-edit',
            component: EditJobView
        },
        {
            path: '/add-jobs',
            name: 'add-jobs',
            component: AddJobView
        },
        {
            path: '/word',
            name: 'from-word-to-html',
            component: FromDocToHTML
        },
        {
            path: '/splitview',
            name: 'split-view',
            component: SplitView
        },
        {
            path: '/splitview2',
            name: 'split-view2',
            component: SplitView2
        },
        {
            path: '/replace-word',
            name: 'replace-word',
            component: ReplaceWord
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView
        }
    ]
})
export default router;