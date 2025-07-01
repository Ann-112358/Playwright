import {test} from "../fixtures/userGaragePage";

test.describe('Garage Page tests', () =>{

    test.beforeEach(async ({garagePage}) =>{
        await garagePage.open();
    })

    test('Add BMW X5', async ({garagePage}) =>{
        await garagePage.addNewCar('BMW', 'X5', '555');
        await garagePage.verifyLastAddedCarName('BMW X5');
    })

    test('Add Porsche Panamera', async ({garagePage}) =>{
        await garagePage.addNewCar('Porsche', 'Panamera', '666');
        await garagePage.verifyLastAddedCarName('Porsche Panamera');
    })

    test('Add Ford Fusion', async ({garagePage}) =>{
        await garagePage.addNewCar('Ford', 'Fusion', '777');
        await garagePage.verifyLastAddedCarName('Ford Fusion');
    })

    test('Add Audi R8', async ({garagePage}) =>{
        await garagePage.addNewCar('Audi', 'R8', '888');
        await garagePage.verifyLastAddedCarName('Audi R8');
    })

    test('Add Fiat Panda', async ({garagePage}) =>{
        await garagePage.addNewCar('Fiat', 'Panda', '333');
        await garagePage.verifyLastAddedCarName('Fiat Panda');
    })
})
