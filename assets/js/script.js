// assets/js/script.js
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
  });



// Servis Kısmı
document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("services-container");
    const showCount = container.getAttribute("data-show"); // Kaç hizmet gösterileceğini al

    try {
        const response = await fetch("./assets/data/services.json");
        const services = await response.json();

        const servicesToShow = showCount ? services.slice(0, parseInt(showCount)) : services;

        servicesToShow.forEach((service,index) => {
            const card = document.createElement("div");
            card.classList.add("bg-white", "rounded-xl", "shadow-lg", "overflow-hidden", "hover:shadow-xl", "transition-shadow", "duration-300", "group");

            card.innerHTML = `
                <div class="relative overflow-hidden h-48">
                    <img 
                        src="${service.image}" 
                        alt="${service.title}" 
                        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    >
                    <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div class="absolute bottom-4 left-4">
                        <h3 class="text-2xl font-bold text-white">${service.title}</h3>
                    </div>
                </div>
                <div class="p-6">
                    <ul class="space-y-3 text-gray-600">
                        ${service.description.map(item => `
                            <li class="flex items-start">
                                <svg class="h-5 w-5 text-amber-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>${item}</span>
                            </li>
                        `).join('')}
                    </ul>
                    <a 
                        href="service-detail.html?id=${index}" 
                        class="mt-6 inline-block text-amber-600 hover:text-amber-700 font-medium transition"
                    >
                        Detaylı Bilgi →
                    </a>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Hizmetler yüklenirken hata oluştu:", error);
        container.innerHTML = `<p class="text-red-500">Hizmetler yüklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.</p>`;
    }
});


// Service Sayfası

// URL'den hizmet ID'sini al
const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get('id') || 0;

// Hizmet detayını yükle
document.addEventListener('DOMContentLoaded', async function() {

    const response = await fetch("./assets/data/services.json");
    const services = await response.json();
    const service = services[serviceId];

  if (!service) window.location.href = 'services.html';
  
  document.title = `${service.title} | Organizasyon Şirketi`;
  
  const container = document.getElementById('service-detail-container');
  container.innerHTML = `
    <!-- Hero Banner -->
    <div class="service-hero relative" style="background-image: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${service.image}')">
  <div class="container mx-auto px-4 h-screen max-h-[800px] flex items-center justify-center">
    <div class="text-center text-white">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">${service.title}</h1>
      <p class="text-xl md:text-2xl">Profesyonel çözümlerimizle hayalinizdeki etkinliği yaratıyoruz</p>
    </div>
  </div>
</div>

    <!-- İçerik -->
    <div class="container mx-auto px-4 mt-12 service-content">
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Ana Bilgiler -->
    <div class="lg:col-span-2">
      <!-- Hizmet Detayları -->
      <div class="bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-lg mb-8 border border-amber-100">
        <h2 class="text-3xl font-serif font-bold mb-6 text-amber-800">Hizmet Detayları</h2>
        <ul class="space-y-4 text-gray-700">
          ${service.description.map(item => `
            <li class="flex items-start bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span class="text-lg flex-1">${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Paketler -->
      <h2 class="text-3xl font-serif font-bold mb-6 text-amber-800">Paket Seçeneklerimiz</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        ${service.details.paketler.map(paket => `
          <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-amber-600">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-semibold text-gray-800">${paket.name}</h3>
              <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Popüler</span>
            </div>
            <p class="text-3xl font-bold text-amber-600 mb-6">${paket.price}</p>
            <ul class="space-y-3 mb-6">
              ${paket.features.map(feature => `
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  ${feature}
                </li>
              `).join('')}
            </ul>
            <button class="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-[1.02]">
              Teklif Al <span class="ml-2">→</span>
            </button>
          </div>
        `).join('')}
      </div>

      <!-- Ek Hizmetler -->
      <div class="bg-gradient-to-br from-white to-amber-50 p-8 rounded-2xl shadow-lg border border-amber-100">
        <h2 class="text-3xl font-serif font-bold mb-6 text-amber-800">Ek Hizmetler</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          ${service.details.ekHizmetler.map(hizmet => `
            <div class="bg-white p-4 rounded-xl flex items-center shadow-sm hover:shadow-md transition-shadow">
              <svg class="w-6 h-6 text-amber-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">${hizmet}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Yan Bilgiler -->
    <div class="space-y-8">
      <!-- Referanslar -->
      <div class="bg-white p-6 rounded-2xl shadow-lg border border-amber-100">
        <h3 class="text-2xl font-serif font-bold mb-6 text-amber-800">Referanslarımız</h3>
        <div class="space-y-4">
          ${service.details.referanslar.map(ref => `
            <div class="flex items-center p-3 bg-amber-50 rounded-lg">
              <div class="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center text-white mr-3">
                ${ref.substring(0,1)}
              </div>
              <div>
                <p class="font-medium text-gray-800">${ref}</p>
                <p class="text-sm text-amber-600">⭐⭐⭐⭐⭐</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- İletişim -->
      <div class="bg-amber-600 p-6 rounded-lg shadow-lg">
  <h3 class="text-2xl font-bold mb-6 text-white">Hızlı İletişim</h3>
  <div class="space-y-4">
    <a href="https://wa.me/905551234567" class="flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-6 py-4 rounded-lg transition duration-300">
      <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      WhatsApp
    </a>
    <a href="tel:+902123456789" class="flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-6 py-4 rounded-lg transition duration-300">
      <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
      Hemen Ara
    </a>
  </div>
</div>

      <!-- Garanti Bölümü -->
      <div class="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 text-center">
        <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h4 class="text-xl font-semibold text-gray-800 mb-2">%100 Memnuniyet</h4>
        <p class="text-gray-600">Profesyonel ekibimizle kalite garantisi</p>
      </div>
    </div>
  </div>
</div>
  `;
});