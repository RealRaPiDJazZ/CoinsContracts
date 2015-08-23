"use strict";
/*Defined Variables (There's a shit-ton)
Also this is coded in notepad++ by a guy with no knowledge of javascript :P */

var coins = 0;
var contracts = 0;                           //shh... This is important (later)
var data = 0;                                //Turns out this is another paradigm. *sigh*
var locator = 0;
var stealer = 0;
var bucket = 0;
var tollbooth = 0;
var intern = 0;
var slacker = 0;
var janitor = 0;
var slackerCostRatio = 1.25;                 //Also important for later-ish upgrades.
var welcomeUpgradeBought = 0;                //Originally I said I would move this, but now I know that I can't move it ;_;
var coinFlipStealerUpgrade1Bought = 0;
var contractBeginningUpgradeBought = 0;
var freeContract1UpgradeBought = 0;          //In case I want more of these.
var internOutsourcing1UpgradeBought = 0;
var dataGeneration1UpgradeBought = 0;
var dataUtility1UpgradeBought = 0;
var tradeContracts = 0;
var locatorMax = 50;
var locatorAchievement1 = 0;                 //Given at 10 locators

// Aggregates Clicking

function coinClick() {
    var locatorCoinPerClick = Math.floor(locator * 1);
    if (locatorAchievement1 === 1) {
        locatorCoinPerClick = Math.floor(locator * 2);
    }
    var bucketCoinPerClick = Math.floor(bucket * 5);
    var dataCoinPerClick = 0;
	if (dataUtility1UpgradeBought === 1) {
        dataCoinPerClick = (data * 1);
	}
    var assortedCoinPerClick = 1;                                                                   //This is just assorted stuff; one time upgrades, base coin/click, etc.
    if (welcomeUpgradeBought === 1) {
        assortedCoinPerClick = assortedCoinPerClick + 3;
    }
    if (contractBeginningUpgradeBought === 1) {
        assortedCoinPerClick = assortedCoinPerClick + 2;
    }
    var coinPerClick = Math.floor(locatorCoinPerClick + bucketCoinPerClick + dataCoinPerClick + assortedCoinPerClick); //Oh God, this line will get WAY too long soon... Might add up on the next line if it gets out of hand.
    if (internOutsourcing1UpgradeBought === 1) {
        coinPerClick = Math.round(coinPerClick * (1 + (intern / 40)));
    }
    coins = coins + coinPerClick;
    document.getElementById("coins").innerHTML = coins;
    document.getElementById("coinPerClick").innerHTML = coinPerClick;
}

// Aggregates coins/contracts earned every second.

window.setInterval(function () {

    var stealerCoinsPerSecond = (stealer * 10);
    if (coinFlipStealerUpgrade1Bought === 1) {
        stealerCoinsPerSecond = (stealer * 25);
    }
    var locatorCoinsPerSecond = 0;
    if (locatorAchievement1 === 1) {
        locatorCoinsPerSecond = (locator * 1);
    }
    var tollboothCoinsPerSecond = (tollbooth * 150);
    var internCoinsPerSecond = (intern * 1);
    var dataCoinsPerSecond = (data * 1);
    var assortedCoinsPerSecond = 0;
    if (contractBeginningUpgradeBought === 1) {
        assortedCoinsPerSecond = assortedCoinsPerSecond + 2;
    }
    var coinsPerSecond = (stealerCoinsPerSecond + locatorCoinsPerSecond + tollboothCoinsPerSecond + internCoinsPerSecond + dataCoinsPerSecond + assortedCoinsPerSecond);  //Remember what I said about the coinPerClick line? This will be worse.
    coins = coins + coinsPerSecond;
    document.getElementById("coins").innerHTML = coins;
    document.getElementById("coinsPerSecond").innerHTML = coinsPerSecond;

    /*        ^
        Coins | (up) \\ Contracts | (down)
                                  V         */

    var internContractsPerSecond = (intern * 1);
    var slackerContractsPerSecond = (slacker * 3);
    var janitorContractsPerSecond = (janitor * 5);
    var tollboothContractsPerSecond = (tollbooth * 10);
    var dataContractsPerSecond = 0;	                                           //shhh
	if (dataUtility1UpgradeBought === 1) {
        dataContractsPerSecond = (data * 1);
	}
    var assortedContractsPerSecond = 0;
    var contractsPerSecond = (internContractsPerSecond + slackerContractsPerSecond + janitorContractsPerSecond + tollboothContractsPerSecond + dataContractsPerSecond + assortedContractsPerSecond);  //The start of the new (even longer) paradigm era.
    contracts = contracts + contractsPerSecond;
    document.getElementById("contracts").innerHTML = contracts;
    document.getElementById("contractsPerSecond").innerHTML = contractsPerSecond;

	var upgrade1DataPerSecond = 0;
	var dataPerSecond = upgrade1DataPerSecond;
    data = data + dataPerSecond;
    document.getElementById('data').innerHTML = data;
    document.getElementById('dataPerSecond').innerHTML = dataPerSecond;

/* achievements go here
|
V  Yeah I didn't need to use that arrow but meh.

I've also made this tally up max amounts of buildings (where applicable), and the enabling of upgrades, and the generation of data.*/	
	
    if (locator >= 10) {
        locatorAchievement1 = 1;
        document.getElementById('buyStealer').disabled = false;
    }
    var locatorMaxAdjustment1 = 0;
    locatorMax = (50 + locatorMaxAdjustment1);
    document.getElementById('locatorMax').innerHTML = locatorMax;
	if (locator !== locatorMax) {
		document.getElementById('buyLocatorDisable').disabled = false;
	}
    if (dataGeneration1UpgradeBought === 1) {
        upgrade1DataPerSecond = 1;
    }
    
}, 1000);

