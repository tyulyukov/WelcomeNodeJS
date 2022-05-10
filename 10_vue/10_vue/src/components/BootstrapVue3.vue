<template>
  <div class="mb-0">
    <div class="col-3">
      <BCard>
        <BCardHeader>
          <BCardTitle>bootstrap is working</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div>Somebody once told me the world is gonna roll me
            I ain't the sharpest tool in the shed
            She was looking kind of dumb with her finger and her thumb
            In the shape of an "L" on her forehead</div>
        </BCardBody>
      </BCard>
    </div>

    <BButton variant="primary">test button</BButton>

    <BTable :items="items"></BTable>
  </div>
</template>

<script>
import {BButton, BCard, BCardBody, BCardHeader, BCardTitle, BTable} from "bootstrap-vue-3";
export default {
  name: "BootstrapVue3",
  components: {BCardBody, BCardTitle, BCardHeader, BCard, BTable, BButton},
  data() {
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