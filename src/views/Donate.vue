<template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>
        <card class="min-vh-100 main_body center">


          <div class="py-5 bg-light c2a1" style="background-image:url(https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/c2a/1.jpg)">
            <div class="container">
              <!-- Row -->
              <div class="row justify-content-center">
                <div class="col-md-7 text-center">
                  <h2 class="mb-3 text-white font-weight-medium">Consider a Donation</h2>
                  <p class="font-weight-light text-white op-8">To help Access My Research continues its mission
                  of providing free resources and publications, consider a donation!</p>
                  <b-button squared variant="primary" @click="donation=true">DONATE NOW</b-button>
                </div>
              </div>
              <!-- Row -->
            </div>
          </div>

            <div class="row card text-black" v-if="donation===true">
                <div class="col-lg mx-auto form p-4">
                  <input type="radio" id="one" value=1 v-model="picked">
                  <label for="one">$1.00</label>
                  <br>
                  <input type="radio" id="five" value=5 v-model="picked">
                  <label for="five">$5.00</label>
                  <br>
                  <input type="radio" id="ten" value=10 v-model="picked">
                  <label for="ten">$10.00</label>
                  <br>
                  <input type="radio" id="twenty" value=20 v-model="picked">
                  <label for="ten">$20.00</label>
                  <br>
                  <input type="radio" id="other" value=0 v-model="picked">
                  <label for="ten">Other</label>
                  <br>
                  <p>Choose a different amount after clicking on the Donate button</p>
                  <p>Accepting PayPal and all major credit card companies</p>
                  <br>
                  <form action="https://www.paypal.com/donate" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_donations" />
                    <input type="hidden" name="business" value="HTomCooper@gmail.com" />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="hidden" name="amount" :value=picked v-if="picked>0"/>
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                  </form>

                  <p> Or considering a monthly donation:</p>
                  <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_xclick-subscriptions">
                    <input type="hidden" name="business" value="HTomCooper@gmail.com">
                    <input type="hidden" name="lc" value="US">
                    <input type="hidden" name="no_note" value="1">
                    <input type="hidden" name="src" value="1">
                    <input type="hidden" name="currency_code" value="USD">
                    <input type="hidden" name="bn" value="PP-SubscriptionsBF:btn_subscribe_LG.gif:NonHostedGuest">
                    <table>
                      <tr><td><input type="hidden" name="on0" value=""></td></tr><tr><td><select name="os0">
                      <option value="Option 1">Option 1 : $1.00 USD - monthly</option>
                      <option value="Option 2">Option 2 : $5.00 USD - monthly</option>
                      <option value="Option 3">Option 3 : $10.00 USD - monthly</option>
                      <option value="Option 4">Option 4 : $20.00 USD - monthly</option>
                    </select> </td></tr>
                    </table>
                    <input type="hidden" name="option_select0" value="Option 1">
                    <input type="hidden" name="option_amount0" value="1.00">
                    <input type="hidden" name="option_period0" value="M">
                    <input type="hidden" name="option_frequency0" value="1">
                    <input type="hidden" name="option_select1" value="Option 2">
                    <input type="hidden" name="option_amount1" value="5.00">
                    <input type="hidden" name="option_period1" value="M">
                    <input type="hidden" name="option_frequency1" value="1">
                    <input type="hidden" name="option_select2" value="Option 3">
                    <input type="hidden" name="option_amount2" value="10.00">
                    <input type="hidden" name="option_period2" value="M">
                    <input type="hidden" name="option_frequency2" value="1">
                    <input type="hidden" name="option_select3" value="Option 4">
                    <input type="hidden" name="option_amount3" value="20.00">
                    <input type="hidden" name="option_period3" value="M">
                    <input type="hidden" name="option_frequency3" value="1">
                    <input type="hidden" name="option_index" value="0">
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribe_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                    <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                  </form>
                </div>
            </div>

        </card>
    </div>
</template>

<script>
  export default {
    name: 'Donate',
    data() {
      return {
        other: '',
        picked: '',
        donation: false,
      }
    }
  }
</script>