# SHIFT Helper

[English](README.md) | [中文](README_zh.md) | [Deutsch](README_de.md) | [日本語](README_ja.md) | [한국어](README_ko.md) | [Wikang Tagalog](README_tl.md) | [reo Māori](README_mi.md) | [हिन्दी](README_hi.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Isang simple, madaling gamitin, at open-source na tool sa pamamahala ng shift na espesyal na idinisenyo para sa mga driver ng Kinetic NZ Bus Tauranga, na tumutulong sa kanila na magplano ng lingguhang shift at idagdag ito sa karamihan ng mga calendar application.

#### Mga Tampok
1. **Suporta sa Maramihang Depot**: Sinusuportahan ang mga Shift para sa Greerton, Papamoa, Maleme, at Standby.
2. **School Holiday Mode**: I-on ang School Holiday switch upang awtomatikong ayusin ang mga opsyon ng Shift.
3. **Public Holiday Mode**: Itakda ang anumang araw bilang Public Holiday upang dynamic na baguhin ang mga opsyon nito.
4. **Batch na Pag-aayos ng Shift**: Para sa mga shift na umuulit sa maraming araw, maaaring pumili ng mga petsa nang sabay-sabay para sa synchronized na pagpaplano.
5. **Pag-export sa Kalendaryo**: Gumawa ng .ics file na compatible sa mga pangunahing calendar app (hal., Google Calendar, Apple Calendar, Microsoft Outlook Calendar).
6. **Available Offline**: Ang teknolohiyang PWA ay nagbibigay-daan sa paggamit anumang oras, kahit saan.

### Paano Gamitin
1. Pumili ng Depot (hal., Greerton).
2. Pumili ng anumang araw sa isang linggo upang awtomatikong ipakita ang shift view na nagsisimula sa Linggo.
3. Gumamit ng dropdown menu upang itakda ang araw-araw na shift, lagyan ng check ang mga kahon para sa batch synchronization, at i-toggle ang mga opsyon sa holiday upang ayusin ang mga shift.
4. I-click ang “Add to Calendar” upang makabuo ng .ics file at i-import ito sa iyong kalendaryo. Ang mga gumagamit ng iPhone Safari ay maaaring direktang mag-import nang hindi nagda-download.
5. I-click ang “Send Feedback” upang magsumite ng mga suhestiyon o mag-ulat ng mga error sa database; tingnan ang “About” para sa impormasyon sa bersyon at update.

### Pag-install
Sinusuportahan ng SHIFT Helper ang pag-access sa browser at pag-install sa mobile, na nag-aalok ng PWA (Progressive Web App) na karanasan. Narito ang hakbang-hakbang na gabay para sa iba’t ibang device:

#### Pag-access sa Browser
- Buksan ang anumang modernong browser (hal., Chrome, Safari, Edge).
- Ipasok ang URL: https://chenpreston.github.io/shift-helper-pwa/
- Maaaring gamitin agad nang walang karagdagang pag-install.

#### Mga Gumagamit ng Android
- **Mga Hakbang**:
  1. Buksan ang URL sa itaas gamit ang Chrome browser (inirerekomenda).
  2. I-tap ang “tatlong tuldok na menu” sa kanang itaas na sulok.
  3. Piliin ang “Idagdag sa Home Screen” o “I-install ang App.”
  4. Pagkatapos ng kumpirmasyon, lilitaw ang icon ng app sa iyong home screen at magagamit tulad ng native app.
- **Pag-import sa Kalendaryo**:
  - Pagkatapos i-click ang “Add to Calendar,” i-download ang .ics file.
  - Buksan ang file (karaniwang awtomatikong naka-link sa Google Calendar) at sundin ang mga tagubilin upang i-import.
- **Paalala**: Sinusuportahan ang offline na paggamit; inirerekomenda ang koneksyon sa network para sa pinakabagong data.

#### Mga Gumagamit ng Apple (iPhone/iPad)
- **Mga Hakbang**:
  1. Buksan ang URL sa itaas gamit ang Safari browser (kailangan ang Safari para sa direktang pag-import sa kalendaryo).
  2. I-tap ang “Share” icon sa ibaba (isang parisukat na may pataas na arrow).
  3. Piliin ang “Idagdag sa Home Screen.”
  4. Pagkatapos ng kumpirmasyon, lilitaw ang icon ng app sa iyong home screen at magagamit na.
- **Pag-import sa Kalendaryo**:
  - Pagkatapos i-click ang “Add to Calendar”:
    - **Safari**: Lalabas ang prompt para sa pag-import sa kalendaryo; sundin ito upang idagdag sa Apple Calendar.
    - **Chrome**: Ido-download lamang ang .ics file, hindi maaaring direktang i-import sa Apple Calendar.
  - Kung na-download ang .ics file sa Chrome, ipadala ito sa pamamagitan ng email o AirDrop upang buksan sa Safari, o gumamit ng third-party app na sumusuporta sa .ics (hal., Google Calendar App).
- **Mahahalagang Paalala**:
  - Sa mga Apple device, hindi maaaring direktang i-import ng Chrome at iba pang non-Safari browser ang .ics file sa Apple Calendar. Kung hindi mo karaniwang ginagamit ang Safari, inirerekomenda naming gamitin ito isang beses lamang para sa mga hakbang sa pag-install sa itaas. Pagkatapos ng pag-install, kapag binuksan ang app mula sa home screen, awtomatikong gagamitin ng system ang Safari engine, kaya maaari kang magpatuloy sa paggamit ng Chrome para sa pang-araw-araw na pagba-browse sa web.
  - Siguraduhing naka-update ang iyong iOS system sa pinakabagong bersyon para sa pinakamahusay na karanasan.

### Pinagmulan ng Data
Ang data ay nagmula sa pinakabagong Shift Card na ibinigay ng kumpanya (inayos noong Enero 2025). Kasama sa kalendaryo ang: numero ng shift, oras ng sign-on, oras ng sign-off, lokasyon ng pagkain, tagal ng pagkain, at tagal ng pahinga.

### Teknolohiya
- **Frontend**: HTML, CSS, JavaScript
- **PWA**: Service Worker para sa offline caching
- **CSV Parsing**: PapaParse library
- **Open Source**: MIT License, available ang source code sa [GitHub](https://github.com/chenpreston/shift-helper-pwa)