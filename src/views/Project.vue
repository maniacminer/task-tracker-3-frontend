<template>
    <app-doc :data="$data">
        <template v-slot:toolbar>
        </template>
        <template v-slot:main>
            <v-text-field label="Заголовок" :rules="mustNotBeEmpty" v-model="title" name="title" type="text"></v-text-field>                            
        </template>
    </app-doc>
</template>

<script>
export default {
    data() {
        return {
            _name: 'project',
            _title: 'Проект',
            _persistent: ['title'],

            title: '',
          
        }
    }

}
</script>

<style>

</style>
