const luzonData = {
    "regions": [
        {
            "name": "Ilocos Region",
            "provinces": {
                "Ilocos Norte": ["Laoag"],
                "Ilocos Sur": ["Vigan", "Candon"],
                "La Union": ["San Fernando"],
                "Pangasinan": ["Alaminos", "Dagupan", "San Carlos", "Urdaneta"]
            }
        },
        {
            "name": "Cagayan Valley",
            "provinces": {
                "Batanes": [],
                "Cagayan": ["Tuguegarao"],
                "Isabela": ["Cauayan", "Santiago", "Ilagan"],
                "Nueva Vizcaya": [],
                "Quirino": []
            }
        },
        {
            "name": "Central Luzon",
            "provinces": {
                "Aurora": [],
                "Bataan": ["Balanga"],
                "Bulacan": ["Malolos", "Meycauayan", "San Jose del Monte"],
                "Nueva Ecija": ["Cabanatuan", "Gapan","Munoz", "San Jose"],
                "Pampanga": ["Angeles","Mabalacat", "San Fernando"],
                "Tarlac": ["Tarlac"],
                "Zambales": ["Olongapo"]
            }
        },
        {
            "name": "CALABARZON",
            "provinces": {
                "Batangas": ["Batangas City", "Lipa", "Tanauan"],
                "Cavite": ["Bacoor", "Cavite City", "Tagaytay", "Trece Martires"],
                "Laguna": ["Biñan", "Cabuyao", "Calamba", "San Pablo", "San Pedro", "Santa Rosa"],
                "Quezon": ["Lucena","Tayabas"],
                "Rizal": ["Antipolo"]
            }
        },
        {
            "name": "MIMAROPA",
            "provinces": {
                "Marinduque": [],
                "Occidental Mindoro": ["San Jose"],
                "Oriental Mindoro": ["Calapan"],
                "Palawan": ["Puerto Princesa"],
                "Romblon": []
            }
        },
        {
            "name": "Bicol Region",
            "provinces": {
                "Albay": ["Legazpi", "Ligao","Tabaco"],
                "Camarines Norte": [],
                "Camarines Sur": ["Naga", "Iriga"],
                "Catanduanes": [],
                "Masbate": ["Masbate City"],
                "Sorsogon": ["Sorsogon City"]
            }
        },
        {
            "name": "Cordillera Administrative Region",
            "provinces": {
                "Abra": [],
                "Apayao": [],
                "Benguet": ["Baguio"],
                "Ifugao": [],
                "Kalinga": ["Tabuk"],
                "Mountain Province": []
            }
        },
        {
            "name": "National Capital Region",
            "provinces": {
                "Metro Manila": ["Caloocan", "Las Piñas", "Makati", "Malabon", "Mandaluyong", "Manila", "Marikina", "Muntinlupa", "Navotas", "Parañaque", "Pasay", "Pasig", "Quezon City", "San Juan", "Taguig", "Valenzuela"]
            }
        }
    ]
};

window.onload = function() {
    const regionSelect = document.getElementById("region");
    luzonData.regions.forEach(region => {
        const option = document.createElement("option");
        option.value = region.name;
        option.text = region.name;
        regionSelect.add(option);
    });
};

function populateProvinceDropdown() {
    const provinceSelect = document.getElementById("province");
    const regionSelect = document.getElementById("region");
    const selectedRegion = regionSelect.value;

    // Clear previous provinces and cities
    provinceSelect.innerHTML = '<option value="">Select Province...</option>';
    document.getElementById("city").innerHTML = '<option value="">Select City...</option>';

    // Find provinces for the selected region
    const regionData = luzonData.regions.find(region => region.name === selectedRegion);
    if (regionData) {
        Object.keys(regionData.provinces).forEach(province => {
            const option = document.createElement("option");
            option.value = province;
            option.text = province;
            provinceSelect.add(option);
        });
    }
}

function populateCityDropdown() {
    const citySelect = document.getElementById("city");
    const provinceSelect = document.getElementById("province");
    const selectedProvince = provinceSelect.value;
    const regionSelect = document.getElementById("region");
    const selectedRegion = regionSelect.value;

    // Clear previous cities
    citySelect.innerHTML = '<option value="">Select City...</option>';

    // Find cities for the selected province
    const regionData = luzonData.regions.find(region => region.name === selectedRegion);
    if (regionData && regionData.provinces[selectedProvince]) {
        regionData.provinces[selectedProvince].forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.text = city;
            citySelect.add(option);
        });
    }
}
// Select elements to display quantity and subtotal
const quantityDisplayPayment = document.querySelector('#cart-items #quantity');
const subtotalDisplayPayment = document.querySelector('#cart-items #subtotal');

// Ensure total label and amount are in separate elements
const totalLabel = document.querySelector('.total-container .total h4:first-of-type'); // For "TOTAL"
const totalAmountDisplay = document.querySelector('.total-container .total h4:last-of-type'); // For the total amount

// Load from localStorage
const savedQuantity = parseInt(localStorage.getItem('quantity')) || 1;
const savedSubtotal = parseFloat(localStorage.getItem('subtotal')) || 2900000.00;

// Update displays with saved data
quantityDisplayPayment.textContent = savedQuantity;
subtotalDisplayPayment.textContent = `₱${savedSubtotal.toLocaleString()}`;

// Set TOTAL label and amount separately
totalLabel.textContent = "TOTAL";
totalAmountDisplay.textContent = `₱${savedSubtotal.toLocaleString()}`;

//PopUP after CHECKOUT
document.querySelector('.checkout-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    document.getElementById('checking').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  });

  function closePopup() {
    document.getElementById('checking').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }

  function confirmCheckout() {
    closePopup();
    document.querySelector('form').submit(); // Submit the form if user confirms
  }
