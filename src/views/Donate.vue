<template>
    <div>
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary"></base-header>
        <card class="min-vh-100 main_body center">
            <div class="row card text-black">
                <div class="col-lg mx-auto form p-4">
                    <p> This will be the donate page</p>
                  <form action="https://www.paypal.com/donate" method="post" target="_top">
                    <input type="hidden" name="cmd" value="_donations" />
                    <input type="hidden" name="business" value="HTomCooper@gmail.com" />
                    <input type="hidden" name="currency_code" value="USD" />
                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                    <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
                  </form>
                </div>
            </div>
        </card>
    </div>
</template>