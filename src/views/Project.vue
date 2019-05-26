<template>
    <app-doc :data="$data">
        <template v-slot:toolbar>
            <v-text-field label="Идентификатор" :rules="mustNotBeEmpty" v-model="pid" name="pid" type="text"></v-text-field>                            
        </template>
        <template v-slot:main>
            <v-text-field label="Заголовок" :rules="mustNotBeEmpty" v-model="title" name="title" type="text"></v-text-field>                            
            <v-text-field label="Репозиторий git" v-model="gitrepo" name="gitrepo" type="text"></v-text-field>                            
        </template>
    </app-doc>
</template>

<script>
import  validationMixins from '@/validationMixins'

export default {
    mixins: [validationMixins],
    data() {
        return {
            _name: 'project',
            _title: 'Проект',
            _persistent: ['title', 'pid', 'gitrepo'],

            title: '',
            pid: '',
            gitrepo: '',
          
        }
    }

}
</script>

<style>

</style>