// Onto the buildings, then.

function buyLocator() {
    var locatorCost = Math.floor(((locator + 1) * 15) - 10);               //works out the cost of this locator
    if (coins >= locatorCost) {                                            //checks that the player can afford the locator
        locator = locator + 1;                                             //increases number of locator
        coins = coins - locatorCost;                                       //removes the coins spent
        document.getElementById('locator').innerHTML = locator;            //updates the number of locator for the user
        document.getElementById('coins').innerHTML = coins;                //updates the number of coins for the user
    }
    if (locator === locatorMax) {                                          //checks if locators purchased = max
        document.getElementById('buyLocatorDisable').disabled = true;      //disables purchasing of locators
    }
    var nextLocatorCost = Math.floor(((locator + 1) * 15) - 10);           //works out the cost of the next locator
    document.getElementById('locatorCost').innerHTML = nextLocatorCost;    //updates the locator cost for the user
}

function buyBucket() {
    var bucketCost = Math.floor(200 * (Math.pow((bucket + 1), 1.2)));      //works out the cost of this bucket
    if (coins >= bucketCost) {                                             //checks that the player can afford the bucket
        bucket = bucket + 1;                                               //increases number of bucket
        coins = coins - bucketCost;                                        //removes the coins spent
        document.getElementById('bucket').innerHTML = bucket;              //updates the number of bucket for the user
        document.getElementById('coins').innerHTML = coins;                //updates the number of coins for the user
    }
    var nextBucketCost = Math.floor(200 * (Math.pow((bucket + 1), 1.2)));  //works out the cost of the next bucket
    document.getElementById('bucketCost').innerHTML = nextBucketCost;      //updates the bucket cost for the user
}

function buyStealer() {
    var stealerCost = Math.floor(200 * (Math.pow(1.2, stealer)));          //works out the cost of this stealer
    if (coins >= stealerCost) {                                            //checks that the player can afford the stealer
        stealer = stealer + 1;                                             //increases number of stealer
        coins = coins - stealerCost;                                       //removes the coins spent
        document.getElementById('stealer').innerHTML = stealer;            //updates the number of stealer for the user
        document.getElementById('coins').innerHTML = coins;                //updates the number of coins for the user
    }
    var nextStealerCost = Math.floor(200 * (Math.pow(1.2, stealer)));      //works out the cost of the next stealer
    document.getElementById('stealerCost').innerHTML = nextStealerCost;    //updates the stealer cost for the user
}

function buyTollbooth() {
    var tollboothCostCoins = Math.floor(5000 * (Math.pow(1.1, tollbooth)));
    var tollboothCostContracts = Math.floor(50 * (Math.pow((tollbooth + 1), 2.2)));
    if (coins >= tollboothCostCoins && contracts >= tollboothCostContracts) {                     //Checks for both coin cost and contract cost. Useful to note.
        tollbooth = tollbooth + 1;
        contracts = contracts - tollboothCostContracts;
        coins = coins - tollboothCostCoins;
        document.getElementById('tollbooth').innerHTML = tollbooth;
        document.getElementById('contracts').innerHTML = contracts;
        document.getElementById('coins').innerHTML = coins;
    }
    var nextTollboothCostCoins = Math.floor(5000 * (Math.pow(1.1, tollbooth)));
    var nextTollboothCostContracts = Math.floor(50 * (Math.pow((tollbooth + 1), 2.2)));
    document.getElementById('tollboothCostCoins').innerHTML = nextTollboothCostCoins;
    document.getElementById('tollboothCostContracts').innerHTML = nextTollboothCostContracts;
}

function buyIntern() {
    var internCost = Math.floor(10 * (Math.pow(1.1, intern)));
    if (contracts >= internCost) {
        intern = intern + 1;
        contracts = contracts - internCost;
        document.getElementById('intern').innerHTML = intern;
        document.getElementById('contracts').innerHTML = contracts;
    }
    var nextinternCost = Math.floor(10 * (Math.pow(1.1, intern)));
    document.getElementById('internCost').innerHTML = nextinternCost;
}

