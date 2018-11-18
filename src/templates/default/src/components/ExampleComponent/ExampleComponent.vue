<template>
    <div class="ExampleComponent" :style="{color}">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'ExampleComponent',
    props: {
      color: {
        type: String,
        default: 'red'
      }
    }
  }
</script>
