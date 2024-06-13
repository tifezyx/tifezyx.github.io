document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript loaded and running');

    // Check if the product image is loaded
    const productImage = document.getElementById('product-image');
    productImage.onload = () => {
        console.log('Product image loaded successfully.');
    };
    productImage.onerror = () => {
        console.error('Failed to load product image.');
    };

    // Toggle dropdown menu
    const cardsDropdown = document.querySelector('.cards-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const selectedOption = document.getElementById('selected-option');
    const priceTag = document.getElementById('price');
    let currentSelection = null;

    cardsDropdown.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Select dropdown option
    dropdownMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const selectedValue = event.target.getAttribute('data-value');
            const selectedPrice = event.target.getAttribute('data-price');

            // Update selected option text
            selectedOption.textContent = selectedValue;

            // Update price tag
            priceTag.textContent = `$${selectedPrice}`;

            // Remove the selected class from previous selection
            if (currentSelection) {
                currentSelection.classList.remove('selected');
            }

            // Add the selected class to the new selection
            event.target.classList.add('selected');
            currentSelection = event.target;

            // Hide dropdown menu
            dropdownMenu.style.display = 'none';
        }
    });

    // Hide dropdown menu when clicking outside
    window.addEventListener('click', (event) => {
        if (!cardsDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });

    // Popup functionality
    const purchaseButton = document.querySelector('.purchase-button');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');
    const subtotal = document.getElementById('subtotal');
    const ethAddress = document.getElementById('eth-address');
    const sessionId = document.getElementById('session-id');
    const prices = {
        "60": 60,
        "90": 90,
        "140": 140
    };

    purchaseButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const selectedPrice = currentSelection ? currentSelection.getAttribute('data-price') : 0;
        const ethPrice = await getEthPriceInUsd();
        const totalEth = (selectedPrice / ethPrice).toFixed(4);
        subtotal.textContent = `Total: $${selectedPrice} (ETH ${totalEth})`;
        popup.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Copy ETH address to clipboard
    ethAddress.addEventListener('click', () => {
        const textToCopy = ethAddress.getAttribute('data-text');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('ETH Address copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    // Copy Session ID to clipboard
    sessionId.addEventListener('click', () => {
        const textToCopy = sessionId.getAttribute('data-text');
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Session ID copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    // Fetch current ETH price in USD
    async function getEthPriceInUsd() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const data = await response.json();
            return data.ethereum.usd;
        } catch (error) {
            console.error('Error fetching ETH price:', error);
            return 0;
        }
    }
});
