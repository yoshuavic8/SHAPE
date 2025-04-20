# Test info

- Name: SHAPE-E Questionnaire Flow >> should navigate through the entire questionnaire flow
- Location: /Users/yoshuavictor/Nextjs/SHAPE/tests/questionnaire-flow.spec.ts:19:7

# Error details

```
Error: browserType.launch: Executable doesn't exist at /Users/yoshuavictor/Library/Caches/ms-playwright/chromium_headless_shell-1169/chrome-mac/headless_shell
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | // Kredensial pengujian
   4 | const TEST_EMAIL = 'test@example.com';
   5 | const TEST_PASSWORD = 'password123';
   6 |
   7 | test.describe('SHAPE-E Questionnaire Flow', () => {
   8 |   test.beforeEach(async ({ page }) => {
   9 |     // Login sebelum setiap test
   10 |     await page.goto('/auth/login');
   11 |     await page.fill('input[type="email"]', TEST_EMAIL);
   12 |     await page.fill('input[type="password"]', TEST_PASSWORD);
   13 |     await page.click('button[type="submit"]');
   14 |     
   15 |     // Pastikan login berhasil
   16 |     await expect(page).toHaveURL('/dashboard');
   17 |   });
   18 |
>  19 |   test('should navigate through the entire questionnaire flow', async ({ page }) => {
      |       ^ Error: browserType.launch: Executable doesn't exist at /Users/yoshuavictor/Library/Caches/ms-playwright/chromium_headless_shell-1169/chrome-mac/headless_shell
   20 |     // Mulai kuesioner dari dashboard
   21 |     await page.click('text=Take Questionnaire');
   22 |     await expect(page).toHaveURL('/questionnaire');
   23 |     
   24 |     // Klik tombol mulai kuesioner
   25 |     await page.click('text=Mulai Kuesioner');
   26 |     await expect(page).toHaveURL('/questionnaire/spiritual');
   27 |     
   28 |     // Isi bagian Spiritual Gifts
   29 |     await fillSpiritualGiftsSection(page);
   30 |     
   31 |     // Isi bagian Heart Desire
   32 |     await fillHeartDesireSection(page);
   33 |     
   34 |     // Isi bagian Personality
   35 |     await fillPersonalitySection(page);
   36 |     
   37 |     // Isi bagian Experiences
   38 |     await fillExperiencesSection(page);
   39 |     
   40 |     // Verifikasi diarahkan ke halaman hasil
   41 |     await expect(page).toHaveURL('/results');
   42 |     
   43 |     // Verifikasi elemen-elemen kunci di halaman hasil
   44 |     await expect(page.locator('text=Hasil SHAPE-E Anda')).toBeVisible();
   45 |     await expect(page.locator('text=SHAPE Code')).toBeVisible();
   46 |   });
   47 | });
   48 |
   49 | // Helper functions untuk mengisi setiap bagian kuesioner
   50 | async function fillSpiritualGiftsSection(page) {
   51 |   // Isi semua pertanyaan dengan nilai acak 1-5
   52 |   const questions = await page.locator('.question-item').count();
   53 |   
   54 |   for (let i = 1; i <= questions; i++) {
   55 |     const randomValue = Math.floor(Math.random() * 5) + 1; // Nilai 1-5
   56 |     await page.click(`[data-question="${i}"] [data-value="${randomValue}"]`);
   57 |   }
   58 |   
   59 |   // Klik tombol next
   60 |   await page.click('button:has-text("Next")');
   61 |   await expect(page).toHaveURL('/questionnaire/heart');
   62 | }
   63 |
   64 | async function fillHeartDesireSection(page) {
   65 |   // Isi semua pertanyaan dengan nilai acak 1-5
   66 |   const questions = await page.locator('.question-item').count();
   67 |   
   68 |   for (let i = 1; i <= questions; i++) {
   69 |     const randomValue = Math.floor(Math.random() * 5) + 1; // Nilai 1-5
   70 |     await page.click(`[data-question="${i}"] [data-value="${randomValue}"]`);
   71 |   }
   72 |   
   73 |   // Klik tombol next
   74 |   await page.click('button:has-text("Next")');
   75 |   await expect(page).toHaveURL('/questionnaire/personality');
   76 | }
   77 |
   78 | async function fillPersonalitySection(page) {
   79 |   // Isi semua pertanyaan dengan nilai acak 1-5
   80 |   const questions = await page.locator('.question-item').count();
   81 |   
   82 |   for (let i = 1; i <= questions; i++) {
   83 |     const randomValue = Math.floor(Math.random() * 5) + 1; // Nilai 1-5
   84 |     await page.click(`[data-question="${i}"] [data-value="${randomValue}"]`);
   85 |   }
   86 |   
   87 |   // Klik tombol next
   88 |   await page.click('button:has-text("Next")');
   89 |   await expect(page).toHaveURL('/questionnaire/experiences');
   90 | }
   91 |
   92 | async function fillExperiencesSection(page) {
   93 |   // Isi semua pertanyaan dengan nilai acak 1-5
   94 |   const questions = await page.locator('.question-item').count();
   95 |   
   96 |   for (let i = 1; i <= questions; i++) {
   97 |     const randomValue = Math.floor(Math.random() * 5) + 1; // Nilai 1-5
   98 |     await page.click(`[data-question="${i}"] [data-value="${randomValue}"]`);
   99 |   }
  100 |   
  101 |   // Klik tombol submit
  102 |   await page.click('button:has-text("Submit")');
  103 | }
  104 |
```