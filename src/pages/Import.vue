<template>
  <div class="container" style="margin-top: 100px">
    <div class="row">
      <div class="col-md-6">
        <form
          class="card p-5"
          @submit.prevent="handleLoadProducts"
          enctype="multipart/form-data"
        >
          <h5>Informações para Importação</h5>
          <div class="mb-3">
            <label for="baseUrl" class="form-label">URL do Projeto</label>
            <input
              type="text"
              class="form-control"
              name="baseUrl"
              id="baseUrl"
              v-model="productsLoad.baseUrl"
              placeholder="URL do projeto. Ex: https://dev.appmarketplace.com.br"
              required
            />
          </div>

          <!-- CSV -->
          <v-file-input
            v-model="productsLoad.csv"
            placeholder="Selecione o arquivo .CSV"
            label="Produtos .CSV"
            prepend-icon="mdi-file-excel"
            accept=".csv"
            name="csv"
          >
          </v-file-input>

          <!-- IMAGES -->
          <v-file-input
            v-model="productsLoad.images"
            placeholder="Selecione o arquivo .zip"
            label="Images .ZIP"
            prepend-icon="mdi-folder-zip"
            accept=".zip"
          >
          </v-file-input>
          <button type="" class="btn btn-success" :disabled="disabledButton">
            {{ disabledButton ? "Carregando..." : "Carregar" }}
          </button>
        </form>
      </div>
      <div class="col-md-6">
        <div class="card p-5">
          <p v-if="products.length === 0">
            Carregue as informações para mostrar a listra de produtos.<br />
            E lembre de cadastrar pelo menos um produto na planilha.
          </p>
          <div v-else>
            <div class="d-flex justify-content-between">
              <h5>Lista de Produtos</h5>
              <button
                class="btn btn-success"
                @click="handleCreateProducts"
                :disabled="disabledButton"
              >
                {{ disabledButton === false ? "Cadastrar" : "Cadastrando..." }}
              </button>
            </div>
            <p>
              Novos Cadastros: {{ numberProductsCreated }} <br />
              Já Foram Cadastrados: {{ numberProductsUncreated }}
            </p>

            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(product, index) in products"
                v-bind:key="index"
              >
                <!-- {{product.Vendoritem}} -->
                <img
                  :src="product.Vendoritem.image_content"
                  :alt="product.Vendoritem.item_name"
                  class="rounded w-25"
                />
                {{ product.Vendoritem.item_name }}

                <span>
                  {{ product.msg }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../services/api";
export default {
  title: "test",
  data() {
    return {
      numberProductsCreated: 0,
      numberProductsUncreated: 0,
      showLoading: false,
      disabledButton: false,
      productsLoad: {
        // baseUrl: 'https://version.aplicativoderestaurante.com.br',
        baseUrl: "",
        csv: null,
        images: null,
      },
      message: "Olá Vue!",
      products: [],
    };
  },
  mounted() {
    console.log("mounted");
    document.title = 'Importação'
    // this.handleCreateProducts()
  },
  methods: {
    handleChange(event) {
      const { name } = event.target;

      this.productsLoad[name] = event.target.files[0];
    },
    async handleCreateProducts() {
      this.showLoading = true;
      this.disabledButton = true;
      this.numberProductsCreated = 0;
      this.numberProductsUncreated = 0;
      let count = 0;
      // return

      //create all products
      this.products.map((product, index) => {
        this.products[index].msg = " - Cadastrando...";

        setTimeout(async () => {
          const { data } = await api.post("/products", {
            product,
            baseUrl: this.productsLoad.baseUrl,
          });
          count++;
          // console.log(index)
          this.products[index].msg = data.msg;
          if (data.msg === " - Já foi Cadastrado") {
            // - Já foi Cadastrado
            this.numberProductsUncreated++;
          } else {
            this.numberProductsCreated++;
          }

          //Reset variables
          if (this.products.length === count + 1) {
            this.disabledButton = false;
          }
          // console.log(data)
        }, 500 * index);
      });
    },

    async handleLoadProducts(event) {
      event.preventDefault();
      // console.log('test')
      // return
      this.numberProductsCreated = 0;
      this.numberProductsUncreated = 0;
      this.products = [];

      const formData = new FormData();

      formData.append("baseUrl", this.productsLoad.baseUrl);
      formData.append("csv", this.productsLoad.csv);
      formData.append("images", this.productsLoad.images);

      // for (var value of formData.values()) {
      //     console.log(value);
      // }

      try {
        this.disabledButton = true;

        const { data } = await api.post("/products/load", formData);
        console.log(data);

        this.products = data;
        this.disabledButton = false;
      } catch (error) {
        const { data } = error.response;
        // console.log('erro', error.message);
        alert(data.msg);
        console.log({ error });
      }

      return;
    },
  },
};
</script>

<style>
</style>