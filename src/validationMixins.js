export default {
    data() { 
        return {
            mustNotBeEmpty: [
                v => !!v || 'Поле обязательно для заполнения',
            ],
        }
    }
}