
import { createRouter, createWebHistory } from 'vue-router'

import People from '../components/people/People.vue'
import PeopleForm from '../components/people/PeopleForm.vue'

const routes = [
	{
		path: '/',
		name: 'People',
		component: People
	},
	{
		path: '/formulario/:id',
		name: 'PeopleForm',
		component: PeopleForm,
		props: true,
	},
	{
		path: '/formulario',
		name: 'PeopleFormSinParams',
		component: PeopleForm,
		props: true,
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
