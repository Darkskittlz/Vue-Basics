Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div class="detailsGrid2">
            <ul>
                <li v-for="detail in details"> {{ detail }} </li>
            </ul>
        </div>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean, 
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="img">
                <a v-bind:href='link'>Style Sheet</a>
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <!-- <p>{{description}}</p> -->
                <p v-if="inventory > 10">In Stock</p>
                <p v-else-if='inventory<=10 && inventory > 0'>Almost Sold Out!</p>
                <p v-else v-show="!inStock" :class="{ outOfStockP: !inStock}">Out of Stock</p>
                <p v-show="inStock">In Stock</p>
                <p :class="{ outOfStockP: !inStock}">Shipping: {{ shipping }} </p>
                <p >{{sale}}</p>

                
                <div class="detailsGrid">
                <div>
                <h2>Details</h2>
                <ul>
                <li v-for="detail in details"> {{ detail }} </li>
                </ul>
                </div>
                </div>
                
                <h3>Product Details Child Component</h3>
                <product-details v-bind:details="details"></product-details>

                <div 
                    v-for="(variant, index) in variants" 
                    :key="variant.variantId" 
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor}" 
                    @mouseover="updateProduct(index)">
                </div>

                <div class="cartGrid">
                    <button 
                        v-on:click="addToCart" 
                        :disabled="!inStock" 
                        :class="{ disabledButton: !inStock }"
                    > Add to Cart</button>
                    <button 
                        v-on:click="decreaseCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                    >Subtract from Cart</button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            description: 'The Sun and the Moon at record prices',
            brand: 'Celestial',
            product: 'Bodies',
            // img: './assets/sun.png', 
            selectedVariant: 0, 
            link: 'https://gist.github.com/atomjar/67db5aa9b7b9013dcf0d91c91f54e1a9',
            inventory: 0,
            onSale: true,
            details: ["Massive", "303 degrees", "Space Dust"],
            variants: [
                {
                    variantId: 2234,
                    variantObject: "sun",
                    variantColor: "orange",
                    variantImage: './assets/sun.png',
                    variantQuantity: 10
                },
                {
                    variantId: 2235, 
                    variantObject: "moon",
                    variantColor: "blue",
                    variantImage: './assets/moon.png',
                    variantQuantity: 0
                }
            ],
            sizes: ["xl", "l", "m", "s"]
        }
    },
    methods: {
        addToCart() {
            //Here I am targeting the variantId within the variants array of my data object. The this.selectedVariant targets either 0 or 1 
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            //this.img is referring to the img variable that I set above         
            //img: './assets/sun.png'

            this.selectedVariant = index
            console.log(index)
        },
        decreaseCart() {
            // this.cart -= 1
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        img() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale(){
            if(this.inStock){
                return this.brand + ' ' + this.product + " on Sale!"
            } else {
                return this.brand + ' ' + this.product + " not on Sale!"
            }
        },
        shipping(){
            if(this.premium) {
                return "Free"
            } {
                return "$2.99"
            }
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: false, 
        details: true,
        cart: []
    },
    methods: {
        updateCart(id){
            // this.cart += 1
            this.cart.push(id)
        },
        removeItem(id){
            const index = this.cart.indexOf(id);
            if (index !== -1){
                this.cart.splice(index, 1)
            }
        }
    }
})

