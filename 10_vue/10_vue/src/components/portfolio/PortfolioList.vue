<template>
  <h3>Portfolio Projects</h3>

  <ul>
    <li v-for="item in items" :key="item.id"><PortfolioItem :portfolio='item'/></li>
  </ul>
</template>

<script>
import PortfolioItem from "@/components/portfolio/PortfolioItem";
export default {
  name: "PortfolioList",
  components: {PortfolioItem},
  data () {
    return {
      items: [
        {id: 1, name: "Echo messenger"},
        {id: 2, name: "Gachigram"}
      ]
    }
  }
}
</script>

<style scoped>

</style>