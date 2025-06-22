# MylibaCase

## FrontEnd (Angular)
- **Kişi Ekleme:** Kullanıcı dostu bir form aracılığıyla yeni kişi bilgilerinin (ad, soyad, e-posta) eklenmesi.
- **Kişi Listeleme:** MongoDB'den çekilen tüm kişi verilerinin dinamik ve güncel bir liste halinde sunumu.
- **Kişi Güncelleme:** Mevcut bir kişinin bilgilerini seçerek form üzerinden düzenleme ve değişiklikleri kaydetme.
- **Kişi Silme:** Listedeki herhangi bir kişiyi tek tıkla güvenli bir şekilde silme.
- **Kapsamlı Form Validasyonu:** Kullanıcı girişi için client-side validasyonları (gerekli alanlar, e-posta formatı) ile kullanıcı deneyimini iyileştirme.
- **Dinamik Hata ve Başarı Mesajları:** API yanıtlarına göre kullanıcı arayüzünde anlık, anlaşılır hata (örn. benzersiz e-posta kısıtlaması ihlali) ve başarı bildirimleri görüntüleme.

## Backend (.Net Core Web API)
- **RESTful API Endpoint'leri:** Kişi yönetimi için standart HTTP metodlarına (GET, POST, PUT, DELETE) uygun, anlaşılır ve sürdürülebilir API endpoint'leri tasarımı.
- **MongoDB Veritabanı Entegrasyonu:** NoSQL veritabanı MongoDB'nin hızlı ve esnek veri depolama yeteneklerinden faydalanma.
- **Veri Modeli ve Servis Katmanı:** Veritabanı işlemleri için özel bir servis katmanı (UserService) oluşturarak iş mantığı ile veri erişim katmanının ayrıştırılması.
- **Benzersiz E-posta Kısıtlaması:** Hem yeni kişi ekleme (POST) hem de mevcut kişileri güncelleme (PUT) işlemleri sırasında e-posta adreslerinin veritabanı genelinde benzersizliğini sağlayan sunucu tarafı validasyonu. Bu kontrol, ApplicationException fırlatılarak yönetilir.
- **CORS Politikası Yönetimi:** Farklı bir domain/port'ta çalışan Angular frontend uygulamasının API'ye güvenli bir şekilde erişimini sağlamak için esnek CORS (Cross-Origin Resource Sharing) politikası yapılandırması.

## Kullanılan Teknolojiler ve Versiyonlar
### Frontend
- **Angular:** 20.0.3
- **TypeScript**
- **HTML5 & CSS3**

### Backend
- **.NET Core:** 9.0 (ASP.NET Core Web API)
- **MongoDB:** 7.0.21 (NoSQL Veritabanı)

## Erişim Bilgileri
- **Frontend URL:** http://localhost:4200 veya https://localhost:4200
- **API URL:** http://localhost:5269/api/user
- **MongoDB Bağlantısı:** mongodb://localhost:27017

## Projeyi Çalıştırırken
### Frontend
- **Angular**, dosyasını çalıştırmak istediğinizde önceden altta belirtilen komutu terminalde çalıştırınız. 
```
npm install
```
### Backend
- **.Net Core API**, dosyasını çalıştırmak istediğinizde client ile başarılı bir şekilde bağlantı kurabilmesi için http olarak çalıştırınız.

### Proje Github Klonu

```
git clone https://github.com/OgulcanOnder/MylibaCase.git 
```