function buySlacker() {
    var slackerCost = Math.floor(20 * (Math.pow(slackerCostRatio, slacker)));
    if (contracts >= slackerCost) {
        slacker = slacker + 1;
        contracts = contracts - slackerCost;
        document.getElementById('slacker').innerHTML = slacker;
        document.getElementById('contracts').innerHTML = contracts;
    }
    var nextSlackerCost = Math.floor(20 * (Math.pow(slackerCostRatio, slacker)));
    document.getElementById('slackerCost').innerHTML = nextSlackerCost;
}

function buyJanitor() {
    var janitorCost = Math.floor(100 * (Math.pow((janitor + 1), 1.15)));
    if (contracts >= janitorCost) {
        janitor = janitor + 1;
        contracts = contracts - janitorCost;
        document.getElementById('janitor').innerHTML = janitor;
        document.getElementById('contracts').innerHTML = contracts;
    }
    var nextJanitorCost = Math.floor(100 * (Math.pow((janitor + 1), 1.15)));
    document.getElementById('janitorCost').innerHTML = nextJanitorCost;
}

// And the few useless upgrades; yay?

function buyWelcomeUpgrade() {
    if (coins >= 10) {
        welcomeUpgradeBought = 1;                                                    //allows effects of upgrade to register
        coins = coins - 10;
        document.getElementById('coins').innerHTML = coins;
        document.getElementById('buyWelcomeUpgrade').disabled = true;                //disables the upgrade
    }
}

function buyCoinFlipStealerUpgrade1() {
    if (coins >= 3000) {
        coinFlipStealerUpgrade1Bought = 1;                                                    //allows effects of upgrade to register
        coins = coins - 3000;
        document.getElementById('coins').innerHTML = coins;
        document.getElementById('buyCoinFlipStealerUpgrade1').disabled = true;                //disables the upgrade
    }
}

function buyContractBeginningUpgrade() {
    if (contracts >= 1) {
        contractBeginningUpgradeBought = 1;                                          //allows effects of upgrade to register
        contracts = contracts - 1;
        document.getElementById('contracts').innerHTML = contracts;
        document.getElementById('buyContractBeginningUpgrade').disabled = true;      //disables the upgrade
        document.getElementById('buyFreeContract1Upgrade').disabled = false;         //enables next upgrade
        document.getElementById('buyIntern').disabled = false;
    }
}

function buyFreeContract1Upgrade() {
    if (contracts >= 1) {
        freeContract1UpgradeBought = 1;
        contracts = contracts + 9;
        document.getElementById('contracts').innerHTML = contracts;
        document.getElementById('buyFreeContract1Upgrade').disabled = true;
    }
}

function buyInternOutsourcing1Upgrade() {
    if (contracts >= 150) {
        internOutsourcing1UpgradeBought = 1;
        contracts = contracts - 150;
        document.getElementById('contracts').innerHTML = contracts;
        document.getElementById('buyInternOutsourcing1Upgrade').disabled = true;
    }
}

function buyDataGeneration1Upgrade() {
    if (coins >= 1000) {
        dataGeneration1UpgradeBought = 1;
        coins = coins - 1000;
        document.getElementById('coins').innerHTML = coins;
        document.getElementById('buyDataGeneration1Upgrade').disabled = true;
		document.getElementById('buyDataUtility1Upgrade').disabled = false;
    }
}

function buyDataUtility1Upgrade() {
    if (contracts >= 1000) {
        dataUtility1UpgradeBought = 1;
        contracts = contracts - 1000;
        document.getElementById('contracts').innerHTML = contracts;
        document.getElementById('buyDataUtility1Upgrade').disabled = true;
    }
}

// Repeatable purchases go here.

function buyTradeContracts() {
    var buyTradeContractsCost = Math.floor(50 * (Math.pow((tradeContracts + 1), 1.3)));
    if (coins >= buyTradeContractsCost) {
        tradeContracts = tradeContracts + 1;
        coins = coins - buyTradeContractsCost;
        var projectedContractsGiven = Math.round(tradeContracts / 2);
        contracts = contracts + projectedContractsGiven;
        document.getElementById('coins').innerHTML = coins;
        document.getElementById("contracts").innerHTML = contracts;
        document.getElementById("tradeContracts").innerHTML = tradeContracts;
        document.getElementById('projectedContractsGiven').innerHTML = projectedContractsGiven;
    }
    var nextBuyTradeContractsCost = Math.floor(50 * (Math.pow((tradeContracts + 1), 1.3)));
    document.getElementById('buyTradeContractsCost').innerHTML = nextBuyTradeContractsCost;
}


// Save states will go here.
