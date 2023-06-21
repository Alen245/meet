import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;

    jest.setTimeout(30000);

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ['--disable-extensions'], // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/', { timeout: 5000 });

        await page.waitForSelector('.event');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .detailsButton');
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .detailsButton');
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull();
    });

    test('User has not searched for a city, show upcoming events from all cities', async () => {
        const events = await page.$$('.event');
        expect(events).toHaveLength(2);
    });

    test('User should see a list of suggestions when they search for a city', async () => {
        await page.type('.city', 'Berlin');
        const suggestions = await page.$$('.suggestions li');
        expect(suggestions).toHaveLength(2);
    });

    test('User can select a city from the suggested list', async () => {
        await page.click('.suggestions li:nth-child(1)');
        const input = await page.$eval('.city', (el) => el.value);
        expect(input).toBe('Berlin, Germany');

        const events = await page.$$('.event');
        expect(events).toHaveLength(1);
    });
});
