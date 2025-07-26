# DriftPro Admin - Automatisk E-post System

## 🚀 Automatisk E-post Funksjonalitet

Dette systemet sender automatisk e-post til admin-brukere når en ny bedrift opprettes i DriftPro Admin panelet.

## 📧 Oppsett av E-post System

### 1. Installer Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Logg inn på Firebase
```bash
firebase login
```

### 3. Initialiser Firebase Functions
```bash
firebase init functions
```

### 4. Konfigurer E-post Innstillinger
```bash
firebase functions:config:set email.user="din-email@gmail.com"
firebase functions:config:set email.pass="din-app-passord"
```

**Viktig:** Bruk en Gmail App Password, ikke vanlig passord!

### 5. Installer Dependencies
```bash
cd functions
npm install
```

### 6. Deploy Functions
```bash
firebase deploy --only functions
```

## 🔧 Gmail App Password Oppsett

### 1. Aktiver 2-Faktor Autentisering
- Gå til Google Account Settings
- Aktiver 2-Step Verification

### 2. Opprett App Password
- Gå til Security > App passwords
- Velg "Mail" og "Other (Custom name)"
- Skriv "DriftPro Admin"
- Kopier det genererte passordet

### 3. Bruk App Password
```bash
firebase functions:config:set email.pass="generert-app-passord"
```

## 📨 E-post Template

E-posten som sendes inneholder:
- ✅ **Velkomstmelding** - Personlig hilsen til admin
- ✅ **Bedriftsinformasjon** - Navn på bedriften
- ✅ **Invitasjonslenke** - Direkte link til passordoppsett
- ✅ **Instruksjoner** - Hvordan sette opp passord
- ✅ **Funksjoner** - Hva admin kan gjøre
- ✅ **Sikkerhet** - Informasjon om lenkens gyldighet

## 🔄 Automatisk Flyt

### Når bedrift opprettes:
1. **DriftPro Admin** oppretter bedrift med admin-detaljer
2. **Cloud Function** triggeres automatisk
3. **E-post sendes** til admin-brukeren
4. **Admin får lenke** til passordoppsett
5. **Admin setter opp passord** og logger inn

### E-post inneholder:
- 🎨 **Moderne design** - Samme stil som resten av systemet
- 📱 **Responsiv** - Fungerer på alle enheter
- 🔗 **Direkte lenke** - Klikk for å sette opp passord
- ⏰ **Tidsbegrensning** - Lenke utløper om 24 timer

## 🛠️ Feilhåndtering

Systemet håndterer:
- ✅ **E-post feil** - Logger feil og oppdaterer status
- ✅ **Nettverksproblemer** - Retry-logikk
- ✅ **Ugyldige e-poster** - Validering før sending
- ✅ **Status tracking** - Sporer om e-post ble sendt

## 📊 Status Tracking

Hver invitasjon sporer:
- ✅ **emailSent** - Om e-post ble sendt
- ✅ **emailSentAt** - Når e-post ble sendt
- ✅ **emailError** - Feilmelding hvis sending feilet
- ✅ **emailErrorAt** - Når feilen oppsto

## 🔒 Sikkerhet

- ✅ **App Password** - Sikker e-post autentisering
- ✅ **Tidsbegrenset lenke** - Utløper om 24 timer
- ✅ **Enkelt bruk** - Lenke kan kun brukes én gang
- ✅ **Validering** - Sjekker at invitasjonen er gyldig

## 🚀 Deployment

```bash
# Deploy alt
firebase deploy

# Deploy kun functions
firebase deploy --only functions

# Deploy kun hosting
firebase deploy --only hosting
```

## 📝 Logs

Se e-post sending logs:
```bash
firebase functions:log --only sendInvitationEmail
```

## 🎯 Test

1. **Opprett bedrift** i DriftPro Admin
2. **Sjekk e-post** til admin-brukeren
3. **Klikk på lenken** i e-posten
4. **Sett opp passord** på setup-password.html
5. **Logger inn** med nytt passord

## 🔧 Troubleshooting

### E-post sendes ikke:
1. Sjekk Firebase Functions logs
2. Verifiser e-post konfigurasjon
3. Sjekk at App Password er riktig
4. Verifiser at 2FA er aktivert

### Lenke fungerer ikke:
1. Sjekk at invitasjonen eksisterer i Firestore
2. Verifiser at lenken ikke har utløpt
3. Sjekk at lenken ikke allerede er brukt

## 📞 Support

Hvis du har problemer:
1. Sjekk Firebase Console logs
2. Verifiser alle konfigurasjoner
3. Test med en enkel e-post først
4. Sjekk at alle dependencies er installert
# Netlify Cache Refresh - Sat Jul 26 18:58:40 CEST 2025
