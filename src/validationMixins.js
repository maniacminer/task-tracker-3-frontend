export default {
    data() { 
        return {
            mustNotBeEmpty: [
                v => !!v || 'Поле обязательно для заполнения',
            ],
            // emailWellFormed: [
            //     v => console.log('valid: ',v)
            // ]
        }
    }
}