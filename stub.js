/**
 * Created by anuraggrover on 05/08/15.
 */

(function (W) {
    'use strict';

    var offers = [{
            "id": 69,
            "merchant_name": "McDonald's",
            "title": "Free Banana Oreo Soft Serve ",
            "coupon_type": "no_code",
            "kind": "offline",
            "base_url": "",
            "terms": "Applicable on purchase of any Medium/Large Meal\r\nValid till 10th Sep 2015\r\nApplicable from 11 am - 11 pm\r\nApplicable for dine-in, takeaway and drive-thru.\r\nNot valid on Mc Delivery\r\nApplicable at outlets in Tamil Nadu & Kerela\r\nOnly one coupon will be honoured per transaction\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash or for any other product\r\nPrices exclusive of all taxes\r\nShow the screen before bill is generated\r\nMcDonald's reserves the right to withdraw/modify this offer without prior notice to the customers\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
            "merchant_description": "McDonald's is one of the largest Fast Food Chain across the world, best known for their burgers. The store offers a wide range of burgers, pizzas and gourmet snazzy refreshments.",
            "merchant_logo": "http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/22/medium/data",
            "offer_image": "http://hoppr-image.s3.amazonaws.com/coupons-production/offers/69/medium/open-uri20150821-7727-gt5bht"
        }, {
            "id": 115,
            "merchant_name": "Jabong",
            "title": "30% off",
            "coupon_type": "merchant_generated",
            "kind": "online",
            "base_url": "http://www.jabong.com/all-products/?promotion=additional-30",
            "terms": "Offer valid on min purchase of Rs 999\r\nOffer can be redeemed on http://bit.ly/1wRl2Qq\r\nApplicable only on products listed under the weblink\r\nCannot be redeemed in cash\r\nCannot be combined with any other offer/discount/promotion\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
            "merchant_description": "Jabong is one of the largest and most popular shopping portals in India. It caters to the fashion needs of men, women and kids across footwear, apparel, jewellery and accessories.",
            "merchant_logo": "http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/16/medium/data",
            "offer_image": "http://hoppr-image.s3.amazonaws.com/coupons-production/offers/115/medium/open-uri20150821-7727-km4ibk"
        }, {
            "id": 135,
            "merchant_name": "AskmeBazaar",
            "title": "25% off",
            "coupon_type": "static",
            "kind": "online",
            "base_url": "http://www.askmebazaar.com/",
            "terms": "Offer valid on min purchase of Rs 500\r\nNot applicable on flash sale of the day products\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
            "merchant_description": "AskmeBazaar is India's emerging Online Shopping portal that allows consumers to choose from various sellers offering a wide variety of Fashion and Lifestyle products.",
            "merchant_logo": "http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/54/medium/data",
            "offer_image": "http://hoppr-image.s3.amazonaws.com/coupons-production/offers/135/medium/offer-askmebazaar.jpeg"
        }, {
            "id": 110,
            "merchant_name": "Pizza Hut",
            "title": "Rs 100 off",
            "coupon_type": "merchant_generated",
            "kind": "online",
            "base_url": "",
            "terms": "Valid on min bill of Rs 350\r\nValid only on Delivery & Carryout orders placed through www.pizzahut.co.in and on Pizza Hut Mobile App\r\nNot Valid on Magic Pan, Big Pizzas, Birizza, Pan 4 all & Beverages\r\nDelivery available in limited areas\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
            "merchant_description": "Pizza Hut is the leading casual dining restaurant brand in India. It offers an exciting menu consisting of its signature pizzas, appetizers, pastas, desserts and beverages.",
            "merchant_logo": "http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/6/medium/data",
            "offer_image": "http://hoppr-image.s3.amazonaws.com/coupons-production/offers/110/medium/Cheese-pizza-slice-hi-res.jpeg"
        }, {
            "id": 47,
            "merchant_name": "Dominos",
            "title": "20% off",
            "coupon_type": "static",
            "kind": "online",
            "base_url": "",
            "terms": "Min bill of Rs 350\r\nApplicable only on online orders\r\nNot applicable on Simply Veg/Simply N.Veg pizza, Regular pizza, Pizza Mania combos, Sides, Beverages, Desserts & stuffed garlic bread\r\nCannot be combined with any offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
            "merchant_description": "Domino's is the fastest growing fast food service restaurant for casual and fine dining. Choose from an array of vegetarian and non vegetarian pizzas, side orders, combos and side dishes",
            "merchant_logo": "http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/30/medium/data",
            "offer_image": "http://hoppr-image.s3.amazonaws.com/coupons-production/offers/47/medium/open-uri20150821-7727-8e0y35"
        }, {
            "id": 40,
            "merchant_name": "Shopclues",
            "title": "13% off",
            "coupon_type": "static",
            "kind": "online",
            "base_url": "http://www.shopclues.com/",
            "terms": "Valid on min purchase of Rs 200\r\nApplicable only on Fashion & Footwear categories\r\nNot applicable on Factory Outlet products\r\nMax discount upto Rs 400\r\nExtra shipping charges, wherever applicable\r\nCannot be redeemed in cash\r\nCannot be combined with any other offer/discount/promotion\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
            "merchant_description": "Shopclues is among the fastest growing E-Commerce destinations. It offers global & domestic brands, and thousands of online stores from brands or retailer across 900+ listing categories.",
            "merchant_logo": "http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/20/medium/data",
            "offer_image": "http://hoppr-image.s3.amazonaws.com/coupons-production/offers/40/medium/open-uri20150821-7727-namjky"
        }, {
            "id": 56,
            "merchant_name": "Lenskart",
            "title": "45% off",
            "coupon_type": "merchant_generated",
            "kind": "online",
            "base_url": "http://www.lenskart.com/sunglasses.html",
            "terms": "Valid on min purchase of Rs 800\r\nApplicable only on Sunglasses\r\nOffer valid on Parim, Lewis Hamilton, Vincent Chase and Chota Bheem\r\nNot valid on Eyeglasses, Power Glasses, Reading Glasses, Contact Lenses and Lens Solution\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claim arising out of use of this coupon",
            "merchant_description": "Lenskart is India’s leading online shopping portal for eyewear. You can order from a gamut of options ranging from eyeglasses to contact lenses to sunglasses for men and women.",
            "merchant_logo": "http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/31/medium/data",
            "offer_image": "http://hoppr-image.s3.amazonaws.com/coupons-production/offers/56/medium/open-uri20150821-7727-1ub5iux"
        }],
        fullCoupons = {"offers": offers, "page_count": 5},

        bootstrapResponse = {
        variant: '1',
        "region":{
            "id":"1",
            "name":"Delhi NCR"
        },
        "tags":[
            {
                "name":"featured",
                "offers":[
                    {
                        "id":115,
                        "base_url":"http://www.jabong.com/all-products/?promotion=additional-30",
                        "title":"30% off",
                        "kind":"online",
                        "coupon_type":"merchant_generated",
                        "terms":"Offer valid on min purchase of Rs 999\r\nOffer can be redeemed on http://bit.ly/1wRl2Qq\r\nApplicable only on products listed under the weblink\r\nCannot be redeemed in cash\r\nCannot be combined with any other offer/discount/promotion\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Jabong",
                        "merchant_description":"Jabong is one of the largest and most popular shopping portals in India. It caters to the fashion needs of men, women and kids across footwear, apparel, jewellery and accessories.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/16/small/Jabong-16-PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/16/medium/Jabong-16-PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/16/large/Jabong-16-PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/115/small/Jabong.jpg",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/115/medium/Jabong.jpg",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/115/large/Jabong.jpg"
                        }
                    },
                    {
                        "id":135,
                        "base_url":"http://www.askmebazaar.com/",
                        "title":"25% off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Offer valid on min purchase of Rs 500\r\nNot applicable on flash sale of the day products & bazaar price products\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"AskmeBazaar",
                        "merchant_description":"AskmeBazaar is India's emerging Online Shopping portal that allows consumers to choose from various sellers offering a wide variety of Fashion and Lifestyle products.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/54/small/Askmebazaar-54-PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/54/medium/Askmebazaar-54-PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/54/large/Askmebazaar-54-PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/135/small/offer-askmebazaar.jpeg",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/135/medium/offer-askmebazaar.jpeg",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/135/large/offer-askmebazaar.jpeg"
                        }
                    },
                    {
                        "id":110,
                        "base_url":"",
                        "title":"Rs 100 off",
                        "kind":"online",
                        "coupon_type":"merchant_generated",
                        "terms":"Valid on min bill of Rs 350\r\nValid only on Delivery & Carryout orders placed through www.pizzahut.co.in and on Pizza Hut Mobile App\r\nNot Valid on Magic Pan, Big Pizzas, Birizza, Pan 4 all & Beverages\r\nDelivery available in limited areas\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Pizza Hut",
                        "merchant_description":"Pizza Hut is the leading casual dining restaurant brand in India. It offers an exciting menu consisting of its signature pizzas, appetizers, pastas, desserts and beverages.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/6/small/Pizza_Hut.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/6/medium/Pizza_Hut.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/6/large/Pizza_Hut.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/110/small/52_shutterstock_35443840.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/110/medium/52_shutterstock_35443840.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/110/large/52_shutterstock_35443840.png"
                        }
                    },
                    {
                        "id":47,
                        "base_url":"",
                        "title":"20% off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Min bill of Rs 350\r\nApplicable only on online orders\r\nNot applicable on Simply Veg/Simply N.Veg pizza, Regular pizza, Pizza Mania combos, Sides, Beverages, Desserts & stuffed garlic bread\r\nCannot be combined with any offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Dominos",
                        "merchant_description":"Domino's is the fastest growing fast food service restaurant for casual and fine dining. Choose from an array of vegetarian and non vegetarian pizzas, side orders, combos and side dishes",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/30/small/Dominos_final.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/30/medium/Dominos_final.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/30/large/Dominos_final.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/47/small/open-uri20150821-7727-8e0y35",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/47/medium/open-uri20150821-7727-8e0y35",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/47/large/open-uri20150821-7727-8e0y35"
                        }
                    },
                    {
                        "id":40,
                        "base_url":"http://www.shopclues.com/",
                        "title":"13% off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Valid on min purchase of Rs 200\r\nApplicable only on Fashion & Footwear categories\r\nNot applicable on Factory Outlet products\r\nMax discount upto Rs 400\r\nExtra shipping charges, wherever applicable\r\nCannot be redeemed in cash\r\nCannot be combined with any other offer/discount/promotion\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Shopclues",
                        "merchant_description":"Shopclues is among the fastest growing E-Commerce destinations. It offers global & domestic brands, and thousands of online stores from brands or retailer across 900+ listing categories.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/20/small/ShopC.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/20/medium/ShopC.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/20/large/ShopC.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/40/small/open-uri20150821-7727-namjky",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/40/medium/open-uri20150821-7727-namjky",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/40/large/open-uri20150821-7727-namjky"
                        }
                    },
                    {
                        "id":56,
                        "base_url":"http://www.lenskart.com/sunglasses.html",
                        "title":"45% off",
                        "kind":"online",
                        "coupon_type":"merchant_generated",
                        "terms":"Valid on min purchase of Rs 800\r\nApplicable only on Sunglasses\r\nOffer valid on Parim, Lewis Hamilton, Vincent Chase and Chota Bheem\r\nNot valid on Eyeglasses, Power Glasses, Reading Glasses, Contact Lenses and Lens Solution\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claim arising out of use of this coupon",
                        "merchant_name":"Lenskart",
                        "merchant_description":"Lenskart is India’s leading online shopping portal for eyewear. You can order from a gamut of options ranging from eyeglasses to contact lenses to sunglasses for men and women.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/31/small/Lenskart_PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/31/medium/Lenskart_PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/31/large/Lenskart_PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/56/small/open-uri20150821-7727-1ub5iux",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/56/medium/open-uri20150821-7727-1ub5iux",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/56/large/open-uri20150821-7727-1ub5iux"
                        }
                    },
                    {
                        "id":6,
                        "base_url":"http://www.naaptol.com/",
                        "title":"Rs 200 off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Valid on min purchase of Rs 999\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Naaptol",
                        "merchant_description":"Naaptol is a complete shopping destination. Naaptol offers a wide range of products including hi-tech gadgets, kitchen and home appliances, jewelry, clothes, textile and much more.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/56/small/Naaptol_PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/56/medium/Naaptol_PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/56/large/Naaptol_PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/6/small/Naaptol.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/6/medium/Naaptol.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/6/large/Naaptol.png"
                        }
                    },
                    {
                        "id":113,
                        "base_url":"http://www.chumbak.com/",
                        "title":"Rs 250 off",
                        "kind":"online",
                        "coupon_type":"merchant_generated",
                        "terms":"Valid on min purchase of Rs 1000\r\nNot valid at Chumbak physical stores\r\nOffer valid till 30th Sep'15\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Chumbak",
                        "merchant_description":"Chumbak is an online shopping site for HandBags, Phone Cases, Crockery, Home Decor, Apparel, Mugs & more. Chumbak takes everyday objects and turns them into colourful and fun-filled products.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/62/small/Chumbak-62-PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/62/medium/Chumbak-62-PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/62/large/Chumbak-62-PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/113/small/Chumbak.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/113/medium/Chumbak.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/113/large/Chumbak.png"
                        }
                    }
                ],
                "page_count":1
            },
            {
                "name":"online",
                "offers":[
                    {
                        "id":57,
                        "base_url":"https://m.ebay.in",
                        "title":"Upto Rs 750 off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"7% or Rs 750 off whichever is lower\r\nOffer can be redeemed on https://m.ebay.in\r\nNot applicable on select items\r\nCannot be combined with any offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"eBay",
                        "merchant_description":"eBay is a online marketplace, enabling trade on a local, national and international basis. At Ebay India you can buy almost everything such as Mobile Phones, Electronics, Computers, Laptops, Gadgets, Cameras, Memory Cards, Tablets, Clothing, Healthcare Products, Beauty products, Home and Kitchen Products.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/27/small/eBay_final.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/27/medium/eBay_final.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/27/large/eBay_final.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/57/small/Ebay_(2).png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/57/medium/Ebay_(2).png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/57/large/Ebay_(2).png"
                        }
                    },
                    {
                        "id":138,
                        "base_url":"",
                        "title":"Rs 500 off",
                        "kind":"offline",
                        "coupon_type":"merchant_generated",
                        "terms":"Min purchase of Rs 3000\r\nValid at Puma stores in Bengaluru, Mumbai and Delhi\r\nOffer valid till 4th Oct'15\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPresent the coupon before bill is generated\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Puma",
                        "merchant_description":"Puma offers trendiest athletic and casual footwear.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/69/small/Puma.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/69/medium/Puma.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/69/large/Puma.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/138/small/Puma-Store.jpg",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/138/medium/Puma-Store.jpg",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/138/large/Puma-Store.jpg"
                        }
                    },
                    {
                        "id":139,
                        "base_url":"http://www.giftsbymeeta.com/discount-on-gifts",
                        "title":"15% off on Gifts",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Offer can be redeemed on http://bit.ly/10DTxzQ\r\nProduct delivery not available on Sundays\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Gifts by Meeta",
                        "merchant_description":"With Giftsbymeeta start sending gifts to your loved ones anywhere you are. They have a variety of gift choices to help you pick the right gift that perfectly matches the special occasion. Choose from utility birthday gifts, funky mugs, fragrances and much more.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/55/small/data",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/55/medium/data",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/55/large/data"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/139/small/gifts_by_meeta_offer.jpg",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/139/medium/gifts_by_meeta_offer.jpg",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/139/large/gifts_by_meeta_offer.jpg"
                        }
                    },
                    {
                        "id":18,
                        "base_url":"http://www.zoomcar.com/",
                        "title":"18% off",
                        "kind":"online",
                        "coupon_type":"merchant_generated",
                        "terms":"Offer valid on all drives\r\nApplicable on Monday to Thursday booking\r\nMax discount upto Rs 1500\r\nMin billing is for 4 hours. All bookings between 1 to 3 hours will be billed at 4 hours\r\nA fully refundable security deposit of Rs 5000 will be charged at time of booking\r\nValid on bookings made through Zoomcar website and iOS/Android app\r\nDiscount applicable only on original reservation charges (not applicable on excess Km, late return fee, or other fees/charges)\r\nOffer not applicable on blackout days\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Zoomcar",
                        "merchant_description":"Zoomcar is a self-drive-focused car rental company allowing individuals to rent vehicles by the hour or by the day. Zoomcar saves the cost and hassle of owning a car while giving the good parts: convenience, mobility, and independence.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/63/small/Zoomcar.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/63/medium/Zoomcar.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/63/large/Zoomcar.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/18/small/open-uri20150821-7727-1cgddw7",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/18/medium/open-uri20150821-7727-1cgddw7",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/18/large/open-uri20150821-7727-1cgddw7"
                        }
                    },
                    {
                        "id":107,
                        "base_url":"",
                        "title":"Rs 500 off",
                        "kind":"offline",
                        "coupon_type":"merchant_generated",
                        "terms":"Min purchase of Rs 2500\r\nApplicable at all Peter England stores across India\r\nValid only on full MRP merchandise\r\nValid on registered mobile number\r\nOffer valid till 30th Sep'15\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPresent the coupon before bill is generated\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Peter England",
                        "merchant_description":"Peter England is the largest menswear brand in India. Peter England offers a complete range of Men's formal, Men's Casual, Wedding Collection and Party Wear.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/28/small/Peter_England-28-PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/28/medium/Peter_England-28-PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/28/large/Peter_England-28-PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/107/small/PE.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/107/medium/PE.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/107/large/PE.png"
                        }
                    },
                    {
                        "id":132,
                        "base_url":"http://www.americanswan.com/",
                        "title":"61% off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Valid on min purchase of Rs 1399\r\nCannot be combined with any offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"American Swan",
                        "merchant_description":"American Swan is an International online Fashion & Lifestyle brand that combines Urban American Lifestyle with a quintessential Youth-oriented Fashion. It provides the latest in clothing, footwear and fashion accessories.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/49/small/American_Swan.jpg",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/49/medium/American_Swan.jpg",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/49/large/American_Swan.jpg"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/132/small/offer-americanswan.jpeg",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/132/medium/offer-americanswan.jpeg",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/132/large/offer-americanswan.jpeg"
                        }
                    },
                    {
                        "id":118,
                        "base_url":"http://www.printvenue.com/",
                        "title":"Rs 150 off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Valid on min purchase of Rs 400\r\nOffer can be redeemed on www.printvenue.com\r\nOffer not applicable on Pen Drives\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Printvenue",
                        "merchant_description":"Printvenue is one stop shop for all the printing solutions and personalized gifting at affordable prices.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/52/small/Printvenue.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/52/medium/Printvenue.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/52/large/Printvenue.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/118/small/Printvenue2.jpg",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/118/medium/Printvenue2.jpg",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/118/large/Printvenue2.jpg"
                        }
                    },
                    {
                        "id":98,
                        "base_url":"http://www.fnp.com/",
                        "title":"16% off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Offer valid on min bill of Rs 549\r\nOffer can be redeemed on http://www.fnp.com/\r\nNot applicable on multiple products per transaction\r\nNot applicable on international deliveries and gift category\r\nCannot be combined with any offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Ferns N Petals",
                        "merchant_description":"Ferns N Petals, a leading florist in India, gives you a choice to buy fresh or artificial flowers, in addition to a range of exotic chocolates, cakes and sweets",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/4/small/Ferns_N_Petals.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/4/medium/Ferns_N_Petals.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/4/large/Ferns_N_Petals.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/98/small/Ferns_N_Petals_2.jpg",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/98/medium/Ferns_N_Petals_2.jpg",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/98/large/Ferns_N_Petals_2.jpg"
                        }
                    },
                    {
                        "id":17,
                        "base_url":"http://www.happilyunmarried.com/",
                        "title":"15% off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Applicable for purchases only on www.happilyunmarried.com\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Happily Unmarried",
                        "merchant_description":"Happily Unmarried is the online destination for Bar Accessories, Home Decor, Bags, T-shirts, Stationery, and lot of other fun products.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/33/small/Happily_Unmarried.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/33/medium/Happily_Unmarried.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/33/large/Happily_Unmarried.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/17/small/open-uri20150821-7727-1kz8ebw",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/17/medium/open-uri20150821-7727-1kz8ebw",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/17/large/open-uri20150821-7727-1kz8ebw"
                        }
                    },
                    {
                        "id":117,
                        "base_url":"http://www.pehraan.com/",
                        "title":"35% off",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Offer not applicable on already discounted products\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Pehraan",
                        "merchant_description":"Pehraan brings to you traditional form of Indian ethnic wear. Shop online for women kurta, kurti, Indo-Western tops, bottoms, ladies suits and much more desi stuffs.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/61/small/Pehraan-61-PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/61/medium/Pehraan-61-PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/61/large/Pehraan-61-PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/117/small/open-uri20150821-7727-zk58s2",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/117/medium/open-uri20150821-7727-zk58s2",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/117/large/open-uri20150821-7727-zk58s2"
                        }
                    }
                ],
                "page_count":3
            },
            {
                "name":"restaurants",
                "offers":[
                    {
                        "id":55,
                        "base_url":"",
                        "title":"Free Garlic Bread & Dip",
                        "kind":"online",
                        "coupon_type":"static",
                        "terms":"Valid on min bill of Rs 350\r\nApplicable only on online orders\r\nNot applicable on Simply Veg/Simply N.Veg Pizza, Regular Pizza, Pizza Mania Combos, Sides, Beverages & Desserts\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claim arising out of use of this coupon",
                        "merchant_name":"Dominos",
                        "merchant_description":"Domino's is the fastest growing fast food service restaurant for casual and fine dining. Choose from an array of vegetarian and non vegetarian pizzas, side orders, combos and side dishes",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/30/small/Dominos_final.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/30/medium/Dominos_final.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/30/large/Dominos_final.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/55/small/open-uri20150821-7727-1vbqcoj",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/55/medium/open-uri20150821-7727-1vbqcoj",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/55/large/open-uri20150821-7727-1vbqcoj"
                        }
                    },
                    {
                        "id":20,
                        "base_url":"",
                        "title":"Free Egg/Veg roll",
                        "kind":"offline",
                        "coupon_type":"dynamic",
                        "terms":"Valid on min bill of Rs 200\r\nOffer includes single egg roll or veg roll\r\nNot applicable at Jhansi, Chandrapur (Maharashtra), Palam Vihar (Gurgaon) & Vasundhara Enclave (Delhi) outlets\r\nCannot be combined with any offer/discount/promotion\r\nCannot be redeemed in cash\r\nPresent the coupon before bill is generated\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Kathi Junction",
                        "merchant_description":"Kathi Junction is the biggest Kathi Roll & Shawarma company. They offer mouth watering rolls made with their own range of spices.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/40/small/Kathi_Junction.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/40/medium/Kathi_Junction.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/40/large/Kathi_Junction.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/20/small/open-uri20150821-7727-u0072y",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/20/medium/open-uri20150821-7727-u0072y",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/20/large/open-uri20150821-7727-u0072y"
                        }
                    },
                    {
                        "id":21,
                        "base_url":"",
                        "title":"20% off",
                        "kind":"offline",
                        "coupon_type":"dynamic",
                        "terms":"Valid on total bill\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPresent the coupon before bill is generated\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Cafe 101",
                        "merchant_description":"Cafe 101 offers a variety of Fast food and Italian options, hot and cold beverages and a large selection of smoothies.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/18/small/Cafe_101-18-PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/18/medium/Cafe_101-18-PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/18/large/Cafe_101-18-PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/21/small/open-uri20150821-7727-13g8nsa",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/21/medium/open-uri20150821-7727-13g8nsa",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/21/large/open-uri20150821-7727-13g8nsa"
                        }
                    },
                    {
                        "id":22,
                        "base_url":"",
                        "title":"20% off",
                        "kind":"offline",
                        "coupon_type":"dynamic",
                        "terms":"Valid on min bill of Rs 800\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPresent the coupon before bill is generated\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"FrenZone",
                        "merchant_description":"Frenzone offers the unparalleled combination of delicious recipes of various taste like Indian, Chinese, Continental and Fast food.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/42/small/frenzonebanner1.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/42/medium/frenzonebanner1.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/42/large/frenzonebanner1.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/22/small/open-uri20150821-7727-yoqmxj",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/22/medium/open-uri20150821-7727-yoqmxj",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/22/large/open-uri20150821-7727-yoqmxj"
                        }
                    },
                    {
                        "id":13,
                        "base_url":"",
                        "title":"Upto 20% off",
                        "kind":"offline",
                        "coupon_type":"dynamic",
                        "terms":"15% off on Rs 250, 20% off on Rs 500\r\nNot valid at Huda City Center food court\r\nApplicable only on dine-in\r\nApplicable from Monday to Friday\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPresent the coupon before bill is generated\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Southy",
                        "merchant_description":"Southy is a South Indian restaurant which offers South Indian delicacies at a very affordable price.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/29/small/data",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/29/medium/data",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/29/large/data"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/13/small/open-uri20150821-7727-h3je5a",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/13/medium/open-uri20150821-7727-h3je5a",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/13/large/open-uri20150821-7727-h3je5a"
                        }
                    },
                    {
                        "id":49,
                        "base_url":"",
                        "title":"15% off",
                        "kind":"offline",
                        "coupon_type":"dynamic",
                        "terms":"Valid on min purchase of Rs 400\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPresent the coupon before bill is generated\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Cookie Man",
                        "merchant_description":"Cookie Man is India's #1 brand of fresh baked cookies. The scrumptious cookies are available in an extensive range of international flavors. The ideal snack, a perfect gift and a wonderful treat",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/7/small/Cookie_Man.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/7/medium/Cookie_Man.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/7/large/Cookie_Man.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/49/small/open-uri20150821-7727-a3sb2f",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/49/medium/open-uri20150821-7727-a3sb2f",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/49/large/open-uri20150821-7727-a3sb2f"
                        }
                    },
                    {
                        "id":61,
                        "base_url":"",
                        "title":"Buy 1 Get 1 free",
                        "kind":"offline",
                        "coupon_type":"dynamic",
                        "terms":"Applicable on medium and large pizza\r\nOffer not valid at Shivalik Cross Road (Ahmedabad), Gandhi Nagar (Karnataka), Mount Abu(Rajasthan) and Bellary (Karnataka) outlets\r\nCannot be combined with any offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"US Pizza",
                        "merchant_description":"US Pizza offers a choice of the Italian favorite – the American way! Customers here can dig into extra-large and loaded pizza slices that would suffice as a meal by themselves, paired with a choice of sides and desserts.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/12/small/U-S-Pizza.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/12/medium/U-S-Pizza.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/12/large/U-S-Pizza.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/61/small/open-uri20150821-7727-kirlxs",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/61/medium/open-uri20150821-7727-kirlxs",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/61/large/open-uri20150821-7727-kirlxs"
                        }
                    },
                    {
                        "id":127,
                        "base_url":"",
                        "title":"Upto 20% off",
                        "kind":"offline",
                        "coupon_type":"dynamic",
                        "terms":"10% off on Rs 350, 15% off on Rs 550, 20% off on Rs 750\r\nApplicable at Hauz Khas Village, East Patel Nagar, Sector 63 Noida & Sushant Lok outlets\r\nCannot be combined with any offer/discount/promotion\r\nCannot be redeemed in cash\r\nPresent the coupon before bill is generated\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Naivedyam",
                        "merchant_description":"Naivedyam is an authentic and high quality South Indian food restaurant based in India. It is devoted to give the guest the absolute best in terms of food quality and fine dining experience",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/14/small/Naveidyam-14-PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/14/medium/Naveidyam-14-PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/14/large/Naveidyam-14-PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/127/small/open-uri20150821-7727-1jfxh6w",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/127/medium/open-uri20150821-7727-1jfxh6w",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/127/large/open-uri20150821-7727-1jfxh6w"
                        }
                    },
                    {
                        "id":110,
                        "base_url":"",
                        "title":"Rs 100 off",
                        "kind":"online",
                        "coupon_type":"merchant_generated",
                        "terms":"Valid on min bill of Rs 350\r\nValid only on Delivery & Carryout orders placed through www.pizzahut.co.in and on Pizza Hut Mobile App\r\nNot Valid on Magic Pan, Big Pizzas, Birizza, Pan 4 all & Beverages\r\nDelivery available in limited areas\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPrices exclusive of all taxes\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"Pizza Hut",
                        "merchant_description":"Pizza Hut is the leading casual dining restaurant brand in India. It offers an exciting menu consisting of its signature pizzas, appetizers, pastas, desserts and beverages.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/6/small/Pizza_Hut.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/6/medium/Pizza_Hut.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/6/large/Pizza_Hut.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/110/small/52_shutterstock_35443840.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/110/medium/52_shutterstock_35443840.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/110/large/52_shutterstock_35443840.png"
                        }
                    },
                    {
                        "id":136,
                        "base_url":"",
                        "title":"Free Pepsi",
                        "kind":"offline",
                        "coupon_type":"dynamic",
                        "terms":"Free Pepsi (450 ml) applicable on purchase of 1 Large Popcorn + 1 Medium Nachos  with salsa @ 230\r\nCannot be combined with any other offer/discount/promotion\r\nCannot be redeemed in cash\r\nPresent the coupon before bill is generated\r\nHike shall not be held responsible for any liabilities/claims arising out of use of this coupon",
                        "merchant_name":"SRS Cinemas",
                        "merchant_description":"SRS Cinemas is one of the largest multiplex chain in North India Enjoy your movie with their lip smacking combos and beverages.",
                        "merchant_logo":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/3/small/SRS_Cinemas-3-PNG.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/3/medium/SRS_Cinemas-3-PNG.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/merchants/3/large/SRS_Cinemas-3-PNG.png"
                        },
                        "offer_image":{
                            "small":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/136/small/SRS_Cinemas.png",
                            "medium":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/136/medium/SRS_Cinemas.png",
                            "large":"http://hoppr-image.s3.amazonaws.com/coupons-production/offers/136/large/SRS_Cinemas.png"
                        }
                    }
                ],
                "page_count":2
            }
        ]},
        regions = [{"id":5,"name":"Bengaluru"},{"id":1,"name":"Delhi NCR"},{"id":7,"name":"Gujarat"},{"id":3,"name":"Hyderabad"},{"id":6,"name":"Kolkata"},{"id":8,"name":"Madhya Pradesh"},{"id":2,"name":"Mumbai"},{"id":9,"name":"Others"},{"id":4,"name":"Punjab"},{"id":11,"name":"Rajasthan"},{"id":12,"name":"Rest of Maharashtra"},{"id":10,"name":"Tamil Nadu"},{"id":13,"name":"Uttar Pradesh"}];

    var noop = function () {

    };

    W.PlatformBridge = {
        onLoadFinished: noop,

        setDebuggableEnabled: noop,

        replaceOverflowMenu: noop,

        updateOverflowMenu: noop,

        allowBackPress: noop,

        allowUpPress: noop,

        getFromCache: function (callbackId, key) {
            if (key === 'isOptInDone') {
                W.callbackFromNative(callbackId, false);
            } else if (key === 'isRegionSelected') {
                W.callbackFromNative(callbackId, false);
            } else {
                W.callbackFromNative(callbackId, false);
            }
        },

        doGetRequest: function (callbackId, params) {
            var baseResponse = {
                    status_code: 200,
                    status: 'success'
                },
                responseJSON;

            if (params.indexOf('defaultRegion') !== -1) {
                baseResponse.response = JSON.stringify({
                    id: regions[0].id

                });
            } else if (params.indexOf('regions') !== -1) {
                responseJSON = {
                    regions: regions
                };

                W.setTimeout(function () {
                    baseResponse.response = JSON.stringify(responseJSON);
                    W.callbackFromNative(callbackId, encodeURIComponent(JSON.stringify(baseResponse)));
                }, 3000);

                return;
            } else if (params.indexOf('issue/') !== -1) {
                responseJSON = {"coupon_details": {"code": "HIKEGB", "coupon_type": "static", "flavor": "Online"}};
            } else if (params.indexOf('offers') !== -1) {
                responseJSON = fullCoupons;
            } else if (params.indexOf('bootstrap') !== -1) {
                responseJSON = bootstrapResponse;
            }

            baseResponse.response = JSON.stringify(responseJSON);
            W.callbackFromNative(callbackId, encodeURIComponent(JSON.stringify(baseResponse)));
        },

        doPostRequest: function (callbackId, data) {
            var baseResponse = {
                status_code: 200,
                status: 'success'
            };

            data = JSON.parse(data);

            if (data.url.indexOf('issue') !== -1) {
                baseResponse.response = JSON.stringify({
                    "coupon": {
                        "code": "HIKE20",
                        "coupon_type": "static",
                        "kind": "online",
                        "base_url": null
                    }
                });
            }

            W.callbackFromNative(callbackId, encodeURIComponent(JSON.stringify(baseResponse)));
        },

        putInCache: noop,

        checkConnection: function (callbackId) {
            W.callbackFromNative(callbackId, 1);
        },

        logAnalytics: noop,

        logFromJS: noop,

        updateHelperData: noop
    };

    setTimeout(function () {
        platformSdk.appData = {
            platformUid: 'abc',
            helperData: {}
        };

        platformSdk.events.publish('webview/data/loaded');
    }, 1500);

})(window);