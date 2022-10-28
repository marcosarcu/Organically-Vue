<template>
    <div v-if="message !== ''" :class="`alert alert-${type || 'info'}`">
            {{message}}
    </div>
</template>
<script>
export default {
    'name': 'StatusBar',
    data() {
        return {
            'status': {
                'type': '',
                'message': ''
            }
        }
    },
    props: {
        'type': {
            'type': String,
            'default': 'info'
        },
        'message': {
            'type': String,
            'default': 'Error desconocido'
        }
    },
}
</script>