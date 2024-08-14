<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from '../components/Comment.vue'

const { page, frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <Comment v-if="!frontmatter.disableComment" :key="page.relativePath"></Comment>
    </template>
  </Layout>
</template>