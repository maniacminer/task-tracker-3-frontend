<template>
    <app-journal :headers="headers" :metadata="metadata" >
        <template v-slot:main="row" >
            <td>{{ row.item.pid }}</td>
            <td>{{ row.item.title }}</td>
            <td>{{ row.item.gitrepo }}</td>
        </template>
        <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn flat class="font-weight-regular secondary black--text" :to="{name: 'project-new'}">Новый проект</v-btn>
        </template>
    </app-journal>
</template>

<script>
export default {
    data(){
        return {
            metadata: {
                name: 'project',
            },
            headers: [
                {text: 'Идентификатор', value: 'pid'},
                {text: 'Проект', value: 'title'},
                {text: 'Репозиторий', value: 'gitrepo'},
            ],
        }
    },    

}
</script>

<style>

</style>
