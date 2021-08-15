<template>
	<div class="container">
		<div class="row menu">
			<div class="col-12 text-center">
				<router-link to="/">Inicio</router-link> |
				<router-link to="/formulario">Formulario</router-link>
			</div>
		</div>
	
		<router-view />
	</div>
</template>

<style scoped>
.menu {
	margin: 40px 0 20px 0;
}
</style>
