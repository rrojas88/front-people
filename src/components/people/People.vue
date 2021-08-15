<template>
	<div class="card">
		<h5 class="card-header">
			LISTADO DE PERSONAS
		</h5>
		<div class="card-body">
			
			<div class="text-end">
				<a href="#" class="btn btn-primary mb-3 "
				@click="loadRows"
				>
					Recargar lista
				</a>
			</div>
			
			<div class="row align-items-center table-responsive">
				<table class="table table-striped table-bordered table-sm table-hover">
					<thead>
						<tr>
								<th class="text-center">
									ID
								</th>
								<th class="text-center">
									NOMBRE
								</th>
								<th class="text-center">
									CORREO
								</th>
								<th class="text-center">
									TElÉFONO
								</th>
								<th class="text-center" colspan="2">
									OPCIONES
								</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, ind) in rowsPeople" 
						:key="ind" >
							<td>{{item.id}}</td>
							<td>{{item.name}}</td>
							<td>{{item.phone_number}}</td>
							<td>{{item.email_address}}</td>
							<td class="text-center">
								<router-link 
								class="btn btn-info"
								:to="{name:'PeopleForm', params: {id: item.id} }">
									Editar
								</router-link> 
							</td>
							<td class="text-center">
								<button type="button" class="btn btn-danger"
								@click="confirmDelete( item.id )"
								>
									Borrar
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { httpGet, httpDel } from '../../config/services'

export default {
	name: 'People',
	setup(){
		let rowsPeople = ref([])


		onMounted( () => {
			loadRows()
      	})

		const loadRows = async () => {
			const data = await httpGet('people')
			if( data.error ){
				alert( data.message )
				return
			}
			rowsPeople.value = data.data
		}

		const deleteRow = async ( id ) => {
			const data = await httpDel('people', id)
			if( data.error ){
				alert( data.message )
				return
			}
			loadRows()
		}

		const confirmDelete = ( id ) => {
			const r = confirm('Desea borrar el registro ?')
			if( r == true ){
				deleteRow( id )
			}
		}

		return {
			rowsPeople,
			loadRows,
			confirmDelete,
		}
	}
}
</script>

<style scoped>

</style>
