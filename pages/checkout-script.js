var stripe = Stripe('pk_test_Xkyg29ginOFgCuFKqkAVJZ2C00EHlgOR1z');
var elements = stripe.elements();



// Set up Stripe.js and Elements to use in checkout form
var style = {
    base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
            color: "#aab7c4"
        }
    },
    invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
    }
};

var cardElement = elements.create("card", { style: style });
cardElement.mount("#card-element");


cardElement.addEventListener('change', function (event) {
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});


var form = document.getElementById('subscription-form');

form.addEventListener('submit', function (event) {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
            email: 'jenny.rosen@example.com',
        },
    }).then(stripePaymentMethodHandler);
});


function stripePaymentMethodHandler(result, email) {
    if (result.error) {
        // Show error in payment form
        console.log("perror")
    } else {
        // Otherwise send paymentMethod.id to your server
        fetch('/create-customer', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'jenny.rosen@example.com',
                payment_method: result.paymentMethod.id,
                id: sessionStorage.getItem('id'),
                plan: sessionStorage.getItem('plan')
            }),
        }).then(function (result) {
            return result.json();
        }).then(function (customer) {
            alert('done');
        });
    }
}