<template>
    <div class="Text" :style="{color}">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'Text',
    props: {
      color: {
        type: String,
        default: 'red'
      }
    }
  }
</script>
