//https://www.nybolig.dk/villa/8270/elverdalsvej/101721/7017497
import puppeteer from "puppeteer";
import notEmpty from "../notEmpty.js";

export async function scrape(agentLink: string):Promise<string[]> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(agentLink, { waitUntil: "networkidle0" });
  await page.click("#declineButton");
  const imageUrls: string[] = (
    await page.$$eval(".slider-image__image", (imgs) =>
      imgs.map((img) => img.getAttribute("src"))
    )
  ).filter(notEmpty);
  await browser.close();
  
  return imageUrls;
}
