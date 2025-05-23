import React from 'react';

export const About = () => {
  return (
    <>
      <section className="relative w-full h-screen background-size: auto bg-cover bg-center bg-[url('/capstone.jpg')] bg-fixed">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative flex flex-col justify-center items-center h-screen px-6 md:px-20 text-white space-y-6 text-center">
          <h2 className="text-xl md:text-6xl font-bold max-w-xl">About Luminou§kin</h2>
          <h3 className="text-4xl md:text-5xl font-bold max-w-screen">Kenalan yuk sama perjalanan kita, dan orang-orang di balik layar.</h3>
          <p className="text-lg md:text-xl max-w-lg">Cerita, vibe, dan hal-hal yang bikin kita jadi seperti sekarang.</p>
        </div>
      </section>
      <section id="about" class="pt-15 pb-4 bg-blue-100">
        <div class="container">
          <div class="flex wrap">
            <div class="md:w-1/2 px-4 mb-10">
              <h3 class="text-center font-bold uppercase text-primary text-5xl mb-3">Visi</h3>
              <p class="text-center text-lg leading-relaxed">
                Menjadi solusi digital yang inklusif dan terpercaya dalam mendukung kesehatan kulit masyarakat Indonesia, khususnya di wilayah 3T, dengan berkontribusi pada pencapaian SDGs Goal 3: Good Health & Well-Being.
              </p>
            </div>
            <div class="md:w-1/2 px-4 mb-10">
              <h1 class="text-center font-bold uppercase text-primary text-5xl mb-3">Misi</h1>
              <div class="text-center text-lg leading-relaxed space-y-4">
                <p>Menyediakan platform digital yang mampu melakukan deteksi dini penyakit kulit menular ringan melalui klasifikasi gambar berbasis teknologi.</p>
                <p>Memberikan rekomendasi pengobatan yang aman, cepat, dan berbasis Obat Bebas Terbatas (OBT), untuk masyarakat dengan keterbatasan akses layanan medis.</p>
                <p>Mengedukasi masyarakat tentang pentingnya penanganan penyakit kulit menular secara dini, agar tidak menyebar dan menimbulkan masalah kesehatan yang lebih besar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-fit flex flex-col pt-15 pb-4 justify-center bg-blue-200 gap-10 items-center">
        <h1 className="text-5xl font-quicksand font-black">Journey</h1>
        <h2 className="text-center mb-5 md:text-10xl font max-w-screen">
          Proyek ini muncul dari keprihatinan kami terhadap kasus penyakit kulit menular ringan di berbagai daerah di Indonesia, terutama di wilayah 3T (Tertinggal, Terdepan, dan Terluar). Kami menyadari bahwa penyakit seperti impetigo,
          panu, kurap, eksim, dan lain-lain sering dianggap sepele, padahal jika tidak ditangani dengan cepat dan benar, bisa menyebar luas dan menyebabkan infeksi pada kulit sehingga dapat menimbulkan rasa tidak nyaman, tidak percaya diri,
          dan dapat menularkan kepada orang lain, terutama untuk daerah yang aksesnya terhadap layanan medis masih jauh, terbatas, dan terhalang oleh biaya konsultasi yang lumayan mahal.
          <p>
            Selama masa eksplorasi ide project, kami mencoba untuk menggabungkan sudut pandang teknologi dan domain knowledge yang kami miliki pada bidang farmasi. Pengetahuan tersebut menjadi landasan penting dalam merancang sistem
            rekomendasi obat berdasarkan hasil klasifikasi gambar. Obat-obat yang kami gunakan dalam rekomendasi adalah kategori Obat Bebas Terbatas (OBT) yang aman jika digunakan tanpa resep dokter—sehingga relevan untuk kondisi masyarakat
            yang tidak bisa langsung berkonsultasi dengan tenaga medis karena terhalang jarak dan biaya yang lumayan mahal.
          </p>
        </h2>
      </section>
      <section className="min-h-screen bg-teal-200 px-4 py-12">
        <h1 className="text-5xl font-quicksand font-black text-center mb-12">Meet the Team</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Card Team Member */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <img src="/fajar.jfif" alt="Fajar Pratama" className="w-full h-48 object-cover mb-4 rounded-t-2xl" />
            <h2 className="font-bold text-lg">Fajar Pratama</h2>
            <p className="text-sm text-gray-600">Frontend & Backend Developer</p>
            <p className="text-sm mt-2 text-gray-500">Membangun antarmuka interaktif dengan React dan Tailwind. Fokus pada aksesibilitas dan performa.</p>
          </div>

          {/* Ulangi untuk anggota lainnya */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <img src="/img/akhmad.png" alt="Akhmad Mukti Setiaji" className="w-28 h-28 object-cover rounded-full mb-4" />
            <h2 className="font-bold text-lg">Akhmad Mukti Setiaji</h2>
            <p className="text-sm text-gray-600">Frontend & Backend Developer</p>
            <p className="text-sm mt-2 text-gray-500">Membangun dinasti.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <img src="/img/akhmad.png" alt="Akhmad Mukti Setiaji" className="w-28 h-28 object-cover rounded-full mb-4" />
            <h2 className="font-bold text-lg">Akhmad Mukti Setiaji</h2>
            <p className="text-sm text-gray-600">Frontend & Backend Developer</p>
            <p className="text-sm mt-2 text-gray-500">Membangun dinasti.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <img src="/img/akhmad.png" alt="Akhmad Mukti Setiaji" className="w-28 h-28 object-cover rounded-full mb-4" />
            <h2 className="font-bold text-lg">Akhmad Mukti Setiaji</h2>
            <p className="text-sm text-gray-600">Machine Learning</p>
            <p className="text-sm mt-2 text-gray-500">Membangun dinasti.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <img src="/img/akhmad.png" alt="Akhmad Mukti Setiaji" className="w-28 h-28 object-cover rounded-full mb-4" />
            <h2 className="font-bold text-lg">Akhmad Mukti Setiaji</h2>
            <p className="text-sm text-gray-600">Machine Learning</p>
            <p className="text-sm mt-2 text-gray-500">Membangun dinasti.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
            <img src="/img/akhmad.png" alt="Akhmad Mukti Setiaji" className="w-28 h-28 object-cover rounded-full mb-4" />
            <h2 className="font-bold text-lg">Akhmad Mukti Setiaji</h2>
            <p className="text-sm text-gray-600">Machine Learning</p>
            <p className="text-sm mt-2 text-gray-500">Membangun dinasti.</p>
          </div>
          {/* Tambahkan lebih banyak card */}
        </div>
      </section>
      <section className="h-fit flex flex-wrap justify-center bg-blue-300 items-center px-4 py-12">
        <h1 className="text-5xl font-quicksand font-black mb-10">Meet the Team</h1>
        <div className="flex flex-wrap justify-center gap-10">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <img src="/images/fajar.png" alt="Fajar Pratama" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-xl font-bold">Fajar Pratama</h2>
            <p className="text-gray-600">Frontend & Backend Developer</p>
            <p className="text-gray-700 text-sm mt-2">Membangun antarmuka interaktif dengan React dan Tailwind. Fokus pada aksesibilitas dan performa.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <img src="/images/fajar.png" alt="Akhmad Mukti Setiaji" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-xl font-bold">Akhmad Mukti Setiaji</h2>
            <p className="text-gray-600">Frontend & Backend Developer</p>
            <p className="text-gray-700 text-sm mt-2">Membangun dinasti.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <img src="/images/fajar.png" alt="Rafa Elfarizi" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-xl font-bold">Rafa Elfarizi</h2>
            <p className="text-gray-600">Frontend & Backend Developer</p>
            <p className="text-gray-700 text-sm mt-2">Membangun candi.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <img src="/images/fajar.png" alt="Azka Fahsya" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-xl font-bold">Azka Fahsya</h2>
            <p className="text-gray-600">Machine Learning</p>
            <p className="text-gray-700 text-sm mt-2">Membangun candi.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <img src="/images/fajar.png" alt="Hilmi Datu Allam" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-xl font-bold">Hilmi Datu Allam</h2>
            <p className="text-gray-600">Machine Learning</p>
            <p className="text-gray-700 text-sm mt-2">Membangun candi.</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <img src="/images/fajar.png" alt="Ratu Chairunisa" className="rounded-md mb-4 h-56 w-full object-cover" />
            <h2 className="text-xl font-bold">Ratu Chairunisa</h2>
            <p className="text-gray-600">Machine Learning</p>
            <p className="text-gray-700 text-sm mt-2">Membangun candi.</p>
          </div>
        </div>
      </section>
      <section></section>
    </>
  );
};
