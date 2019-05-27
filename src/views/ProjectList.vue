<template>
    <app-journal :headers="headers" :metadata="metadata" >
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
