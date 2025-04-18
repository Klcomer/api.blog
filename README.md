# Blog API

Bu proje, bir blog uygulaması için geliştirilmiş RESTful API'dir. Node.js, Express.js ve MongoDB kullanılarak geliştirilmiştir.

## Özellikler

- Kullanıcı kaydı ve girişi
- JWT tabanlı kimlik doğrulama
- Rol tabanlı yetkilendirme (user, admin, developer, crm)
- Şifre sıfırlama ve email doğrulama
- Güvenlik önlemleri (rate limiting, xss protection, helmet)

## Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB
- npm veya yarn

## Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd blog-api
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun:
```bash
cp .env.example .env
```

4. `.env` dosyasını düzenleyin:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=90d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=http://localhost:3000
```

5. Veritabanını başlatın:
```bash
# MongoDB'yi başlatın
mongod
```

6. Uygulamayı başlatın:
```bash
# Geliştirme modunda
npm run dev

# Production modunda
npm start
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Kullanıcı kaydı
- `POST /api/v1/auth/login` - Kullanıcı girişi
- `POST /api/v1/auth/logout` - Çıkış yapma
- `POST /api/v1/auth/forget-password` - Şifre sıfırlama talebi
- `POST /api/v1/auth/reset-password` - Şifre sıfırlama
- `GET /api/v1/auth/me` - Kullanıcı bilgilerini getirme

## Güvenlik

- Tüm şifreler bcrypt ile hashlenir
- JWT token'ları güvenli bir şekilde saklanır
- Rate limiting ile brute force saldırılarına karşı koruma
- XSS ve diğer web saldırılarına karşı koruma
- CORS politikaları ile güvenli kaynak paylaşımı

## Test

```bash
# Tüm testleri çalıştır
npm test

# Test coverage raporu oluştur
npm run test:coverage
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın. 