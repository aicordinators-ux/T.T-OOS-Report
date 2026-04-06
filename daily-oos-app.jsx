import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ===== 598 CUSTOMERS from Master File =====
let CUSTOMERS = [];
const MASTER_URL = "https://aicordinators-ux.github.io/T.T-OOS-Report/master_customers.json";
// Fallback: paste your GitHub Pages / raw URL above


// ===== PRODUCTS (exact Daily OOS names + compilation mapping) =====
const PG=[
{cat:"Bonjorno Mixes",color:"#f59e0b",items:[
{o:"( 6 ) gm",co:"Bon.Mixes",ca:"Bonjorno",e:"( 6 ) gm"},
{o:" 2*1 ( 12 ) gm",co:"Bon.Mixes",ca:"Bonjorno",e:" 2*1 ( 12 ) gm"},
{o:"Bonjorno Mazgo Mix ( 15 ) gm",co:"Bon.Mixes",ca:"Bonjorno",e:"Bonjorno Mazgo Mix ( 15 ) gm"},
{o:" Bonjorno 170 gm ( 15 Cup)",co:"Bon.Mixes",ca:"Bonjorno",e:" Bonjorno 170 gm ( 15 Cup)"},
{o:" Bonjorno 400 gm ( 36 Cup)",co:"Bon.Mixes",ca:"Bonjorno",e:" Bonjorno 400 gm ( 36 Cup)"},
]},
{cat:"Bonjorno Cappuccino",color:"#d97706",items:[
{o:"Bonjorno Hazelnut",co:"Bon. Cappuuccino",ca:"Bonjorno",e:"Bonjorno Hazelnut"},
{o:"Bonjorno Vanilla",co:"Bon. Cappuuccino",ca:"Bonjorno",e:"Bonjorno Vanilla"},
{o:"Bonjorno Mocha",co:"Bon. Cappuuccino",ca:"Bonjorno",e:"Bonjorno Mocha"},
{o:"Bonjorno Latte",co:"Bon. Cappuuccino",ca:"Bonjorno",e:"Bonjorno Latte"},
{o:"Bonjorno Latte Caramel",co:"Bon. Cappuuccino",ca:"Bonjorno",e:"Bonjorno Latte Caramel"},
{o:"Bonjorno Double Shot",co:"Bon. Cappuuccino",ca:"Bonjorno",e:"Bonjorno Double Shot"},
{o:"Bonjorno Iced Spanish Latte",co:"Bon. Cappuuccino",ca:"Bonjorno",e:"Bonjorno Iced Spanish Latte"},
{o:"Bonjorno Mazgo Cappuccino Classic",co:"Bon. Cappuuccino",ca:"Bonjorno",e:"Bonjorno Mazgo Cappuccino Classic"},
]},
{cat:"Bonjorno Briki",color:"#b45309",items:[
{o:"BONJORNO Briki Light Plain 40g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Light Plain 40g"},
{o:"BONJORNO Briki Light Mixed 40g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Light Mixed 40g"},
{o:"BONJORNO Briki Medium Plain 40g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Medium Plain 40g"},
{o:"BONJORNO Briki Medium Mixed 40g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Medium Mixed 40g"},
{o:"BONJORNO Briki Light Plain 80g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Light Plain 80g"},
{o:"BONJORNO Briki Light Mixed 80g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Light Mixed 80g"},
{o:"BONJORNO Briki Medium Plain 80g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Medium Plain 80g"},
{o:"BONJORNO Briki Medium Mixed 80g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Medium Mixed 80g"},
{o:"BONJORNO Briki Light Plain 180g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Light Plain 180g"},
{o:"BONJORNO Briki Light Mixed 180g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Light Mixed 180g"},
{o:"BONJORNO Briki Medium Plain 180g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Medium Plain 180g"},
{o:"BONJORNO Briki Medium Mixed 180g",co:"Bon. Turkish Coffee",ca:"Bonjorno",e:"BONJORNO Briki Medium Mixed 180g"},
]},
{cat:"NESCAFE",color:"#6366f1",items:[
{o:"NESCAFE 2IN1",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 2IN1"},{o:"NESCAFE 3in1",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1"},{o:"NESCAFE Rich",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Rich"},{o:"NESCAFE 3in1 G",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 G"},{o:"NESCAFE 3in1 Shot 9 gm",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 Shot 9 gm"},{o:"NESCAFE 3in1 Double Shot 9g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 Double Shot 9g"},{o:"NESCAFE 3in1 Shot Choco Hzn 9g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 Shot Choco Hzn 9g"},{o:"NESCAFE 3in1 Shot Crml Vnl 9g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 Shot Crml Vnl 9g"},{o:"NESCAFE 1.8g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 1.8g"},{o:"NESCAFE CLASSIC 95g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE CLASSIC 95g"},{o:"NESCAFE CLASSIC 190g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE CLASSIC 190g"},{o:"NESCAFE CLASSIC 47.5g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE CLASSIC 47.5g"},{o:"NESCAFE Pouch 18 gm",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Pouch 18 gm"},{o:"NESCAFE Pouch 50 gm",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Pouch 50 gm"},{o:"NESCAFE Pouch 95 gm",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Pouch 95 gm"},{o:"NESCAFE Pouch 200 gm",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Pouch 200 gm"},{o:"NESCAFE 3in1 Hzn",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 Hzn"},{o:"NESCAFE 3in1 Choc",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 Choc"},{o:"NESCAFE 3in1 Caramel",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 Caramel"},{o:"NESCAFE 3in1 Milky",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 Milky"},{o:"NESCAFE 3in1 Vanilia",co:"Nescafe",ca:"Nescafe",e:"NESCAFE 3in1 Vanilia"},{o:"NESCAFE Gold 95g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Gold 95g"},{o:"NESCAFE Gold 190g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Gold 190g"},{o:"NESCAFE Gold 47.5g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Gold 47.5g"},{o:"NESCAFE GOLD Dcf",co:"Nescafe",ca:"Nescafe",e:"NESCAFE GOLD Dcf"},{o:"NESCAFE ESPRESSO 95g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE ESPRESSO 95g"},{o:"NESCAFE ESPRESSO 1.8g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE ESPRESSO 1.8g"},{o:"NESCAFE GOLD Stick",co:"Nescafe",ca:"Nescafe",e:"NESCAFE GOLD Stick"},{o:"NESCAFE GOLD Late",co:"Nescafe",ca:"Nescafe",e:"NESCAFE GOLD Late"},{o:"NESCAFE GOLD Mocha",co:"Nescafe",ca:"Nescafe",e:"NESCAFE GOLD Mocha"},{o:"NESCAFE GOLD Caramel",co:"Nescafe",ca:"Nescafe",e:"NESCAFE GOLD Caramel"},{o:"NESCAFE GOLD Cappuccino Vanila",co:"Nescafe",ca:"Nescafe",e:"NESCAFE GOLD Cappuccino Vanila"},{o:"NESCAFE GOLD Cappuccino Swetened",co:"Nescafe",ca:"Nescafe",e:"NESCAFE GOLD Cappuccino Swetened"},{o:"NESCAFE GOLD Capp Unswetened",co:"Nescafe",ca:"Nescafe",e:"NESCAFE GOLD Capp Unswetened"},{o:"Nescafe GOLD Colombia 100g",co:"Nescafe",ca:"Nescafe",e:"Nescafe GOLD Colombia 100g"},{o:"NESCAFE Gold Refill Pouch 190g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Gold Refill Pouch 190g"},{o:"NESCAFE Gold Refill Pouch 95g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Gold Refill Pouch 95g"},{o:"NESCAFE Gold Refill Pouch 47.5g",co:"Nescafe",ca:"Nescafe",e:"NESCAFE Gold Refill Pouch 47.5g"},
]},
{cat:"NESQUIK",color:"#8b5cf6",items:[
{o:"NESQUIK 850 g",co:"Nesquik",ca:"Nesquik",e:"NESQUIK 850 g"},{o:"NESQUIK 270g",co:"Nesquik",ca:"Nesquik",e:"NESQUIK 270g"},{o:"NESQUIK 135g",co:"Nesquik",ca:"Nesquik",e:"NESQUIK 135g"},{o:"NESQUIK 13.5 g",co:"Nesquik",ca:"Nesquik",e:"NESQUIK 13.5 g"},
]},
{cat:"Coffee Mate",color:"#a78bfa",items:[
{o:"CM 400g",co:"Coffee Mate",ca:"Coffe Mate",e:"CM 400g"},{o:"CM 170g",co:"Coffee Mate",ca:"Coffe Mate",e:"CM 170g"},
]},
{cat:"Cereal",color:"#10b981",items:[
{o:"FITNESS 375g",co:"Cornflakes",ca:"Cereal",e:"FITNESS 375g"},{o:"Ftiness HNY &LMD 355g",co:"Cornflakes",ca:"Cereal",e:"Ftiness HNY &LMD 355g"},{o:"LION Cereal 400g",co:"Cornflakes",ca:"Cereal",e:"LION Cereal 400g"},{o:"NESQUIK  C 330g",co:"Cornflakes",ca:"Cereal",e:"NESQUIK  C 330g"},{o:"Cheerios HONEY 375g",co:"Cornflakes",ca:"Cereal",e:"Cheerios HONEY 375g"},{o:"Nesquik Minis Cereal 300 g",co:"Cornflakes",ca:"Cereal",e:"Nesquik Minis Cereal 300 g"},{o:"Nesquik C with Superman Projector Pen - 330 g",co:"Cornflakes",ca:"Cereal",e:"Nesquik C with Superman Projector Pen - 330 g"},{o:"Chocapic Breakfast Cereal 375 g",co:"Cornflakes",ca:"Cereal",e:"Chocapic Breakfast Cereal 375 g"},{o:"Corn Flakes Gold 375 g",co:"Cornflakes",ca:"Cereal",e:"Corn Flakes Gold 375 g"},{o:"Nestle Kitkat Chocolate Cereal 330g",co:"Cornflakes",ca:"Cereal",e:"Nestle Kitkat Chocolate Cereal 330g"},
]},
{cat:"CERELAC",color:"#14b8a6",items:[
{o:"CERELAC Rice 125g",co:"Cerelac",ca:"Baby Food",e:"CERELAC Rice 125g"},{o:"CERELAC Wheat 125g",co:"Cerelac",ca:"Baby Food",e:"CERELAC Wheat 125g"},{o:"CERELAC Wheat Without Milk 125g",co:"Cerelac",ca:"Baby Food",e:"CERELAC Wheat Without Milk 125g"},{o:"CERELAC Honey 125g",co:"Cerelac",ca:"Baby Food",e:"CERELAC Honey 125g"},{o:"CERELAC Fruits 125g",co:"Cerelac",ca:"Baby Food",e:"CERELAC Fruits 125g"},{o:"CERELAC Dates 125g",co:"Cerelac",ca:"Baby Food",e:"CERELAC Dates 125g"},{o:"CERELAC Vegetabls 125 g",co:"Cerelac",ca:"Baby Food",e:"CERELAC Vegetabls 125 g"},{o:"CERELAC Wheat & Apple 125 g",co:"Cerelac",ca:"Baby Food",e:"CERELAC Wheat & Apple 125 g"},{o:"CERELAC Nutri Biscuits Wheat 15.5 g",co:"Cerelac",ca:"Baby Food",e:"CERELAC Nutri Biscuits Wheat 15.5 g"},{o:"CERELAC  Apple 16*90 g",co:"Cerelac",ca:"Baby Food",e:"CERELAC  Apple 16*90 g"},{o:"Cerelac Rice without Milk 250 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac Rice without Milk 250 g"},{o:"Cerelac Wheat without Milk 250 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac Wheat without Milk 250 g"},{o:"Cerelac Wheat with Milk & Iron 250 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac Wheat with Milk & Iron 250 g"},{o:"Cerelac 3 Fruits with Milk & Iron250 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac 3 Fruits with Milk & Iron250 g"},{o:"Cerelac Honey with Milk & Iron 250 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac Honey with Milk & Iron 250 g"},{o:"Cerelac Rice without Milk 400 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac Rice without Milk 400 g"},{o:"Cerelac Wheat without Milk 400 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac Wheat without Milk 400 g"},{o:"Cerelac Wheat with Milk & Iron 500 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac Wheat with Milk & Iron 500 g"},{o:"Cerelac 3 Fruits with Milk & Iron 500 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac 3 Fruits with Milk & Iron 500 g"},{o:"Cerelac Dates & Wheat with Milk 500 g",co:"Cerelac",ca:"Baby Food",e:"Cerelac Dates & Wheat with Milk 500 g"},
]},
{cat:"Milks",color:"#0ea5e9",items:[
{o:"Elasasy 12.5g",co:"Nido",ca:"Milks",e:"Elasasy 12.5g"},{o:"Elasasy 25 g",co:"Nido",ca:"Milks",e:"Elasasy 25 g"},{o:"Elasasy 200 g",co:"Nido",ca:"Milks",e:"Elasasy 200 g"},{o:" Elasasy 500 g",co:"Nido",ca:"Milks",e:" Elasasy 500 g"},{o:"NIDO 25g",co:"Nido",ca:"Milks",e:"NIDO 25g"},{o:"NIDO 900g",co:"Nido",ca:"Milks",e:"NIDO 900g"},{o:"NIDO 100g",co:"Nido",ca:"Milks",e:"NIDO 100g"},{o:"NIDO 1+ 576g NEW",co:"Nido",ca:"Milks",e:"NIDO 1+ 576g NEW"},{o:"NIDO 1+ (288g)",co:"Nido",ca:"Milks",e:"NIDO 1+ (288g)"},{o:"NIDO 1200g",co:"Nido",ca:"Milks",e:"NIDO 1200g"},{o:"NIDO 600g",co:"Nido",ca:"Milks",e:"NIDO 600g"},{o:"NIDO 400g",co:"Nido",ca:"Milks",e:"NIDO 400g"},{o:"NIDO 225g",co:"Nido",ca:"Milks",e:"NIDO 225g"},{o:"Nido 100 g + 25 g free",co:"Nido",ca:"Milks",e:"Nido 100 g + 25 g free"},{o:"Nido 900 g + 100 g free",co:"Nido",ca:"Milks",e:"Nido 900 g + 100 g free"},{o:"Nido 900 g – Mug promotion",co:"Nido",ca:"Milks",e:"Nido 900 g – Mug promotion"},{o:"Nido 1200 g + 225 g free",co:"Nido",ca:"Milks",e:"Nido 1200 g + 225 g free"},{o:"Nestle SCM 370g",co:"SCM",ca:"Milks",e:"Nestle SCM 370g"},
]},
{cat:"MAGGI",color:"#ef4444",items:[
{o:"MAGGI 72g Chicken",co:"Maggi",ca:"Maggi",e:"MAGGI 72g Chicken"},{o:"MAGGI 72g Vegetables",co:"Maggi",ca:"Maggi",e:"MAGGI 72g Vegetables"},{o:"MAGGI 8g",co:"Maggi",ca:"Maggi",e:"MAGGI 8g"},{o:"Maggi Beef 8g",co:"Maggi",ca:"Maggi",e:"Maggi Beef 8g"},{o:"MAGGI 12 Tab Chicken",co:"Maggi",ca:"Maggi",e:"MAGGI 12 Tab Chicken"},{o:"MAGGI 12 Tab Vegetables",co:"Maggi",ca:"Maggi",e:"MAGGI 12 Tab Vegetables"},{o:"MAGGI 4 Tab Chicken",co:"Maggi",ca:"Maggi",e:"MAGGI 4 Tab Chicken"},{o:"MAGGI Bechamel 75g",co:"Maggi",ca:"Maggi",e:"MAGGI Bechamel 75g"},{o:"MAGGI Bechamel Chesse 75g",co:"Maggi",ca:"Maggi",e:"MAGGI Bechamel Chesse 75g"},{o:"MAGGI Shawerma 37g",co:"Maggi",ca:"Maggi",e:"MAGGI Shawerma 37g"},{o:"MAGGI Shish 37g",co:"Maggi",ca:"Maggi",e:"MAGGI Shish 37g"},{o:"MAGGI Kofta 37g",co:"Maggi",ca:"Maggi",e:"MAGGI Kofta 37g"},{o:"MAGGI Mashawi 37g",co:"Maggi",ca:"Maggi",e:"MAGGI Mashawi 37g"},{o:"MAGGI Burger 37g",co:"Maggi",ca:"Maggi",e:"MAGGI Burger 37g"},{o:"MAGGI Hawawshi 37g",co:"Maggi",ca:"Maggi",e:"MAGGI Hawawshi 37g"},{o:"MAGGI Kofta With Parsley 37g",co:"Maggi",ca:"Maggi",e:"MAGGI Kofta With Parsley 37g"},{o:"MAGGI PANE Mix 35 Gm",co:"Maggi",ca:"Maggi",e:"MAGGI PANE Mix 35 Gm"},{o:"MAGGI Meat Extender 65g",co:"Maggi",ca:"Maggi",e:"MAGGI Meat Extender 65g"},{o:"MAGGI Noodle Soup 60g",co:"Maggi",ca:"Maggi",e:"MAGGI Noodle Soup 60g"},{o:"MAGGI ABC Soup 66g",co:"Maggi",ca:"Maggi",e:"MAGGI ABC Soup 66g"},{o:"MAGGI Cream Soup 71g",co:"Maggi",ca:"Maggi",e:"MAGGI Cream Soup 71g"},{o:"MAGGI Mushroom Soup 67g",co:"Maggi",ca:"Maggi",e:"MAGGI Mushroom Soup 67g"},{o:"Potato Seasoning 6 gm",co:"Maggi",ca:"Maggi",e:"Potato Seasoning 6 gm"},{o:"Stew Seasoning 6 gm",co:"Maggi",ca:"Maggi",e:"Stew Seasoning 6 gm"},
]},
{cat:"RTD",color:"#ec4899",items:[
{o:"نسكافية أيس كوفى كابتشينو",co:"Impulse",ca:"RTD",e:"RTD Cappuccino"},{o:"نسكافية أيس كوفى لاتيه",co:"Impulse",ca:"RTD",e:"RTD Latte"},{o:"نسكافية أيس كوفى موكا",co:"Impulse",ca:"RTD",e:"RTD Mocha"},{o:"نسكافية أيس سبانش لاتيه",co:"Impulse",ca:"RTD",e:"RTD Spanish Late"},
]},
{cat:"Tola",color:"#f97316",items:[
{o:"بسكويت تولا 1 صباع",co:"Impulse",ca:"Tola",e:"Tola 1F"},{o:"بسكويت تولا 2 صباع",co:"Impulse",ca:"Tola",e:"Tola 2F"},
]},
{cat:"Fitness & Biscuits",color:"#84cc16",items:[
{o:"فيتنس بار شوكولاتة 23.5 جم",co:"Impulse",ca:"Bar",e:"Fitness Chocolate Bar 23.5g"},{o:"فيتنس بار شوكولاتة بالموز 23.5 جم",co:"Impulse",ca:"Bar",e:"Fitness Chocolate Banana Bar 23.5g"},{o:"فيتنس بار بالفراولة 23.5 جم",co:"Impulse",ca:"Bar",e:"Fitness Strawberry Bar 23.5g"},{o:"فيتنس بار كراميل كرنش 141 جم",co:"Impulse",ca:"Bar",e:"Fitness Caramel Crunch Bar 141g"},{o:"فتنس بسكويت سادة 30 جم",co:"Impulse",ca:"biscuits",e:" FITNESS Grain & Oats Biscuits 30gm"},{o:"فتنس بسكويت شوفان شيكولاته 30 جم",co:"Impulse",ca:"biscuits",e:"FITNESS  Chocolate Biscuits 30gm"},{o:"فتنس بسكويت شوفان تفاح وقرفة 30 جم",co:"Impulse",ca:"biscuits",e:"FITNESS  Apple & Cinnamon Biscuits 30 gm"},{o:"فتنس بسكويت سادة بيتيت",co:"Impulse",ca:"biscuits",e:"FITNESS Biscuits Petit"},{o:"بسكويت فيتنس مشاركة تفاح وقرفة 180 جم",co:"Impulse",ca:"biscuits",e:"FITNESS Biscuits Sharing Pack App&Cinnamon 180 gm"},{o:"بسكويت فيتنس مشاركة 180 جم",co:"Impulse",ca:"biscuits",e:"Fitness Biscuits Sharing Pack  180 gm"},
]},
{cat:"Nesquik Bar",color:"#a855f7",items:[
{o:"نسكويك بار شوكولاتة 23.5 جم",co:"Impulse",ca:"Bar",e:"Nesquik Chocolate Bar 23.5g"},{o:"نسكويك بار كوكيز وحبوب 15.2 جم",co:"Impulse",ca:"Bar",e:"Nesquik Cereal Cookies Bar 15.20g"},{o:"نسكويك بار  15.2 جم",co:"Impulse",ca:"Bar",e:"Nesquik Cereal Bar 15.20g"},
]},
{cat:"KitKat",color:"#e11d48",items:[
{o:"كيت كات 2 صباع 17.7 جم",co:"Impulse",ca:"Kitkat",e:"KitKat 2F 17.7g"},{o:"كيت كات 4 أصابع 36.5 جم",co:"Impulse",ca:"Kitkat",e:"KitKat 4F 36.5"},{o:"كيت كات 4 صباع فشار",co:"Impulse",ca:"Kitkat",e:"KIT KAT 4F Pop Corn"},{o:"كيت كات 2 صباع ميني 13.5 جم",co:"Impulse",ca:"Kitkat",e:"KitKat 2F Mini 13.5g"},{o:"كيت كات دارك 2 صباع  17.7 جم",co:"Impulse",ca:"Kitkat",e:"KitKat Dark 2F 17.7g"},{o:"كيت كات دارك 4 أصابع 36.5 جم",co:"Impulse",ca:"Kitkat",e:"KitKat Dark 4F 36.5"},{o:"كيت كات دارك ميني 2 صباع 162 جم",co:"Impulse",ca:"Kitkat",e:"KitKat Dark Mini 2F 162g"},{o:"كيت كات 5+1 مجانًا",co:"Impulse",ca:"Kitkat",e:"KIT KAT 5+1 Free"},{o:"كيت كات تشكني اوريجنال 40 جم",co:"Impulse",ca:"Chunky",e:"Kiktkat CHUNKY original 40g"},{o:"كيت كات تشنكي كراميل 40 جم",co:"Impulse",ca:"Chunky",e:"KitKat CHUNKY CARAMEL 40g"},{o:"كيت كات تشنكي لوتس 41.5 جم",co:"Impulse",ca:"Chunky",e:"KitKat CHUNKY  Lotus 41.5g"},{o:"كيت كات 2 صباع توت 19.5 جم",co:"Impulse",ca:"Kitkat",e:"KitKat 2F Raspberry Blast 19.5"},{o:"كيت كات 2 صباع كوكيز",co:"Impulse",ca:"Kitkat",e:"Kit Kat 2F Cookies"},{o:"كيت كات ميني  2 صباع كيس 250 جم",co:"Impulse",ca:"Kitkat",e:"Kit Kat Mini 2F Bag 250g"},{o:"كيت كات تشنكي ميني كيس أحمر 250 جم",co:"Impulse",ca:"Chunky",e:"Kit Kat Chunky Mini Red Bag 250g"},{o:"كيت كات ميني مومنتس لوتس 116 جم",co:"Impulse",ca:"Value Back",e:"Kit Kat Mini Moments Lotus 116 gm"},{o:"كيت كات شانكي مينى  احمر كيس 14 قطعه",co:"Impulse",ca:"Chunky",e:"KIT KAT CHUNKY Mini 14 breaks"},{o:"كيت كات شانكي مينى  احمر كيس 17 قطعه",co:"Impulse",ca:"Chunky",e:"KIT KAT CHUNKY Mini 17 breaks"},{o:"كيت كات شانكي بستاشيو",co:"Impulse",ca:"Chunky",e:"KIT KAT CHUNKY Pistachio"},{o:"كيت كات مينى بيستاشيو",co:"Impulse",ca:"Kitkat",e:"KIT KAT Mini Pistachio"},{o:"كيت كات مينتشرز بيستاشيو",co:"Impulse",ca:"Kitkat",e:"Kit Kat Miniatures Pistachio"},{o:"كيت كات مينيشورز 110 جم",co:"Impulse",ca:"Value Back",e:"Kit Kat Miniatures 110g"},{o:"كيت كات فانوس 2 صباع  4+1 مجانًا",co:"Impulse",ca:"Kitkat",e:"Kit Kat Fanos 2 Fingers 4+1 Free"},{o:"كيت كات باك توفير 4 أصابع",co:"Impulse",ca:"Value Back",e:"Value Pack 4 Fingers"},{o:"كيت كات باك توفير 2 صباع",co:"Impulse",ca:"Value Back",e:"Value Pack 2 Fingers"},{o:"مياه فواره 240 مل",co:"Impulse",ca:"sparkling Water",e:"Sparkling Water 240ml"},{o:"كيت كات تشنكي باك متعدد 4 أصابع ×6 (36.5 جم)",co:"Impulse",ca:"Chunky",e:"KIT KAT Chunky Multipacks 4F X6 36.5 gm"},{o:"كيت كات تشنكي باك متعدد 4 قطع ×40 جم",co:"Impulse",ca:"Chunky",e:"KIT KAT Chunky Multipacks 4 Pices * 40 gm"},{o:"كيت كات 15 ميني بريك (عرض الكريسماس)",co:"Impulse",ca:"Kitkat",e:"KIT KAT 15 MINI Breaks (Merry Christmas)"},{o:"كيت كات فانيلا وافل ميني كيس 110 جم",co:"Impulse",ca:"Kitkat",e:"KitKat Vanilla Waffle Miniature Bag 110G"},{o:"كيت كات مينتشيرز فانليا وافل١١٠جم",co:"Impulse",ca:"Kitkat",e:"Kit Kat Miniatures Vanilla Waffle 110g"},{o:"كيت كات تشنكي ميني كيس 195 جم",co:"Impulse",ca:"Chunky",e:"KitKat Chunky Mini Bag 195G"},{o:"كيت كات تشنكي فانيلا وافل 44 جم",co:"Impulse",ca:"Chunky",e:"KitKat Chunky Vanilla Waffle 44G"},
]},
];

const VIS_DRY_EX=[{id:"checkout50",key:"checkout50",label:"50% إتشيك أوت نسكافيه & كيتكات"},{id:"homeBranding",key:"homeBranding",label:"هوم شيلف براندد"},{id:"gondola",key:"gondola",label:"جندولة"},{id:"gondolaCoffee",key:"gondolaCoffee",label:"جندولة قهوة"},{id:"gondolaMaggi",key:"gondolaMaggi",label:"جندولة ماجى"},{id:"fdStandEntrance",key:"fdStandEntrance",label:"عرض أرضى / إستاند بالمدخل"},{id:"fdDry",key:"fdDry",label:"عرض أرضى (FD)"},{id:"standDry",key:"standDry",label:"إستاند"},{id:"crossMerch",key:"crossMerch",label:"Key Cross Merchandising"},{id:"marketingElement",key:"marketingElement",label:"عرض تسويقى"},{id:"magazineDry",key:"magazineDry",label:"مجلة"},{id:"gondolaExtra",key:"gondolaExtra",label:"جندولة إضافية"},{id:"katman",key:"katman",label:"Katman"},{id:"pillarDry",key:"pillarDry",label:"Pillar"},{id:"gh",key:"gh",label:"GH جندولة هيد"},{id:"basketMaggi",key:"basketMaggi",label:"باسكت ماجي"},{id:"screenPets",key:"screenPets",label:"شاشة عرض حيوانات"}];
const VIS_IMP_EX=[{id:"fdStandKitkat",key:"fdStandKitkat",label:"عرض / إستاند كيت كات"},{id:"floorKitkat",key:"floorKitkat",label:"فلور كيت كات"},{id:"fdImpulse",key:"fdImpulse",label:"عرض أرضي"},{id:"standImpulse",key:"standImpulse",label:"إستاند"},{id:"standKitkat",key:"standKitkat",label:"إستاند كيت كات"},{id:"standBiscuits",key:"standBiscuits",label:"أستاند بسكوت/بار"},{id:"standTola",key:"standTola",label:"إستاند تولا"},{id:"checkoutImpulse",key:"checkoutImpulse",label:"50% إتشيك أوت"},{id:"rtdStandChiller",key:"rtdStandChiller",label:"RTD إستاند/ثلاجة"},{id:"rtdGondolaFd",key:"rtdGondolaFd",label:"RTD جندولة/FD"},{id:"rtdOosChiller",key:"rtdOosChiller",label:"RTD Out of Home Chiller"},{id:"shelfFrame",key:"shelfFrame",label:"شيلف فريم"},{id:"rtdStoppers",key:"rtdStoppers",label:"RTD Stoppers"},{id:"magazineImpulse",key:"magazineImpulse",label:"مجلة"},{id:"gondolaExtraImp",key:"gondolaExtraImp",label:"جندولة إضافية"},{id:"pillarImpulse",key:"pillarImpulse",label:"بيلر"},{id:"floorRtd",key:"floorRtd",label:"فلور RTD"},{id:"rtdExtraShelf",key:"rtdExtraShelf",label:"RTD رف إضافي"},{id:"seeThrough",key:"seeThrough",label:"See Through"},{id:"lightBox",key:"lightBox",label:"Light Box"},{id:"displayScreen",key:"displayScreen",label:"Display Screen"}];
const VIS_DRY_CAT=[{id:"maggi_pct",key:"maggi",label:"MAGGI",type:"pct"},{id:"cerelac_pct",key:"cerelac",label:"CERELAC",type:"pct"},{id:"nescafe_pct",key:"nescafe",label:"NESCAFE",type:"pct"},{id:"nido_pct",key:"nido",label:"Nido",type:"pct"},{id:"nesquik_pct",key:"nesquik",label:"Nesquik",type:"pct"},{id:"cornflex_pct",key:"cornflex",label:"CornFlex",type:"pct"}];
const VIS_IMP_CAT=[{id:"kitkatPct",key:"kitkatPct",label:"KitKat %",type:"pct"},{id:"fitnessShelf",key:"fitnessShelf",label:"Fitness Shelf",type:"shelf"},{id:"tolaShelf",key:"tolaShelf",label:"Tola Shelf",type:"shelf"},{id:"rtdShelf",key:"rtdShelf",label:"RTD Shelf",type:"shelf"}];

const CUST_ST=["تم الزيارة","مغلق مؤقت","مغلق نهائي","رافض التنسيق","لا يوجد ستوكات","أجل الزيارة"];
const SK="daily_oos_v4";
function gid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}
function esc(v){return v==null?"":String(v).replace(/"/g,'""')}

// Build xlsx export with SheetJS (loaded via importScripts workaround)
const VK=["maggi","cerelac","nescafe","nido","nesquik","cornflex","checkout50","homeBranding","gondola","gondolaCoffee","gondolaMaggi","fdStandEntrance","fdDry","standDry","crossMerch","marketingElement","magazineDry","gondolaExtra","katman","pillarDry","gh","basketMaggi","screenPets","","","","kitkatPct","fitnessShelf","tolaShelf","rtdShelf","fdStandKitkat","floorKitkat","fdImpulse","standImpulse","standKitkat","standBiscuits","standTola","checkoutImpulse","rtdStandChiller","rtdGondolaFd","rtdOosChiller","shelfFrame","rtdStoppers","magazineImpulse","gondolaExtraImp","pillarImpulse","floorRtd","rtdExtraShelf","seeThrough","lightBox","displayScreen","","",""];
const pctVK=["maggi","cerelac","nescafe","nido","nesquik","cornflex"];
const pctIdMap={"maggi":"maggi_pct","cerelac":"cerelac_pct","nescafe":"nescafe_pct","nido":"nido_pct","nesquik":"nesquik_pct","cornflex":"cornflex_pct","kitkatPct":"kitkatPct"};

function getVisVal(k, vis) {
  if(!k) return "";
  if(pctVK.includes(k) || k==="kitkatPct") {
    const pid = pctIdMap[k];
    const nv = Number(vis?.[pid+"_n"])||0;
    const tv = Number(vis?.[pid+"_t"])||0;
    if(tv>0) return Math.round((nv/tv)*100)+"%";
    return "0%";
  }
  const v = vis?.[k];
  return v==="achieved" ? 1 : v==="not_achieved" ? 0 : typeof v==="number" ? v : 0;
}

function doExport(subs) {
  const H=["Code","Region","Desc _ l5","Acc-Code","Bonjorno Code","Date","Customer name","Address","Company","Categry","Items","Quantity","Customer Stauts","Contract Home Shelf Space","Actual Bonjorno Space","Actual Home Shelf Status","SM Contract Extra Visbility","Acutal Extra Visbility","Notes Mansour","KitKat Chiller","\u0628\u064a\u0627\u0646 \u0627\u0644\u0645\u062e\u0627\u0644\u0641\u0627\u062a \u0644\u0644\u062b\u0644\u0627\u062c\u0629","MAGGI","CERELAC","NESCAFE","Nido","Nesquik","CornFlex","50% Checkouts Kitkat & Nescafe","Home shelf Branding","Gondola","Gondola end for coffee","Gondola end for Maggi","FD's or Stands in entrance","FD","Stand"," key cross merchandising points","1 marketing element for 1 month/ year","1 page in all magazines","Gondola Extra","Katman","Pillar","GH","Basket Maggi","Display Screen for pets food","Dry Final Category situation","DRY Final Visbility situation","DRY Final Cat. & Ext Vis. situation","Kitkat %","Fitness Biscuitts shelf","Tola shelf","RTD Chillers  shelf","FD's or Stands KitKat","Floor Kitkat","FD","Stand","Stand Kitkat"," stand biscuits & Bars"," Stand Tola","50% Checkouts Kitkat & Nescafe","RTD Stand or Chiller","RTD Gondola or FD","RTD out of home-shelf Chiller","Shelf frame","RTD shelf stoppers","Magazine","Extra Gondola","Pillar","Floor RTD","RTD Extra Vis Shelf","See Through","Light Box","Display Screen","Impulse Final Category situation","Impulse Final Visbility situation","Impulse Final Cat. & Ext Vis. situation","Notes","Day of visit","Type Company","Discount Type","Type Customer","Bonjorno Type","Name (Merch)","Team Leader"];
  const allItems=PG.flatMap(g=>g.items);
  const data=[H];
  subs.forEach(sub=>{
    const cu=CUSTOMERS.find(x=>x.c===sub.code)||{};
    allItems.forEach(item=>{
      const qv=sub.qty?.[item.o]; const qtyVal=(qv!=null&&qv!=="")?Number(qv):0;
      const visVals=VK.map(k=>getVisVal(k,sub.vis));
      data.push([cu.c||"",cu.r||"",cu.d||"",cu.ac||"",cu.bc||"",new Date(sub.date).toLocaleDateString("en-GB"),cu.n||"",cu.a||"",item.co,item.ca,item.e,qtyVal,sub.extra?.status||"",cu.bs||"",(sub.extra?.bonShelf&&sub.extra?.coffeeShelf&&Number(sub.extra.coffeeShelf)>0?Math.round((Number(sub.extra.bonShelf)/Number(sub.extra.coffeeShelf))*100)+"%":"0%"),"","","",sub.extra?.notesMansour||"",sub.extra?.chiller||"",sub.extra?.chillerNotes||"",...visVals,sub.extra?.notes||"",cu.dv||"",cu.tp||"",cu.dt||"",cu.tc||"",cu.bt||"",cu.m||"",cu.tl||""]);
    });
  });
  // Generate xlsx using SheetJS via script tag
  const script=document.createElement("script");
  script.src="https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js";
  script.onload=()=>{
    const ws=XLSX.utils.aoa_to_sheet(data);
    // Set text columns (Code=0, Acc-Code=3, Bonjorno Code=4)
    const range=XLSX.utils.decode_range(ws["!ref"]);
    for(let R=1;R<=range.e.r;R++){
      [0,3,4].forEach(C=>{
        const addr=XLSX.utils.encode_cell({r:R,c:C});
        if(ws[addr]){ws[addr].t="s";ws[addr].v=String(ws[addr].v||"")}
      });
    }
    ws["!cols"]=[{wch:8},{wch:12},{wch:22},{wch:12},{wch:10},{wch:12},{wch:22},{wch:30},{wch:18},{wch:12},{wch:35},{wch:8},{wch:12},{wch:15},{wch:12}];
    const wb=XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"\u062a\u062c\u0645\u064a\u0639 \u062a\u0642\u0631\u064a\u0631 \u0627\u0644\u0633\u0648\u0628\u0631 \u0645\u0627\u0631\u0643\u062a");
    XLSX.writeFile(wb,`\u062a\u062c\u0645\u064a\u0639_\u062a\u0642\u0631\u064a\u0631_\u0627\u0644\u0633\u0648\u0628\u0631_\u0645\u0627\u0631\u0643\u062a_${new Date().toISOString().slice(0,10)}.xlsx`);
  };
  script.onerror=()=>{
    // Fallback to CSV if SheetJS fails
    const csvRows=data.map(r=>r.map(v=>`"${esc(v)}"`).join(","));
    const blob=new Blob(["\uFEFF"+csvRows.join("\n")],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");
    a.href=url;a.download=`\u062a\u062c\u0645\u064a\u0639_\u062a\u0642\u0631\u064a\u0631_${new Date().toISOString().slice(0,10)}.csv`;a.click();URL.revokeObjectURL(url);
  };
  document.head.appendChild(script);
}

function VisSection({title,icon,color,items,contract,vis,setVis}){
  const[open,setOpen]=useState(false);const req=items.filter(i=>contract?.[i.key]!=null);const ach=req.filter(i=>vis[i.id]==="achieved").length;
  return(<div style={{marginBottom:5}}>
    <div onClick={()=>setOpen(!open)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 13px",borderRadius:10,background:`${color}10`,border:`1px solid ${color}25`,cursor:"pointer"}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}><span>{icon}</span><span style={{fontWeight:600,fontSize:13}}>{title}</span>{req.length>0&&<span style={{background:ach===req.length?"rgba(34,197,94,0.2)":"rgba(245,158,11,0.2)",color:ach===req.length?"#22c55e":"#f59e0b",padding:"2px 8px",borderRadius:12,fontSize:10,fontWeight:700}}>{ach}/{req.length}</span>}</div>
      <span style={{color,fontSize:13,transform:open?"rotate(90deg)":"rotate(0)",transition:"transform 0.2s"}}>◀</span>
    </div>
    {open&&<div style={{background:"rgba(0,0,0,0.12)",borderRadius:8,overflow:"hidden",marginTop:2}}>
      {items.map(item=>{const cv=contract?.[item.key];const isReq=cv!=null;const val=vis[item.id];const isA=val==="achieved";const isN=val==="not_achieved";
        if(item.type==="pct")return(<div key={item.id} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 10px",borderBottom:"1px solid rgba(255,255,255,0.03)",flexWrap:"wrap"}}><div style={{flex:1,minWidth:100}}><div style={{fontSize:12,color:isReq?"#e2e8f0":"#94a3b8"}}>{item.label}</div>{isReq&&<span style={{fontSize:10,color:"#f59e0b",background:"rgba(245,158,11,0.15)",padding:"1px 7px",borderRadius:8}}>📋 {Math.round(cv*100)}%</span>}</div><input type="number" min="0" style={qi} placeholder="نستله" value={vis[`${item.id}_n`]||""} onChange={e=>setVis(p=>({...p,[`${item.id}_n`]:e.target.value}))}/><span style={{color:"#475569"}}>/</span><input type="number" min="0" style={qi} placeholder="إجمالي" value={vis[`${item.id}_t`]||""} onChange={e=>setVis(p=>({...p,[`${item.id}_t`]:e.target.value}))}/>{vis[`${item.id}_n`]&&vis[`${item.id}_t`]&&Number(vis[`${item.id}_t`])>0&&(()=>{const pct=Math.round((Number(vis[`${item.id}_n`])/Number(vis[`${item.id}_t`]))*100);const ok=cv&&pct/100>=cv*0.8;return <span style={{fontSize:11,padding:"2px 8px",borderRadius:8,fontWeight:700,background:ok?"rgba(34,197,94,0.15)":"rgba(239,68,68,0.15)",color:ok?"#4ade80":"#f87171",marginRight:4}}>{pct}%</span>})()}</div>);
        if(item.type==="shelf")return(<div key={item.id} style={{display:"flex",alignItems:"center",gap:6,padding:"7px 10px",borderBottom:"1px solid rgba(255,255,255,0.03)"}}><div style={{flex:1}}><div style={{fontSize:12,color:isReq?"#e2e8f0":"#94a3b8"}}>{item.label}</div>{isReq&&<span style={{fontSize:10,color:"#f59e0b",background:"rgba(245,158,11,0.15)",padding:"1px 7px",borderRadius:8}}>📋 {cv}</span>}</div><input type="number" min="0" style={qi} placeholder="فعلي" value={vis[`${item.id}_a`]||""} onChange={e=>setVis(p=>({...p,[`${item.id}_a`]:e.target.value}))}/></div>);
        return(<div key={item.id} style={{display:"flex",alignItems:"center",gap:5,padding:"7px 10px",borderBottom:"1px solid rgba(255,255,255,0.03)"}}><div style={{flex:1}}><div style={{fontSize:12,color:isReq?"#e2e8f0":"#94a3b8"}}>{item.label}</div>{isReq&&<span style={{fontSize:10,color:"#f59e0b",background:"rgba(245,158,11,0.15)",padding:"1px 7px",borderRadius:8}}>📋 مطلوب</span>}{!isReq&&<span style={{fontSize:9,color:"#475569"}}>غير مطلوب</span>}</div><button onClick={()=>setVis(p=>({...p,[item.id]:isA?null:"achieved"}))} style={{...tb,borderColor:isA?"#22c55e":"rgba(255,255,255,0.08)",background:isA?"rgba(34,197,94,0.15)":"transparent",color:isA?"#4ade80":"#64748b"}}>✓</button><button onClick={()=>setVis(p=>({...p,[item.id]:isN?null:"not_achieved"}))} style={{...tb,borderColor:isN?"#ef4444":"rgba(255,255,255,0.08)",background:isN?"rgba(239,68,68,0.15)":"transparent",color:isN?"#f87171":"#64748b"}}>✗</button></div>);
      })}
    </div>}
  </div>);
}
const qi={width:55,padding:"6px",borderRadius:6,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(0,0,0,0.3)",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none",textAlign:"center"};
const tb={padding:"5px 10px",borderRadius:6,border:"1px solid",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"};

export default function App(){
  const[pg,setPg]=useState("home");const[tab,setTab]=useState("oos");const[cust,setCust]=useState(null);
  const[qty,setQty]=useState({});const[vis,setVis]=useState({});const[ex,setEx]=useState({});
  const[expCat,setExpCat]=useState(null);const[subs,setSubs]=useState([]);const[toast,setToast]=useState(null);const[sq,setSq]=useState("");
  const[editId,setEditId]=useState(null);
  const[confirmDlg,setConfirmDlg]=useState(null);
  const[draftDlg,setDraftDlg]=useState(null);
  const refs=useRef({});
  const[custLoaded,setCustLoaded]=useState(false);const[custError,setCustError]=useState(null);const[custCount,setCustCount]=useState(0);
  useEffect(()=>{(async()=>{
    // Load submissions
    try{const r=await window.storage.get(SK);if(r?.value)setSubs(JSON.parse(r.value))}catch(e){}
    // Load customers: try external URL first, then storage cache
    let loaded=false;
    try{
      const res=await fetch(MASTER_URL);
      if(res.ok){const data=await res.json();CUSTOMERS=data;setCustCount(data.length);
        try{await window.storage.set("master_cache",JSON.stringify(data))}catch(e){}
        loaded=true;setCustLoaded(true);
      }
    }catch(e){}
    if(!loaded){
      try{const c=await window.storage.get("master_cache");
        if(c?.value){CUSTOMERS=JSON.parse(c.value);setCustCount(CUSTOMERS.length);loaded=true;setCustLoaded(true)}
      }catch(e){}
    }
    // Check for unsaved draft
    try{
      const draftStr=localStorage.getItem("oos_draft");
      if(draftStr){
        const draft=JSON.parse(draftStr);
        if(draft.ts&&Date.now()-draft.ts<86400000){
          setDraftDlg(draft);
        }else{localStorage.removeItem("oos_draft")}
      }
    }catch(e){}

        if(!loaded){setCustError("لم يتم تحميل قاعدة العملاء. تأكد من رفع master_customers.json أو ارفعها يدوياً");setCustLoaded(true)}
  })()},[]);

  // Warn on page refresh/close if report not saved
  useEffect(()=>{
    const handler=(e)=>{
      if(pg==="entry"&&cust&&(Object.keys(qty).length>0||Object.keys(vis).length>0)){
        e.preventDefault();
        e.returnValue="";
      }
    };
    window.addEventListener("beforeunload",handler);
    return()=>window.removeEventListener("beforeunload",handler);
  },[pg,cust,qty,vis]);

  // Auto-save draft every time data changes in entry mode
  useEffect(()=>{
    if(pg==="entry"&&cust){
      const draft={code:cust.c,qty,vis,extra:ex,tab,expCat,editId,ts:Date.now()};
      try{localStorage.setItem("oos_draft",JSON.stringify(draft))}catch(e){}
    }
  },[pg,cust,qty,vis,ex,tab,expCat,editId]);
  const sv=async d=>{setSubs(d);try{await window.storage.set(SK,JSON.stringify(d))}catch(e){}};
  const tw=m=>{setToast(m);setTimeout(()=>setToast(null),2500)};
  const allItems=useMemo(()=>PG.flatMap(g=>g.items),[]);const totalI=allItems.length;
  const filled=useMemo(()=>Object.values(qty).filter(v=>v!=null&&v!=="").length,[qty]);
  const allVis=[...VIS_DRY_EX,...VIS_IMP_EX];
  const visReq=useMemo(()=>cust?allVis.filter(i=>cust.ct?.[i.key]!=null).length:0,[cust]);
  const visAch=useMemo(()=>allVis.filter(i=>vis[i.id]==="achieved").length,[vis]);
  const today=new Date().toLocaleDateString("ar-EG",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
  const todayS=subs.filter(s=>new Date(s.date).toDateString()===new Date().toDateString());
  const filtCust=useMemo(()=>{if(!sq)return CUSTOMERS.slice(0,15);const q=sq.toLowerCase();return CUSTOMERS.filter(c=>c.n.includes(sq)||c.c.includes(sq)||c.a.includes(sq)||c.m.toLowerCase().includes(q)).slice(0,20)},[sq]);

  const editReport=(sub)=>{
    const cu=CUSTOMERS.find(x=>x.c===sub.code);
    if(!cu){tw("❌ العميل مش موجود");return}
    setCust(cu);setQty(sub.qty||{});setVis(sub.vis||{});setEx(sub.extra||{});
    setEditId(sub.id);setTab("oos");setPg("entry");tw("📝 تعديل تقرير "+sub.name);
  };
  const submit=()=>{if(!cust)return;
    if(editId){
      const updated=subs.map(s=>s.id===editId?{...s,qty:{...qty},vis:{...vis},extra:{...ex},filled,visAch,visReq,date:new Date().toISOString()}:s);
      sv(updated);tw("✅ تم تحديث التقرير");setEditId(null);
    }else{
      sv([{id:gid(),code:cust.c,name:cust.n,address:cust.a,region:cust.r,merch:cust.m,date:new Date().toISOString(),qty:{...qty},vis:{...vis},extra:{...ex},filled,totalI,visAch,visReq},...subs]);tw("✅ تم حفظ التقرير");
    }
    setPg("reports");setCust(null);setQty({});setVis({});setEx({})};

  const S={app:{direction:"rtl",fontFamily:"'IBM Plex Sans Arabic','Segoe UI',Tahoma,sans-serif",minHeight:"100vh",background:"#0b1120",color:"#e2e8f0",maxWidth:520,margin:"0 auto"},hd:{background:"linear-gradient(135deg,#1e3a5f,#0f2847)",padding:"18px 16px 14px",borderBottom:"1px solid rgba(59,130,246,0.2)"},nv:{display:"flex",gap:2,padding:"6px 12px",background:"rgba(15,23,42,0.8)",borderBottom:"1px solid rgba(255,255,255,0.05)"},nb:a=>({flex:1,padding:"9px 4px",border:"none",borderRadius:8,background:a?"rgba(59,130,246,0.2)":"transparent",color:a?"#60a5fa":"#64748b",fontSize:11,fontWeight:a?600:400,cursor:"pointer",fontFamily:"inherit",textAlign:"center"}),ct:{padding:"10px 12px 100px"},cd:{background:"rgba(255,255,255,0.04)",borderRadius:12,padding:"12px 14px",marginBottom:6,border:"1px solid rgba(255,255,255,0.06)"},inp:{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(0,0,0,0.3)",color:"#e2e8f0",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box"},sel:{width:"100%",padding:"9px 12px",borderRadius:8,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(0,0,0,0.3)",color:"#e2e8f0",fontSize:14,fontFamily:"inherit",outline:"none",boxSizing:"border-box",appearance:"none"},bg:c=>({display:"inline-block",padding:"2px 8px",borderRadius:12,fontSize:10,fontWeight:600,background:`${c}20`,color:c}),sub:{width:"100%",padding:"14px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 20px rgba(37,99,235,0.3)",marginTop:12},tr:a=>({flex:1,padding:"10px",borderRadius:10,border:`2px solid ${a?"rgba(59,130,246,0.4)":"rgba(255,255,255,0.08)"}`,background:a?"rgba(59,130,246,0.12)":"transparent",color:a?"#60a5fa":"#64748b",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",textAlign:"center"}),pb:{height:4,background:"rgba(255,255,255,0.08)",borderRadius:2,overflow:"hidden",marginTop:6},pf:p=>({height:"100%",width:`${p}%`,background:p>80?"#22c55e":p>40?"#eab308":"#3b82f6",borderRadius:2,transition:"width 0.3s"}),tt:{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"rgba(15,25,45,0.95)",border:"1px solid rgba(59,130,246,0.3)",padding:"10px 20px",borderRadius:10,fontSize:14,color:"#e2e8f0",zIndex:999,backdropFilter:"blur(10px)",fontFamily:"inherit",direction:"rtl"},ch:col=>({display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 12px",borderRadius:8,background:`${col}12`,border:`1px solid ${col}25`,cursor:"pointer",marginBottom:3})};

  return(<div style={S.app}>
    {toast&&<div style={S.tt}>{toast}</div>}
    {draftDlg&&!cust&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",zIndex:1001,display:"flex",alignItems:"center",justifyContent:"center",padding:20,direction:"rtl"}}>
      <div style={{background:"#1e293b",borderRadius:16,padding:"24px 20px",maxWidth:360,width:"100%",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
        <div style={{fontSize:15,fontWeight:600,color:"#f59e0b",marginBottom:12}}>⚠️ يوجد تقرير لم يتم حفظه</div>
        <div style={{fontSize:13,color:"#94a3b8",marginBottom:16}}>تم العثور على تقرير غير محفوظ. هل تريد استكماله؟</div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>{
            const cu=CUSTOMERS.find(x=>x.c===draftDlg.code);
            if(cu){setCust(cu);setQty(draftDlg.qty||{});setVis(draftDlg.vis||{});setEx(draftDlg.extra||{});setTab(draftDlg.tab||"oos");setExpCat(draftDlg.expCat||null);if(draftDlg.editId)setEditId(draftDlg.editId);setPg("entry")}
            setDraftDlg(null);
          }} style={{flex:1,padding:"12px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>الرجوع لحفظ التقرير</button>
          <button onClick={()=>{localStorage.removeItem("oos_draft");setDraftDlg(null)}} style={{flex:1,padding:"12px",borderRadius:10,border:"2px solid rgba(239,68,68,0.3)",background:"rgba(239,68,68,0.1)",color:"#f87171",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>إلغاء التقرير</button>
        </div>
      </div>
    </div>}
    {confirmDlg&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,direction:"rtl"}}>
      <div style={{background:"#1e293b",borderRadius:16,padding:"24px 20px",maxWidth:360,width:"100%",border:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
        {confirmDlg.type==="cat"&&<>
          <div style={{fontSize:15,fontWeight:600,color:"#f59e0b",marginBottom:12}}>⚠️ تنبيه</div>
          <div style={{fontSize:14,color:"#e2e8f0",lineHeight:1.8,marginBottom:16}}>يوجد <span style={{color:"#f87171",fontWeight:700}}>{confirmDlg.count}</span> صنف من أصل {confirmDlg.total} لم يتم إدخال جرد لها<br/>هل تريد المتابعة؟</div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={confirmDlg.onYes} style={{flex:1,padding:"12px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>نعم، متابعة</button>
            <button onClick={confirmDlg.onNo} style={{flex:1,padding:"12px",borderRadius:10,border:"2px solid rgba(245,158,11,0.4)",background:"rgba(245,158,11,0.1)",color:"#f59e0b",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>لا، سيتم التعديل</button>
          </div>
        </>}
        {confirmDlg.type==="extra"&&<>
          <div style={{fontSize:15,fontWeight:600,color:"#f59e0b",marginBottom:12}}>⚠️ استكمل البيانات المطلوبة</div>
          <div style={{marginBottom:16}}>{confirmDlg.missing.map(m=><div key={m} style={{fontSize:13,color:"#f87171",padding:"6px 12px",background:"rgba(239,68,68,0.1)",borderRadius:8,marginBottom:4,border:"1px solid rgba(239,68,68,0.15)"}}>• {m}</div>)}</div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={confirmDlg.onYes} style={{flex:1,padding:"12px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>حفظ بدون استكمال</button>
            <button onClick={confirmDlg.onNo} style={{flex:1,padding:"12px",borderRadius:10,border:"2px solid rgba(245,158,11,0.4)",background:"rgba(245,158,11,0.1)",color:"#f59e0b",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>استكمال البيانات</button>
          </div>
        </>}
        {confirmDlg.type==="full"&&<>
          <div style={{fontSize:15,fontWeight:600,color:"#f59e0b",marginBottom:12}}>⚠️ يوجد بيانات ناقصة</div>
          <div style={{maxHeight:300,overflowY:"auto",marginBottom:16}}>
            {confirmDlg.incompleteCats.length>0&&<div style={{marginBottom:10}}>
              <div style={{fontSize:12,fontWeight:600,color:"#60a5fa",marginBottom:4}}>📦 فئات جرد غير مكتملة:</div>
              {confirmDlg.incompleteCats.map(c=><div key={c} style={{fontSize:12,color:"#f87171",padding:"5px 10px",background:"rgba(239,68,68,0.08)",borderRadius:6,marginBottom:3}}>• {c}</div>)}
            </div>}
            {confirmDlg.emptyCats.length>0&&<div style={{marginBottom:10}}>
              <div style={{fontSize:12,fontWeight:600,color:"#60a5fa",marginBottom:4}}>📦 فئات لم يتم إدخال جرد لها:</div>
              {confirmDlg.emptyCats.map(c=><div key={c} style={{fontSize:12,color:"#94a3b8",padding:"5px 10px",background:"rgba(100,116,139,0.08)",borderRadius:6,marginBottom:3}}>• {c}</div>)}
            </div>}
            {(confirmDlg.missingVis>0||confirmDlg.missingPct>0)&&<div style={{marginBottom:10}}>
              <div style={{fontSize:12,fontWeight:600,color:"#ec4899",marginBottom:4}}>👁️ بنود Visibility ناقصة:</div>
              {confirmDlg.missingPct>0&&<div style={{fontSize:12,color:"#f87171",padding:"5px 10px",background:"rgba(239,68,68,0.08)",borderRadius:6,marginBottom:3}}>• {confirmDlg.missingPct} بند نسب مساحات لم يتم إدخالها</div>}
              {confirmDlg.missingVis>0&&<div style={{fontSize:12,color:"#f87171",padding:"5px 10px",background:"rgba(239,68,68,0.08)",borderRadius:6,marginBottom:3}}>• {confirmDlg.missingVis} بند عقد مطلوب لم يتم تقييمه</div>}
            </div>}
            {confirmDlg.missingExtra.length>0&&<div style={{marginBottom:10}}>
              <div style={{fontSize:12,fontWeight:600,color:"#a78bfa",marginBottom:4}}>📋 بيانات إضافية ناقصة:</div>
              {confirmDlg.missingExtra.map(m=><div key={m} style={{fontSize:12,color:"#f87171",padding:"5px 10px",background:"rgba(239,68,68,0.08)",borderRadius:6,marginBottom:3}}>• {m}</div>)}
            </div>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <button onClick={confirmDlg.onYes} style={{padding:"12px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#2563eb,#1d4ed8)",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>💾 حفظ التقرير كما هو</button>
            {(confirmDlg.incompleteCats.length>0||confirmDlg.emptyCats.length>0||confirmDlg.missingExtra.length>0)&&<button onClick={confirmDlg.onOos} style={{padding:"12px",borderRadius:10,border:"2px solid rgba(59,130,246,0.3)",background:"rgba(59,130,246,0.1)",color:"#60a5fa",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>📦 العودة لتعديل الجرد</button>}
            {(confirmDlg.missingVis>0||confirmDlg.missingPct>0)&&<button onClick={confirmDlg.onVis} style={{padding:"12px",borderRadius:10,border:"2px solid rgba(236,72,153,0.3)",background:"rgba(236,72,153,0.1)",color:"#ec4899",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>👁️ العودة لتعديل Visibility</button>}
          </div>
        </>}
      </div>
    </div>}
    <div style={S.hd}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><h1 style={{fontSize:19,fontWeight:700,margin:0,color:"#fff"}}>Daily OOS & Visibility</h1><p style={{fontSize:11,color:custError?"#f87171":"#64748b",marginTop:3}}>{today} • {custCount>0?custCount+" عميل":"جاري التحميل..."}</p></div><div style={{textAlign:"left"}}><div style={{fontSize:22,fontWeight:700,color:"#60a5fa"}}>{todayS.length}</div><div style={{fontSize:9,color:"#64748b"}}>تقارير اليوم</div></div></div></div>
    <div style={S.nv}><button style={S.nb(pg==="home"||pg==="entry")} onClick={()=>{setPg("home");setCust(null)}}>🏠 الرئيسية</button><button style={S.nb(pg==="reports")} onClick={()=>setPg("reports")}>📊 التقارير</button></div>
    <div style={S.ct}>

    {pg==="home"&&<div><div style={{...S.cd,borderColor:"rgba(59,130,246,0.15)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <span style={{fontSize:13,fontWeight:600}}>🔍 اختر العميل ({custCount})</span>
        <label style={{display:"flex",alignItems:"center",gap:4,background:"rgba(139,92,246,0.15)",border:"1px solid rgba(139,92,246,0.25)",color:"#a78bfa",padding:"4px 10px",borderRadius:6,fontSize:10,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>
          📂 رفع Master File
          <input type="file" accept=".json" style={{display:"none"}} onChange={async(e)=>{
            const file=e.target.files?.[0];if(!file)return;
            try{const txt=await file.text();const data=JSON.parse(txt);
              if(Array.isArray(data)&&data.length>0&&data[0].c){
                CUSTOMERS=data;setCustCount(data.length);setCustError(null);
                try{await window.storage.set("master_cache",JSON.stringify(data))}catch(ex){}
                tw("✅ تم تحميل "+data.length+" عميل");
              }else{tw("❌ صيغة الملف غير صحيحة")}
            }catch(ex){tw("❌ خطأ في قراءة الملف")}
          }}/>
        </label>
      </div>
      {custError&&<div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:8,padding:"8px 12px",marginBottom:8,fontSize:11,color:"#f87171"}}>{custError}<br/>ارفع ملف master_customers.json من الزرار أعلاه</div>}
      <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(0,0,0,0.3)",borderRadius:8,padding:"8px 12px",marginBottom:8,border:"1px solid rgba(255,255,255,0.06)"}}><input style={{...S.inp,border:"none",background:"transparent",padding:0}} placeholder="بحث بالكود أو الاسم أو العنوان أو الميرش..." value={sq} onChange={e=>setSq(e.target.value)}/></div>
      {filtCust.map((c,i)=>(<div key={c.c+i} onClick={()=>{setCust(c);setQty({});setVis({});setEx({});setTab("oos");setPg("entry")}} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"11px 13px",marginBottom:5,border:"1px solid rgba(255,255,255,0.05)",cursor:"pointer"}}>
        <div style={{display:"flex",justifyContent:"space-between"}}><div><span style={{fontWeight:600,fontSize:14}}>{c.n}</span> <span style={{color:"#64748b",fontSize:11}}>#{c.c}</span></div><span style={{color:"#3b82f6"}}>←</span></div>
        <div style={{fontSize:11,color:"#64748b",marginTop:3}}>{c.a}</div>
        <div style={{display:"flex",gap:5,marginTop:5,flexWrap:"wrap"}}><span style={S.bg("#3b82f6")}>{c.r}</span><span style={S.bg("#8b5cf6")}>{c.dv}</span><span style={S.bg("#10b981")}>{c.m}</span></div>
      </div>))}
      {!sq&&custCount>15&&<div style={{fontSize:11,color:"#475569",textAlign:"center",marginTop:8}}>عرض أول 15 عميل — ابحث لعرض المزيد...</div>}
    </div></div>}

    {pg==="entry"&&cust&&<div>
      <div style={{...S.cd,background:"linear-gradient(135deg,rgba(16,185,129,0.06),rgba(6,182,212,0.04))",borderColor:"rgba(16,185,129,0.12)"}}><div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:700,fontSize:15}}>{cust.n}{editId&&<span style={{fontSize:11,color:"#f59e0b",marginRight:6}}>📝 تعديل</span>}</div><div style={{fontSize:11,color:"#64748b"}}>#{cust.c} • {cust.bt} • {cust.m}</div></div><button onClick={()=>{try{localStorage.removeItem("oos_draft")}catch(e){}
              setPg(editId?"reports":"home");setCust(null);setEditId(null);setQty({});setVis({});setEx({})}} style={{background:"none",border:"none",color:"#60a5fa",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{editId?"← رجوع":"✕ إلغاء"}</button></div></div>
      <div style={{display:"flex",gap:4,marginBottom:8}}><button style={S.tr(tab==="oos")} onClick={()=>setTab("oos")}>📦 OOS<br/><span style={{fontSize:10,fontWeight:400}}>{filled}/{totalI}</span></button><button style={S.tr(tab==="vis")} onClick={()=>setTab("vis")}>👁️ Vis<br/><span style={{fontSize:10,fontWeight:400}}>{visAch}/{visReq}</span></button></div>

      {tab==="oos"&&<div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#94a3b8",marginBottom:4}}><span>{filled}/{totalI}</span><span style={{color:filled>totalI*0.8?"#22c55e":"#eab308"}}>{Math.round((filled/totalI)*100)}%</span></div>
        <div style={S.pb}><div style={S.pf(Math.round((filled/totalI)*100))}/></div><div style={{height:6}}/>
        {PG.map(g=>{const col=g.color;const cf=g.items.filter(i=>qty[i.o]!=null&&qty[i.o]!=="").length;const isE=expCat===g.cat;
          return(<div key={g.cat} style={{marginBottom:3}}>
            <div style={S.ch(col)} onClick={()=>{
                if(isE){
                  const unfilled=g.items.filter(i=>qty[i.o]==null||qty[i.o]==="");
                  if(unfilled.length>0&&unfilled.length<g.items.length){
                    const nextCat=PG[PG.indexOf(g)+1]?.cat||null;
                    setConfirmDlg({type:"cat",cat:g.cat,count:unfilled.length,total:g.items.length,
                      onYes:()=>{setExpCat(nextCat);setConfirmDlg(null)},
                      onNo:()=>setConfirmDlg(null)});
                  }else{
                    const nextCat=PG[PG.indexOf(g)+1]?.cat||null;
                    setExpCat(nextCat);
                  }
                }else{setExpCat(g.cat)}
              }}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontWeight:600,fontSize:12}}>{g.cat}</span><span style={{background:`${col}20`,color:col,padding:"1px 7px",borderRadius:10,fontSize:10,fontWeight:700}}>{cf}/{g.items.length}</span></div><span style={{color:col,fontSize:13,transform:isE?"rotate(90deg)":"rotate(0)",transition:"transform 0.2s"}}>◀</span></div>
            {isE&&<div style={{background:"rgba(0,0,0,0.12)",borderRadius:7,overflow:"hidden",marginBottom:2}}>
              {g.items.map((item,idx)=>(<div key={item.o} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 12px",borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
                <div style={{flex:1,fontSize:12,color:qty[item.o]?"#e2e8f0":"#94a3b8"}}>{item.o}</div>
                <input ref={el=>refs.current[item.o]=el} style={{width:65,padding:"7px 8px",borderRadius:7,border:`1px solid ${qty[item.o]?col+"40":"rgba(255,255,255,0.08)"}`,background:"rgba(0,0,0,0.3)",color:"#fff",fontSize:14,fontFamily:"inherit",outline:"none",textAlign:"center"}} type="number" inputMode="numeric" min="0" placeholder="0" value={qty[item.o]??""}onChange={e=>{const v=e.target.value;if(v===""||Number(v)>=0)setQty(p=>({...p,[item.o]:v}))}} onKeyDown={e=>{if(e.key==="Enter"){const n=g.items[idx+1];if(n&&refs.current[n.o])refs.current[n.o].focus()}}}/>
              </div>))}
            </div>}
          </div>)})}

            {/* بيانات إضافية */}
            <div style={{...S.cd,marginTop:10,borderColor:"rgba(139,92,246,0.15)"}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:10,color:"#a78bfa"}}>📋 بيانات إضافية</div>
              <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4}}>حالة العميل</label>
              <select style={S.sel} value={ex.status||""} onChange={e=>setEx(p=>({...p,status:e.target.value}))}><option value="">اختر...</option>{CUST_ST.map(o=><option key={o}>{o}</option>)}</select>
              <div style={{marginTop:12,padding:"10px 12px",borderRadius:8,background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.12)"}}>
                <div style={{fontSize:12,color:"#10b981",fontWeight:600,marginBottom:8}}>📊 نسبة مساحة بونجورنو من القهوة</div>
                {cust?.bs&&<div style={{fontSize:10,color:"#f59e0b",background:"rgba(245,158,11,0.15)",padding:"2px 8px",borderRadius:8,display:"inline-block",marginBottom:8}}>📋 العقد: {cust.bs}</div>}
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{flex:1}}><label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>رفوف بونجورنو</label><input style={S.inp} type="number" min="0" placeholder="0" value={ex.bonShelf||""} onChange={e=>setEx(p=>({...p,bonShelf:e.target.value}))}/></div>
                  <span style={{color:"#475569",fontSize:16,marginTop:16}}>/</span>
                  <div style={{flex:1}}><label style={{fontSize:11,color:"#64748b",display:"block",marginBottom:3}}>إجمالي رفوف القهوة</label><input style={S.inp} type="number" min="0" placeholder="0" value={ex.coffeeShelf||""} onChange={e=>setEx(p=>({...p,coffeeShelf:e.target.value}))}/></div>
                  {ex.bonShelf&&ex.coffeeShelf&&Number(ex.coffeeShelf)>0&&(()=>{
                    const pct=Math.round((Number(ex.bonShelf)/Number(ex.coffeeShelf))*100);
                    return <span style={{fontSize:14,padding:"4px 12px",borderRadius:8,fontWeight:700,background:pct>=50?"rgba(34,197,94,0.15)":"rgba(239,68,68,0.15)",color:pct>=50?"#4ade80":"#f87171",marginTop:16,whiteSpace:"nowrap"}}>{pct}%</span>
                  })()}
                </div>
              </div>
              <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4,marginTop:12}}>ثلاجة كيت كات</label>
              <select style={S.sel} value={ex.chiller||""} onChange={e=>setEx(p=>({...p,chiller:e.target.value}))}><option value="">اختر...</option><option>يوجد</option><option>لا يوجد</option></select>
              <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4,marginTop:12}}>بيان المخالفات للثلاجة</label>
              <select style={S.sel} value={ex.chillerNotes||""} onChange={e=>setEx(p=>({...p,chillerNotes:e.target.value}))}><option value="">اختر...</option><option>مخالفة</option><option>غير مخالفة</option><option>فى الصيانة</option></select>
              <label style={{fontSize:12,color:"#64748b",display:"block",marginBottom:4,marginTop:12}}>ملاحظات</label>
              <textarea style={{...S.inp,height:60,resize:"none"}} value={ex.notes||""} onChange={e=>setEx(p=>({...p,notes:e.target.value}))} placeholder="ملاحظات إضافية..."/>
            </div>
      </div>}

      {tab==="vis"&&<div>
        <div style={{...S.cd,background:"linear-gradient(135deg,rgba(245,158,11,0.08),rgba(234,179,8,0.04))",borderColor:"rgba(245,158,11,0.15)",marginBottom:8}}><div style={{fontSize:13,fontWeight:600,marginBottom:6}}>📋 ملخص العقد</div><div style={{display:"flex",gap:8}}><div style={{flex:1,textAlign:"center",background:"rgba(34,197,94,0.1)",borderRadius:8,padding:8}}><div style={{fontSize:22,fontWeight:700,color:"#4ade80"}}>{visAch}</div><div style={{fontSize:10,color:"#22c55e"}}>متطبق</div></div><div style={{flex:1,textAlign:"center",background:"rgba(239,68,68,0.1)",borderRadius:8,padding:8}}><div style={{fontSize:22,fontWeight:700,color:"#f87171"}}>{visReq-visAch}</div><div style={{fontSize:10,color:"#ef4444"}}>غير متطبق</div></div><div style={{flex:1,textAlign:"center",background:"rgba(59,130,246,0.1)",borderRadius:8,padding:8}}><div style={{fontSize:22,fontWeight:700,color:"#60a5fa"}}>{visReq}</div><div style={{fontSize:10,color:"#3b82f6"}}>إجمالي</div></div></div></div>
        <VisSection title="DRY — نسب المساحات" icon="📊" color="#10b981" items={VIS_DRY_CAT} contract={cust.ct} vis={vis} setVis={setVis}/>
        <VisSection title="DRY — Extra Visibility" icon="🏪" color="#f59e0b" items={VIS_DRY_EX} contract={cust.ct} vis={vis} setVis={setVis}/>
        <VisSection title="Impulse — المساحات" icon="🍫" color="#ec4899" items={VIS_IMP_CAT} contract={cust.ct} vis={vis} setVis={setVis}/>
        <VisSection title="Impulse — Extra Visibility" icon="🎯" color="#e11d48" items={VIS_IMP_EX} contract={cust.ct} vis={vis} setVis={setVis}/>
      </div>}


      <button style={{...S.sub,background:editId?"linear-gradient(135deg,#d97706,#b45309)":"linear-gradient(135deg,#2563eb,#1d4ed8)"}} onClick={()=>{
              // 1. Check incomplete OOS categories
              const incompleteCats=PG.filter(g=>{
                const filled=g.items.filter(i=>qty[i.o]!=null&&qty[i.o]!=="").length;
                return filled>0&&filled<g.items.length;
              }).map(g=>{
                const unfilled=g.items.filter(i=>qty[i.o]==null||qty[i.o]==="").length;
                return g.cat+" ("+unfilled+" صنف ناقص)";
              });
              const emptyCats=PG.filter(g=>g.items.every(i=>qty[i.o]==null||qty[i.o]==="")).map(g=>g.cat);

              // 2. Check Visibility - required items not answered
              const allVisItems=[...VIS_DRY_EX,...VIS_IMP_EX];
              const reqVis=cust?.ct?allVisItems.filter(i=>cust.ct[i.key]!=null):[];
              const missingVis=reqVis.filter(i=>vis[i.id]!=="achieved"&&vis[i.id]!=="not_achieved");
              // Pct items
              const pctItems=[...VIS_DRY_CAT,...VIS_IMP_CAT];
              const reqPct=cust?.ct?pctItems.filter(i=>cust.ct[i.key]!=null):[];
              const missingPct=reqPct.filter(i=>{
                if(i.type==="pct")return !vis[i.id+"_n"]||!vis[i.id+"_t"];
                if(i.type==="shelf")return !vis[i.id+"_a"];
                return false;
              });

              // 3. Check extra fields
              const missingExtra=[];
              if(!ex.status)missingExtra.push("حالة العميل");
              if(!ex.bonShelf)missingExtra.push("رفوف بونجورنو");
              if(!ex.coffeeShelf)missingExtra.push("إجمالي رفوف القهوة");
              if(!ex.chiller)missingExtra.push("ثلاجة كيت كات");
              if(!ex.chillerNotes)missingExtra.push("بيان المخالفات للثلاجة");

              const hasIssues=incompleteCats.length>0||emptyCats.length>0||missingVis.length>0||missingPct.length>0||missingExtra.length>0;
              if(hasIssues){
                setConfirmDlg({type:"full",incompleteCats,emptyCats,missingVis:missingVis.length,missingPct:missingPct.length,missingExtra,
                  onYes:()=>{submit();setConfirmDlg(null)},
                  onOos:()=>{setTab("oos");setConfirmDlg(null)},
                  onVis:()=>{setTab("vis");setConfirmDlg(null)},
                  onNo:()=>setConfirmDlg(null)});
              }else{submit()}
            }}>{editId?"💾 تحديث التقرير":"💾 حفظ التقرير"}</button>
    </div>}

    {pg==="reports"&&<div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><span style={{fontSize:14,fontWeight:600}}>التقارير ({subs.length})</span>{subs.length>0&&<span style={{fontSize:10,color:"#64748b"}}> اضغط على التقرير للتعديل</span>}
        {subs.length>0&&<button onClick={()=>{doExport(subs);tw("📁 جاري التصدير...")}} style={{display:"flex",alignItems:"center",gap:4,background:"rgba(5,150,105,0.2)",border:"1px solid rgba(5,150,105,0.3)",color:"#34d399",padding:"6px 14px",borderRadius:8,fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>📥 تصدير xlsx</button>}
      </div>
      {subs.length===0?<div style={{textAlign:"center",padding:"40px",color:"#475569"}}><div style={{fontSize:40}}>📋</div><p>لا توجد تقارير</p></div>
      :subs.map(sub=>(<div key={sub.id} style={{...S.cd,cursor:"pointer"}} onClick={()=>editReport(sub)}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}><div>
        <div style={{fontWeight:600,fontSize:14}}>{sub.name} <span style={{color:"#64748b",fontWeight:400,fontSize:11}}>#{sub.code}</span></div>
        <div style={{display:"flex",gap:5,marginTop:5,flexWrap:"wrap"}}><span style={S.bg("#3b82f6")}>{sub.filled}/{sub.totalI} صنف</span><span style={S.bg(sub.visAch===sub.visReq&&sub.visReq>0?"#22c55e":"#f59e0b")}>{sub.visAch}/{sub.visReq} vis</span><span style={S.bg("#8b5cf6")}>{sub.extra?.status||"—"}</span></div>
        <div style={{fontSize:10,color:"#475569",marginTop:4}}>{new Date(sub.date).toLocaleString("ar-EG")}</div>
      </div><button onClick={e=>{e.stopPropagation();sv(subs.filter(x=>x.id!==sub.id));tw("🗑️ تم الحذف")}} style={{background:"none",border:"none",color:"#64748b",cursor:"pointer",fontSize:13}}>🗑️</button></div></div>))}
    </div>}
    </div>
  </div>);
}
