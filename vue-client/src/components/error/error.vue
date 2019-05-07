<template>
    <h3>Error occured</h3>
</template>

<script>
export default {
    name: 'error',
    mounted: function() {
        setTimeout(() => window.history.go(-1), 5000 );
    }
}
</script>

