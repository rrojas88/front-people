<template>
	<div class="card">
		<h5 class="card-header">
			REGISTRO DE PERSONAS
		</h5>
		<div class="card-body">

			<h5 class="card-title">
				Información personal
			</h5>
			
			<form class="row g-3">
				<div class="">
					<label for="name" class="form-label">
						Nombre
					</label>
					<input type="name" class="form-control" id="name" placeholder=""
					v-model="row.name"
					>
				</div>
				<div class="">
					<label for="phone_number" class="form-label">
						Teléfono
					</label>
					<input type="phone_number" class="form-control" id="phone_number" placeholder=""
					v-model="row.phone_number"
					>
				</div>
				<div class="mb-3">
					<label for="email_address" class="form-label">
						Correo
					</label>
					<input type="email_address" class="form-control" id="email_address" placeholder=""
					v-model="row.email_address"
					>
				</div>

				<hr />
				<h3> Información de residencia </h3>

				<div class="">
					<label for="street" class="form-label">
						Dirección
					</label>
					<input type="street" class="form-control" id="street" placeholder=""
					v-model="row.street"
					>
				</div>
				<div class="">
					<label for="city" class="form-label">
						Ciudad
					</label>
					<input type="city" class="form-control" id="city" placeholder=""
					v-model="row.city"
					>
				</div>
				<div class="mb-3">
					<label for="state" class="form-label">
						Estado / Depto.
					</label>
					<input type="state" class="form-control" id="state" placeholder=""
					v-model="row.state"
					>
				</div>
				<div class="">
					<label for="postal_code" class="form-label">
						Código postal
					</label>
					<input type="postal_code" class="form-control" id="postal_code" placeholder=""
					v-model="row.postal_code"
					>
				</div>
				<div class="">
					<label for="country" class="form-label">
						País
					</label>
					<input type="country" class="form-control" id="country" placeholder=""
					v-model="row.country"
					>
				</div>
				<div class="mb-3 text-center">
					<button type="button" class="btn btn-primary mb-3"
					@click="sendData"
					>
						Guardar
					</button>
					 | 
					<button type="button" class="btn btn-warning mb-3"
					@click="initRow"
					>
						Cancelar
					</button>
				</div>
			</form>
			
		</div>
	</div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { http, httpGet } from '../../config/services'

export default {
	name: 'People',
	props: {
		id: { type: String, default: '0' },
	},
	setup( props ){

		const router = useRouter()
    	const route = useRoute()

		const row_ = {
			id: '0',
			name: '',
			phone_number: '',
			email_address: '',
			street: '',
			city: '',
			state: '',
			postal_code: '',
			country: '',
		}

		let row = ref({})
		let id = props.id


		const initRow = () => {
			const data = Object.assign({} , row_ )
			row.value = data
		}
		initRow()

		onMounted( async () => {
			if( id != '' && id != '0' && id != 0 ){
				const data = await httpGet('people/' + id)
				if( data.error ){
					alert( data.message )
					return
				}
				row.value = data.data
			}
      	})

		const sendData = async () => {
			console.info( row.value )

			if( row.value.name == '' ){
				alert('Debe ingresar un nombre válido')
				return
			}

			let valEmail = validateEmail( row.value.email_address )
			if( ! valEmail ){
				alert('Debe ingresar un correo válido')
				return
			}

			const data = await http('people', row.value)
			if( data.error ){
				alert( data.message )
				return
			}
			router.push({
				name: 'People',
			})
		}

		const validateEmail = ( str ) => {
			let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
			if( emailRegex.test( str ) )
				return true
			else 
				return false
		}

		return {
			row,
			id,
			initRow,
			sendData,
		}
	}
}
</script>

<style scoped>

</style>
