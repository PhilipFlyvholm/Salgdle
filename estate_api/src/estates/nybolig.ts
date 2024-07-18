//https://www.nybolig.dk/villa/8270/elverdalsvej/101721/7017497
import puppeteer from "puppeteer";
import notEmpty from "../notEmpty.js";
import { BaseProperty, PropertyType } from '../Property.js';

export async function scrape(agentLink: string): Promise<BaseProperty> {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(agentLink, { waitUntil: "networkidle0" });
  await page.click("#declineButton");
  const imageUrls: string[] = (await page.$$eval(".slider-image__image", (imgs) => 
     imgs.map((img) => img.getAttribute("src"))
  )).filter(notEmpty);
  if(imageUrls.length === 0){
    throw new Error("No images found");
  }
  
  //Title css class: .media-presentation__case-info__property__info__title
  const adress_text = await page.$eval(".media-presentation__case-info__property__info__title", (title) => title.textContent);
  if(adress_text === null){
    throw new Error("No adress found");
  }
  const adress = adress_text.replaceAll("\n", "").trim();
  

  await browser.close();

  const BaseProperty: BaseProperty = {
    vendor: "nybolig",
    vendor_url: new URL("https://www.nybolig.dk/"),
    vendor_id: "",
    full_url: new URL(agentLink),
    price: 0,
    pricem2: 0,
    address_display_name: adress,
    propertym2: 0,
    rooms: 0,
    type: PropertyType.Villa,
    images: imageUrls,
  };
  return BaseProperty;
}
